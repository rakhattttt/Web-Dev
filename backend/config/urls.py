"""
SkillSwap URL routing.
JWT endpoints from Lecture 11: /api/auth/token/ (login), /refresh/
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT endpoints — Lecture 11
    path('api/auth/token/',
         TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/',
         TokenRefreshView.as_view(), name='token_refresh'),

    # App endpoints
    path('api/', include('users.urls')),
    path('api/', include('api.urls')),
]
