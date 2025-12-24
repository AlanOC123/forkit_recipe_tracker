from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin, 
)
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from .models import UserProfile, UserCuisine, UserAllergy, UserTechnique, SeverityChoices
from shared.models import Allergen
from .serializers import (
    UserProfileSerializer, UserAllergyListSerializer, UserCuisineListSerializer, UserTechniqueListSerializer, UserAllergyDetailSerializer, UserCuisineDetailSerializer, UserTechniqueDetailSerializer, CustomTokenObtainPairSerializer,
    UserRegistrationSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
)
from shared.serializers import AllergenSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class PasswordRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Password reset email sent'
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Password successfully reset'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile= user.profile
        serializer = UserProfileSerializer(profile)
        profile_data = dict(serializer.data)

        return Response({
            **profile_data,
            "id": user.id,
            "username": user.username,
            "email": user.email,
        })

class UserRegistrationOptionsView(APIView):
    permission_classes =[AllowAny]

    def get(self, request):
        allergens = Allergen.objects.all()
        allergen_data = AllergenSerializer(allergens, many=True).data

        severity_options = [
            {"value": key, "label": label}
            for key, label in SeverityChoices.choices
        ]

        return Response({
            "allergens": allergen_data,
            "severity_options": severity_options 
        })

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                },
                'message': 'User registered successfully'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
