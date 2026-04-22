from django.urls import path

from .views import (
    CategoryListAPIView, CategoryDetailAPIView, CategorySkillsAPIView,
    SkillListAPIView, SkillDetailAPIView,
    SwapRequestListAPIView, SwapRequestDetailAPIView,
)

urlpatterns = [
    # Categories
    path('categories/',
         CategoryListAPIView.as_view()),
    path('categories/<int:category_id>/',
         CategoryDetailAPIView.as_view()),
    path('categories/<int:category_id>/skills/',
         CategorySkillsAPIView.as_view()),

    # Skills
    path('skills/',
         SkillListAPIView.as_view()),
    path('skills/<int:skill_id>/',
         SkillDetailAPIView.as_view()),

    # Swap requests
    path('swaps/',
         SwapRequestListAPIView.as_view()),
    path('swaps/<int:request_id>/',
         SwapRequestDetailAPIView.as_view()),
]
