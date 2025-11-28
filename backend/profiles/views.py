from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin
)
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import UserProfile, UserCuisine, UserAllergy, UserTechnique
from .serializers import (
    UserProfileSerializer, UserAllergyListSerializer, UserCuisineListSerializer, UserTechniqueListSerializer, UserAllergyDetailSerializer, UserCuisineDetailSerializer, UserTechniqueDetailSerializer, CustomTokenObtainPairSerializer
)
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserProfileViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin, 
    GenericViewSet
):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return UserProfile.objects.all()

    def perform_update(self, serializer):
        if self.request.user.profile == serializer.instance:
            serializer.save()

class UserAllergyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserAllergy.objects.filter(user_profile=self.request.user.profile)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UserAllergyListSerializer
        else:
            return UserAllergyDetailSerializer
    
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user.profile)
    
class UserCuisineViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserCuisine.objects.filter(user_profile=self.request.user.profile)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UserCuisineListSerializer
        else:
            return UserCuisineDetailSerializer

class UserTechniqueViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserTechnique.objects.filter(user_profile=self.request.user.profile)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UserTechniqueListSerializer
        else:
            return UserTechniqueDetailSerializer
