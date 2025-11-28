from rest_framework.routers import DefaultRouter
from . import views, models

router = DefaultRouter()

router.register('recipes', views.RecipeViewSet, basename='recipe')
router.register('recipe_allergens', views.RecipeAllergenViewSet, basename='recipe_allergen')
router.register('recipe_cuisines', views.RecipeCuisineViewSet, basename='recipe_cuisine')
router.register('recipe_techniques', views.RecipeTechniqueViewSet, basename='recipe_technique')
router.register('recipe_completions', views.RecipeCompletionViewSet, basename='recipe_completion')
router.register('ingredients', views.IngredientViewSet, basename='ingredient')
router.register('steps', views.StepViewSet, basename='step')

urlpatterns = router.urls