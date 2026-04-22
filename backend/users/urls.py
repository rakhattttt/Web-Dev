from django.urls import path
from .views import RegisterView, MeView, UserDetailView

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/me/', MeView.as_view()),
    path('users/<int:user_id>/', UserDetailView.as_view()),
]
