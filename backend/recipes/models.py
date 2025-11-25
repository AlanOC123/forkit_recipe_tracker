from django.db import models
from django.db.models import Q, QuerySet
from shared.models import Level, Cuisine, Technique, Tag, Allergen
from profiles.models import UserProfile
from typing import TYPE_CHECKING

class DifficultyChoices(models.TextChoices):
    EASY = "easy", "Easy"
    MEDIUM = "medium", "Medium"
    HARD = "hard", "Hard"
    VERY_HARD = "very_hard", "Very Hard"

class Recipe(models.Model):
    class StatusChoices(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLIC = "public", "Public"
        PRIVATE = "private", "Private"
    
    class CourseChoices(models.TextChoices):
        BREAKFAST = "breakfast", "Breakfast"
        BRUNCH = "brunch", "Brunch"
        LUNCH = "lunch", "Lunch"
        APPETISER = "appetiser", "Appetiser"
        STARTER = "starter", "Starter"
        MAIN = "main", "Main"
        DESSERT = "dessert", "Dessert"
        SNACK = "snack", "Snack"

    author = models.ForeignKey(
        verbose_name="Recipe Author",
        to=UserProfile,
        on_delete=models.SET_NULL,
        null=True,
        related_name="recipes"
    )

    title = models.CharField(
        verbose_name="Recipe Title",
        max_length=100
    )

    description = models.TextField(
        verbose_name="Recipe Description",
        blank=True,
        null=True
    )

    status = models.CharField(
        verbose_name="Recipe Status",
        max_length=15,
        choices=StatusChoices.choices,
        default=StatusChoices.DRAFT
    )

    course = models.CharField(
        verbose_name="Recipe Course",
        max_length=20,
        choices=CourseChoices.choices
    )

    difficulty = models.CharField(
        verbose_name="Recipe Difficulty",
        max_length=15,
        choices=DifficultyChoices.choices,
        default=DifficultyChoices.MEDIUM
    )

    prep_time = models.PositiveIntegerField(
        verbose_name="Recipe Preparation Time",
        default=10,
    )

    cook_time = models.PositiveIntegerField(
        verbose_name="Recipe Cooking Time",
        default=30,
    )

    parent_recipe = models.ForeignKey(
        to='self',
        on_delete=models.SET_NULL,
        related_name="forks",
        null=True,
        blank=True
    )

    servings = models.PositiveIntegerField(
        verbose_name="Recipe Servings",
        default=1
    )

    tags = models.ManyToManyField(
        verbose_name="Recipe Tags",
        to=Tag,
        related_name="recipes"
    )

    created_at = models.DateTimeField(
        verbose_name="Created At", 
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        verbose_name="Updated At", 
        auto_now=True
    )

    if TYPE_CHECKING:
        forks: QuerySet['Recipe'] 

    @property
    def fork_count(self):
        return self.forks.count()

    class Meta:
        verbose_name = "Recipe"
        verbose_name_plural = "Recipes"
        ordering = ["-created_at"]
        unique_together = ('author', 'title')
    
    def __str__(self):
        return self.title

class Step(models.Model):
    recipe = models.ForeignKey(
        verbose_name="Related Recipe",
        to=Recipe,
        on_delete=models.CASCADE,
        related_name="steps"
    )

    order = models.PositiveIntegerField(
        verbose_name="Step Order",
        default=1
    )

    instruction = models.TextField(
        verbose_name="Step Instruction"
    )

    duration = models.PositiveIntegerField(
        verbose_name="Step Duration",
        blank=True,
        null=True
    )

    is_timed = models.BooleanField(
        verbose_name="Timed Step?",
        default=False
    )

    class Meta:
        verbose_name = "Step"
        verbose_name_plural = "Steps"
        ordering = ["order"]
        unique_together = ("recipe", "order")
        
        constraints = [
            models.CheckConstraint(
                check=Q(is_timed=False) | Q(duration__isnull=False),
                name="timed_steps_must_have_duration_set and vice versa"
            )
        ]
    
    def __str__(self):
        return f"({self.recipe.title}) - Step {(self.order if self.order else "X")}"

class Ingredient(models.Model):
    recipe = models.ForeignKey(
        verbose_name="Related Recipe",
        to=Recipe,
        on_delete=models.CASCADE,
        related_name="ingredients"
    )

    order = models.PositiveIntegerField(
        verbose_name="Ingredient Order",
        default=1
    )

    name = models.CharField(
        verbose_name="Ingredient Name",
        max_length=100
    )

    quantity = models.DecimalField(
        verbose_name="Ingredient Quantity",
        blank=True,
        null=True,
        max_digits=6,
        decimal_places=2,
    )

    unit = models.CharField(
        verbose_name="Ingredient Unit",
        blank=True,
        null=True,
        max_length=50
    )

    is_optional = models.BooleanField(
        verbose_name="Optional Ingredient?",
        default=False
    )

    notes = models.TextField(
        verbose_name="Ingredient Notes",
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = "Ingredient"
        verbose_name_plural = "Ingredients"
        ordering = ["order"]
        unique_together = ("recipe", "order")
    
    def __str__(self):
        return f"({self.recipe.title}) - ({self.name})"

class RecipeTechnique(models.Model):
    recipe = models.ForeignKey(
        verbose_name="Related Recipe",
        to=Recipe,
        on_delete=models.CASCADE,
        related_name="techniques"
    )

    technique = models.ForeignKey(
        verbose_name="Related Technique",
        to=Technique,
        on_delete=models.PROTECT,
        related_name="recipes_technique_used_in"
    )

    level = models.ForeignKey(
        verbose_name="Related Level",
        to=Level,
        on_delete=models.PROTECT,
        related_name="recipe_technique_at_this_level"
    )

    class Meta:
        verbose_name = "Recipe Technique"
        verbose_name_plural = "Recipe Techniques"
        ordering = ["level__tier"]
        unique_together = ("recipe", "technique")
    
    def __str__(self) -> str:
        return f"({self.recipe.title}) - ({self.level.name}) - ({self.technique.name})"

class RecipeCuisine(models.Model):
    recipe = models.ForeignKey(
        verbose_name="Related Recipe",
        to=Recipe,
        on_delete=models.CASCADE,
        related_name="cuisines"
    )

    cuisine = models.ForeignKey(
        verbose_name="Related Cuisine",
        to=Cuisine,
        on_delete=models.PROTECT,
        related_name="recipes"
    )

    level = models.ForeignKey(
        verbose_name="Related Level",
        to=Level,
        on_delete=models.PROTECT,
        related_name="recipe_cuisines_at_this_level"
    )

    class Meta:
        verbose_name = "Recipe Cuisine"
        verbose_name_plural = "Recipe Cuisines"
        ordering = ["level__tier"]
        unique_together = ("recipe", "cuisine")
    
    def __str__(self) -> str:
        return f"({self.recipe.title}) - ({self.level.name}) - ({self.cuisine.name})"

class RecipeAllergen(models.Model):
    class AmountChoices(models.TextChoices):
        TRACE = "trace", "Trace"
        LOW = "low", "Low"
        MEDIUM = "medium", "Medium"
        HIGH = "high", "High"
    
    recipe = models.ForeignKey(
        to=Recipe,
        on_delete=models.CASCADE,
        related_name="allergens"
    )

    allergen = models.ForeignKey(
        verbose_name="Recipe Allergen",
        to=Allergen,
        on_delete=models.PROTECT,
        related_name="recipes"
    )
    
    amount = models.CharField(
        verbose_name="Recipe Allergy Amount",
        max_length=20,
        choices=AmountChoices.choices
    )

    notes = models.TextField(
        verbose_name="Recipe Allergy Notes",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Recipe Allergen"
        verbose_name_plural = "Recipe Allergens"
        ordering = ["amount"]
        unique_together = ("recipe", "allergen")
    
    def __str__(self) -> str:
        return f"({self.recipe.title}) - ({self.amount}) - ({self.allergen.name})"

class RecipeCompletion(models.Model):
    user_profile = models.ForeignKey(
        verbose_name="User Completed",
        to=UserProfile,
        on_delete=models.CASCADE,
        related_name="completions"
    )

    recipe = models.ForeignKey(
        verbose_name="Recipe Completed",
        to=Recipe,
        on_delete=models.CASCADE,
        related_name="completions"
    )

    notes = models.TextField(
        verbose_name="Completion Notes",
        null=True,
        blank=True
    )

    time_taken = models.PositiveIntegerField(
        verbose_name="Time Taken"
    )

    steps_skipped = models.PositiveIntegerField(
        verbose_name="Steps Skipped",
        blank=True,
        null=True,
        default=0
    )

    completed_at = models.DateTimeField(
        verbose_name="Completed At",
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Completion Record"
        verbose_name_plural = "Completion Records"
        ordering = ["-completed_at"]
    
    def __str__(self) -> str:
        return f"({self.user_profile.user.username}) - (COMPLETED) - ({self.recipe.title})"