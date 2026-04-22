from django_filters import rest_framework as filters

from .models import Skill


class SkillFilter(filters.FilterSet):
    min_date = filters.DateFilter(field_name='created_at', lookup_expr='gte')
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    category_slug = filters.CharFilter(field_name='category__slug')

    class Meta:
        model = Skill
        fields = ['kind', 'level', 'is_remote', 'category', 'owner']
