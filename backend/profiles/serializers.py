from rest_framework import serializers
from .models import UserProfile, UserAllergy, UserTechnique, UserCuisine
from shared.serializers import (
    AllergenSerializer, TechniqueSerializer, LevelSerializer, CuisineSerializer
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        return value
    
    def save(self):
        email= self.validated_data['email']

        try:
            user = User.objects.get(email=email)

            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

            send_mail(
                subject="Password Reset Request",
                message=f"Click here to reset your password: {reset_url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False
            )
        except User.DoesNotExist:
            pass

        return { 'email': email }

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=8)
    new_password_confirm = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['new_password_confirm']:
            raise serializers.ValidationError({
                'new_password': "Passwords must match"
            })
        
        try:
            uid = force_str(urlsafe_base64_decode(data['uid']))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError('Invalid reset link')
        
        if not default_token_generator.check_token(user, data['token']):
            raise serializers.ValidationError('Invalid or expired reset link')
        
        data['user'] = user
        return data
    
    def save(self):
        user = self.validated_data['user']
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email
        data['user_id'] = self.user.id

        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields = [
            'username', 'email', 'password', 'confirm_password'
        ]

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({
                "confirm_password": "Passwords dont match"
            })
        return data
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User already registered")
        return value
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        return user

class UserCuisineListSerializer(serializers.ModelSerializer):
    cuisine = serializers.CharField(source='cuisine.name', read_only=True)
    level = serializers.CharField(source='level.name', read_only=True)
    cuisine_icon = serializers.CharField(source="cuisine.icon")
    level_icon = serializers.CharField(source="level.icon")
    class Meta:
        model = UserCuisine
        fields = [
            "id", "cuisine", "experience",
            "level", "updated_at", "created_at",
            "cuisine_icon", "level_icon"
        ]
        read_only_fields = fields

class UserCuisineDetailSerializer(serializers.ModelSerializer):
    cuisine = CuisineSerializer(read_only=True)
    level = LevelSerializer(read_only=True)
    class Meta:
        model = UserCuisine
        fields = [
            "id", "cuisine", "experience",
            "level", "updated_at", "created_at"
        ]
        read_only_fields = fields

class UserTechniqueListSerializer(serializers.ModelSerializer):
    technique = serializers.CharField(source='technique.name', read_only=True)
    level = serializers.CharField(source='level.name', read_only=True)
    technique_icon = serializers.CharField(source="technique.icon")
    level_icon = serializers.CharField(source="level.icon")
    class Meta:
        model = UserTechnique
        fields = [
            "id", "technique", "experience",
            "level", "updated_at", "created_at",
            "technique_icon", "level_icon"
        ]
        read_only_fields = fields

class UserTechniqueDetailSerializer(serializers.ModelSerializer):
    technique = TechniqueSerializer(read_only=True)
    level = LevelSerializer(read_only=True)
    class Meta:
        model = UserTechnique
        fields = [
            "id", "technique", "experience",
            "level", "updated_at", "created_at"
        ]
        read_only_fields = fields

class UserAllergyListSerializer(serializers.ModelSerializer):
    allergen = serializers.CharField(source='allergen.name', read_only=True)
    class Meta:
        model = UserAllergy
        fields = [
            "id", "allergen", "severity",
            "notes", "created_at"
        ]
        read_only_fields = [
            "id", "allergen", "created_at",
        ]

class UserAllergyDetailSerializer(serializers.ModelSerializer):
    allergen = AllergenSerializer(read_only=True)
    class Meta:
        model = UserAllergy
        fields = [
            "id", "allergen", "severity",
            "notes", "created_at"
        ]
        read_only_fields = [
            "id", "allergen", "created_at",
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    email = serializers.CharField(source="user.email")
    cuisines = UserCuisineListSerializer(read_only=True, many=True)
    techniques = UserTechniqueListSerializer(read_only=True, many=True)
    allergies = UserAllergyListSerializer(read_only=True, many=True)

    class Meta:
        model = UserProfile
        fields = [
            'id', 'username', 'bio', 'avatar', 'location', 'website', 'email',
            'cuisines', 'techniques', 'allergies',
            'created_at', 'updated_at'
        ]

        read_only_fields = [
            'id', 'username', 'created_at', 'updated_at'
        ]