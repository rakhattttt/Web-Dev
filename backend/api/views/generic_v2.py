"""
Lecture 10 — Level 5 (ACTIVE): Concrete Generic Views.

Each resource is 3 lines:
 - queryset
 - serializer_class
 - optional filter/search/ordering config (Lecture 12)

Pagination is applied automatically from DEFAULT_PAGINATION_CLASS in
settings (Lecture 11).
"""
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Category, Skill, SwapRequest
from api.serializers import (
    CategorySerializer, SkillSerializer, SwapRequestSerializer,
)
from api.filters import SkillFilter


# --- Categories -----------------------------------------------------------

class CategoryListAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_url_kwarg = 'category_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# --- Skills ---------------------------------------------------------------

class SkillListAPIView(generics.ListCreateAPIView):
    """
    GET  /api/skills/        — paginated list
    POST /api/skills/        — auth required

    Lecture 12 filtering examples:
      ?kind=offer&level=beginner     (FilterSet fields)
      ?category_slug=programming     (FilterSet custom)
      ?search=python                 (SearchFilter)
      ?ordering=-created_at          (OrderingFilter)
    """
    queryset = Skill.objects.select_related('owner', 'category').all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Lecture 12 — per-view filter configuration
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = SkillFilter                     # custom FilterSet
    search_fields = ('title', 'description',
                     'owner__username')                # SearchFilter
    ordering_fields = ('created_at', 'title', 'level')  # OrderingFilter
    ordering = ('-created_at',)                        # default order

    def perform_create(self, serializer):
        # attach owner from the JWT
        serializer.save(owner=self.request.user)


class SkillDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.select_related('owner', 'category').all()
    serializer_class = SkillSerializer
    lookup_url_kwarg = 'skill_id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# --- Custom endpoint (APIView fallback — Lecture 10 §5.2) -----------------

class CategorySkillsAPIView(APIView):
    """GET /api/categories/<id>/skills/ — skills filtered by category."""
    permission_classes = [permissions.AllowAny]

    def get(self, request, category_id):
        try:
            category = Category.objects.get(pk=category_id)
        except Category.DoesNotExist as e:
            return Response({'error': str(e)},
                            status=status.HTTP_404_NOT_FOUND)
        skills = category.skills.select_related('owner', 'category').all()
        return Response(SkillSerializer(skills, many=True).data)


# --- Swap Requests --------------------------------------------------------

class SwapRequestListAPIView(generics.ListCreateAPIView):
    """Authenticated users see requests *they* sent or received."""
    serializer_class = SwapRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ('status',)
    ordering_fields = ('created_at',)
    ordering = ('-created_at',)

    def get_queryset(self):
        user = self.request.user
        return (SwapRequest.objects
                .select_related('from_user', 'skill', 'skill__owner')
                .filter(from_user=user) | SwapRequest.objects
                .select_related('from_user', 'skill', 'skill__owner')
                .filter(skill__owner=user))

    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)


class SwapRequestDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SwapRequest.objects.all()
    serializer_class = SwapRequestSerializer
    lookup_url_kwarg = 'request_id'
    permission_classes = [permissions.IsAuthenticated]
