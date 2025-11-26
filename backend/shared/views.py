from django.shortcuts import render
from rest_framework import viewsets
from .models import Cuisine, Allergen, Tag, Technique, Level
from .serializers import (
    AllergenSerializer, CuisineSerializer, TechniqueSerializer, TagSerializer, LevelSerializer
)

class AllergenViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializer

class CuisineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer

class TechniqueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Technique.objects.all()
    serializer_class = TechniqueSerializer

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class LevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
