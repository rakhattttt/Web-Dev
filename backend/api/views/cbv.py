"""
Lecture 10 — Level 3: Class-Based Views (APIView).

Separate methods per HTTP verb; get_object() shared helper.
Kept for teaching.
"""
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Skill
from api.serializers import SkillSerializer


class SkillListAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class SkillDetailAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, skill_id):
        try:
            return Skill.objects.get(pk=skill_id)
        except Skill.DoesNotExist:
            return None

    def get(self, request, skill_id):
        skill = self.get_object(skill_id)
        if skill is None:
            return Response({'error': 'not found'},
                            status=status.HTTP_404_NOT_FOUND)
        return Response(SkillSerializer(skill).data)

    def put(self, request, skill_id):
        skill = self.get_object(skill_id)
        if skill is None:
            return Response({'error': 'not found'},
                            status=status.HTTP_404_NOT_FOUND)
        serializer = SkillSerializer(instance=skill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, skill_id):
        skill = self.get_object(skill_id)
        if skill is None:
            return Response({'error': 'not found'},
                            status=status.HTTP_404_NOT_FOUND)
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
