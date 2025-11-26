from rest_framework import serializers
from .models import UserProfile, UserAllergy, UserTechnique, UserCuisine
from shared.serializers import (
    AllergenSerializer, TechniqueSerializer, LevelSerializer, CuisineSerializer
)

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