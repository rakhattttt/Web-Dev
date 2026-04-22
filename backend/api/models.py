from django.conf import settings
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=80, unique=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Skill(models.Model):
    OFFER = 'offer'
    REQUEST = 'request'
    KIND_CHOICES = [
        (OFFER, 'Teach'),
        (REQUEST, 'Learn'),
    ]

    BEGINNER = 'beginner'
    INTERMEDIATE = 'intermediate'
    ADVANCED = 'advanced'
    LEVEL_CHOICES = [
        (BEGINNER, 'Beginner'),
        (INTERMEDIATE, 'Intermediate'),
        (ADVANCED, 'Advanced'),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='skills',
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='skills',
    )
    title = models.CharField(max_length=140)
    description = models.TextField(blank=True, default='')
    kind = models.CharField(max_length=10, choices=KIND_CHOICES, default=OFFER)
    level = models.CharField(
        max_length=20, choices=LEVEL_CHOICES, default=BEGINNER,
    )
    is_remote = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} ({self.get_kind_display()})'


class SwapRequest(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DECLINED = 'declined'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (DECLINED, 'Declined'),
    ]

    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_requests',
    )
    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name='requests',
    )
    message = models.TextField(blank=True, default='')
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default=PENDING,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.from_user} → {self.skill} [{self.status}]'
