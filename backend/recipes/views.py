from django.shortcuts import render
from rest_framework import viewsets
from .serializers import (
    RecipeAllergenListSerializer, RecipeAllergenDetailSerializer, RecipeCuisineListSerializer, 
    RecipeCuisineDetailSerializer, RecipeTechniqueListSerializer, RecipeTechniqueDetailSerializer,
    RecipeCompletionSerializer, RecipeCreateSerializer, RecipeDetailSerializer, RecipeListSerializer,
    IngredientSerializer, StepSerializer
)
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
)
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Recipe, RecipeAllergen, RecipeCompletion, RecipeCuisine, RecipeTechnique, Ingredient, Step
from django.db.models import Q
from rest_framework.exceptions import PermissionDenied

class RecipeAllergenViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecipeAllergen.objects.filter(recipe__author=self.request.user.profile)

    def get_serializer_class(self):
        if self.action == 'list':
            return RecipeAllergenListSerializer
        else:
            return RecipeAllergenDetailSerializer

class RecipeCuisineViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecipeCuisine.objects.filter(recipe__author=self.request.user.profile)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return RecipeCuisineListSerializer
        else:
            return RecipeCuisineDetailSerializer

class RecipeTechniqueViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecipeTechnique.objects.filter(recipe__author=self.request.user.profile)

    def get_serializer_class(self):
        if self.action == 'list':
            return RecipeTechniqueListSerializer
        else:
            return RecipeTechniqueDetailSerializer
        
class RecipeCompletionViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin):
    serializer_class = RecipeCompletionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecipeCompletion.objects.filter(user_profile=self.request.user.profile)
    
    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user.profile)

class IngredientViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    serializer_class = IngredientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Ingredient.objects.filter(recipe__author=self.request.user.profile)

class StepViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    serializer_class = StepSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Step.objects.filter(recipe__author=self.request.user.profile)

class RecipeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        public_key = Recipe.StatusChoices.PUBLIC
        query_set = Recipe.objects.filter(status=public_key)

        if self.request.user.is_authenticated:
            query_set = Recipe.objects.filter(Q(status=public_key) | Q(author=self.request.user.profile)).distinct()

        author_id = self.request.query_params.get("author")
        if author_id:
            query_set = query_set.filter(author__id=author_id)
        
        course = self.request.query_params.get("course")
        if course:
            query_set = query_set.filter(course__iexact=course)
        
        cuisine = self.request.query_params.get("cuisine")
        if cuisine:
            query_set = query_set.filter(cuisines__cuisine__name__iexact=cuisine)
        
        tag = self.request.query_params.get("tag")
        if tag:
            query_set = query_set.filter(
                tags__name__iexact=tag
            )
        
        search_term = self.request.query_params.get("term")
        if search_term:
            query_set = query_set.filter(
                title__icontains=search_term
            )
        
        ordering = self.request.query_params.get('ordering')
        if ordering == "fork_count":
            query_set = query_set.order_by('-created_at')

        return query_set

    
    def get_serializer_class(self):
        if self.action == 'list':
            return RecipeListSerializer
        
        elif self.action in ["create", "update", "partial_update"]:
            return RecipeCreateSerializer
        return RecipeDetailSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)
    
    def perform_update(self, serializer):
        if serializer.instance.author == self.request.user.profile:
            serializer.save()
        else:
            raise PermissionDenied("You can only edit your own recipe")
    
    def perform_destroy(self, instance):
        if instance.author == self.request.user.profile:
            instance.delete()
        else:
            raise PermissionDenied("You can only delete your own recipe")