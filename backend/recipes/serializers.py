from rest_framework import serializers
from shared.serializers import (
    AllergenSerializer, TagSerializer, TechniqueSerializer, CuisineSerializer, LevelSerializer
)
from .models import (
    Recipe, RecipeAllergen, RecipeCompletion, RecipeCuisine, RecipeTechnique, Step, Ingredient
)
from shared.models import Tag

class RecipeAllergenListSerializer(serializers.ModelSerializer):
    allergen=serializers.CharField(source='allergen.name', read_only=True)

    class Meta:
        model = RecipeAllergen
        fields = [
            'id' , 'allergen', 'amount',
            'notes', 'created_at'
        ]
        read_only_fields = [
            'id', 'allergen', 'created_at'
        ]

class RecipeAllergenDetailSerializer(serializers.ModelSerializer):
    allergen=AllergenSerializer(read_only=True)

    class Meta:
        model = RecipeAllergen
        fields = [
            'id' , 'allergen', 'amount',
            'notes', 'created_at'
        ]
        read_only_fields = [
            'id', 'allergen', 'created_at'
        ]

class RecipeCuisineListSerializer(serializers.ModelSerializer):
    cuisine=serializers.CharField(source='cuisine.name', read_only=True)
    level=serializers.CharField(source='level.name', read_only=True)

    class Meta:
        model = RecipeCuisine
        fields = [
            'id' , 'cuisine', 'level',
        ]
        read_only_fields = [
            'id'
        ]

class RecipeCuisineDetailSerializer(serializers.ModelSerializer):
    cuisine=CuisineSerializer(read_only=True)
    level=LevelSerializer(read_only=True)

    class Meta:
        model = RecipeCuisine
        fields = [
            'id' , 'cuisine', 'level'
        ]
        read_only_fields = [
            'id'
        ]

class RecipeTechniqueListSerializer(serializers.ModelSerializer):
    technique=serializers.CharField(source='technique.name', read_only=True)
    level=serializers.CharField(source='level.name', read_only=True)

    class Meta:
        model = RecipeTechnique
        fields = [
            'id' , 'technique', 'level',
        ]
        read_only_fields = [
            'id'
        ]

class RecipeTechniqueDetailSerializer(serializers.ModelSerializer):
    technique=TechniqueSerializer(read_only=True)
    level=LevelSerializer(read_only=True)

    class Meta:
        model = RecipeTechnique
        fields = [
            'id' , 'technique', 'level'
        ]
        read_only_fields = [
            'id'
        ]

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ingredient
        fields = [
            'id', 'order', 'name',
            'quantity', 'unit', 'is_optional',
            'notes'
        ]

        read_only_fields = [
            'id'
        ]

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model=Step
        fields = [
            'id', 'order', 'instruction',
            'duration', 'is_timed'
        ]

        read_only_fields = [
            'id'
        ]

class RecipeListSerializer(serializers.ModelSerializer):
    parent_recipe_title = serializers.CharField(source='parent_recipe.title', read_only=True)
    fork_count = serializers.IntegerField(read_only=True)
    author_username = serializers.CharField(source='author.user.username', read_only=True)
    tags = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'description',
            'status', 'course', 'difficulty',
            'prep_time', 'cook_time', 'servings',
            'created_at', 'updated_at', 'fork_count',
            'parent_recipe_title', 'tags', 'author_username'
        ]

        read_only_fields = [
            'id', 'created_at', 'updated_at',
            'fork_count', 'author_username', 'parent_recipe_title'
        ]

class RecipeDetailSerializer(serializers.ModelSerializer):
    steps = StepSerializer(read_only=True, many=True)
    ingredients = IngredientSerializer(read_only=True, many=True)
    parent_recipe_url = serializers.HyperlinkedRelatedField(source='parent_recipe', view_name='recipe-detail', read_only=True)
    fork_count = serializers.IntegerField(read_only=True)
    author_username = serializers.CharField(source='author.user.username', read_only=True)
    cuisines = RecipeCuisineListSerializer(read_only=True, many=True)
    allergens = RecipeAllergenListSerializer(read_only=True, many=True)
    techniques = RecipeTechniqueListSerializer(read_only=True, many=True)
    tags = TagSerializer(read_only=True, many=True)
    parent_recipe = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            'id', 'title', 'description',
            'status', 'course', 'difficulty',
            'prep_time', 'cook_time', 'servings',
            'created_at', 'updated_at', 'fork_count',
            'parent_recipe', 'tags','ingredients', 
            'steps', 'author_username', 'parent_recipe_url',
            'cuisines', 'allergens', 'techniques'
        ]

        read_only_fields = [
            'id', 'created_at', 'updated_at',
            'fork_count', 'parent_recipe_url', 'author_username', 
            'steps', 'ingredients', 'cuisines', 
            'allergens', 'techniques', 'tags'
        ]
    
    def get_parent_recipe(self, obj):
        if obj.parent_recipe:
            parent_recipe = obj.parent_recipe
            return {
                'id': parent_recipe.id,
                'title': parent_recipe.title,
                'author': parent_recipe.author.user.username, 
                'difficulty': parent_recipe.difficulty
            }
        return None

class RecipeCreateSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    steps = StepSerializer(many=True)
    parent_recipe = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(),
        required=False,
        allow_null=True
    )
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        required=False
    )

    class Meta:
        model = Recipe
        fields = [
            'title', 'description', 'status',
            'course', 'difficulty', 'prep_time',
            'cook_time', 'servings', 'tags',
            'ingredients', 'steps', 'parent_recipe'
        ]
    
    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        steps_data = validated_data.pop('steps')
        tags_data = validated_data.pop('tags', [])

        recipe = Recipe.objects.create(
            author = self.context['request'].user.profile,
            **validated_data
        )

        for ingredient in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient)
        
        for step in steps_data:
            Step.objects.create(recipe=recipe, **step)
        
        recipe.tags.set(tags_data)

        return recipe


class RecipeCompletionSerializer(serializers.ModelSerializer):
    user_profile = serializers.CharField(source='user_profile.user.username')

    recipe = serializers.SerializerMethodField()

    class Meta:
        model=RecipeCompletion
        fields = [
            'user_profile', 'recipe', 'notes',
            'time_taken', 'steps_skipped', 'completed_at',
        ]

        read_only_fields = [
            'user_profile', 'recipe', 'time_taken',
            'steps_skipped', 'completed_at'
        ]

    def get_recipe(self, obj):
        if obj.recipe:
            recipe = obj.recipe
            return {
                'id': recipe.id,
                'title': recipe.title,
                'difficulty': recipe.difficulty
            }
        return None
