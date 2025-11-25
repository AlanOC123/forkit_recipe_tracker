from django.contrib import admin
from .models import Recipe, RecipeAllergen, RecipeCuisine, RecipeCompletion, RecipeTechnique, Ingredient, Step

# Register your models here.
admin.site.register(RecipeAllergen)
admin.site.register(RecipeTechnique)
admin.site.register(RecipeCuisine)
admin.site.register(RecipeCompletion)
admin.site.register(Ingredient)
admin.site.register(Step)

class IngredientInline(admin.TabularInline):
    model=Ingredient
    extra = 1

class StepInline(admin.TabularInline):
    model=Step
    extra = 1

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display=['title', 'author', 'difficulty', 'status', 'created_at']
    list_filter=['difficulty', 'course', 'status']
    search_fields=['title', 'description']
    inlines=[IngredientInline, StepInline]