from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Public user info."""
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'bio', 'avatar_color')


class RegisterSerializer(serializers.ModelSerializer):
    """For POST /api/auth/register/."""
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name',
                  'last_name', 'bio', 'avatar_color')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)   # hash
        user.save()
        return user
