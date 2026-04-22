from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user extends AbstractUser with a short bio."""
    bio = models.TextField(blank=True, default='')
    avatar_color = models.CharField(max_length=7, default='#E8B4A0')

    def __str__(self):
        return self.username
