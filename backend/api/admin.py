from django.contrib import admin
from .models import Category, Skill, SwapRequest


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'category', 'kind', 'level',
                    'is_remote', 'created_at')
    list_filter = ('kind', 'level', 'is_remote', 'category')
    search_fields = ('title', 'description')


@admin.register(SwapRequest)
class SwapRequestAdmin(admin.ModelAdmin):
    list_display = ('from_user', 'skill', 'status', 'created_at')
    list_filter = ('status',)
