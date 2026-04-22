from rest_framework import serializers

from users.serializers import UserSerializer
from .models import Category, Skill, SwapRequest


class CategorySerializer(serializers.ModelSerializer):
    skill_count = serializers.IntegerField(
        source='skills.count', read_only=True,
    )

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'skill_count')


class SkillSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
    )
    kind_display = serializers.CharField(
        source='get_kind_display', read_only=True,
    )
    level_display = serializers.CharField(
        source='get_level_display', read_only=True,
    )

    class Meta:
        model = Skill
        fields = (
            'id', 'owner',
            'category', 'category_id',
            'title', 'description',
            'kind', 'kind_display',
            'level', 'level_display',
            'is_remote',
            'created_at', 'updated_at',
        )
        read_only_fields = ('owner', 'created_at', 'updated_at')


class SwapRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    skill = SkillSerializer(read_only=True)
    skill_id = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        source='skill',
        write_only=True,
    )

    class Meta:
        model = SwapRequest
        fields = (
            'id', 'from_user', 'skill', 'skill_id',
            'message', 'status', 'created_at',
        )
        read_only_fields = ('from_user', 'status', 'created_at')
