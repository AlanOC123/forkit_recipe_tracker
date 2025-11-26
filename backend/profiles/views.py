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
    UserProfileSerializer, UserAllergyListSerializer, UserCuisineListSerializer, UserTechniqueListSerializer
)

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
    serializer_class = UserAllergyListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserAllergy.objects.filter(user_profile=self.request.user.profile)
    
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user.profile)
    
class UserCuisineViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserCuisineListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserCuisine.objects.filter(user_profile=self.request.user.profile)

class UserTechniqueViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserTechniqueListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserTechnique.objects.filter(user_profile=self.request.user.profile)
