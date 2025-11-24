from django.db import models
from django.contrib.auth.models import User
from config.shared import LevelChoices, AllergyChoices, CourseChoices, CuisineChoices

class Tag(models.Model):
    class CategoryChoices(models.TextChoices):
        DIETARY = 'dietary', 'Dietary'
        METHOD = 'method', 'Method'
        OCCASION = 'occasion', 'Occasion' 

    name = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=20, choices=CategoryChoices.choices)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        ordering = ['category', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

class Recipe(models.Model):
    class StatusChoices(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLIC = "public", "Public"
        PRIVATE = "private", "Private"

    allergens = models.JSONField(
        default=list,
        blank=True,
        help_text="List of allergens (e.g., ['gluten', 'dairy', 'eggs'])"
    )

    author = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='recipes'
    )

    parent_recipe = models.ForeignKey(
        'self', null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='forks'
    )
    
    name = models.CharField(
        max_length=200
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to='recipe_images/', 
        blank=True, 
        null=True
    )
    
    status = models.CharField(
        max_length=10, 
        choices=StatusChoices.choices, 
        default=StatusChoices.DRAFT
    )

    servings = models.PositiveIntegerField()
    prep_time = models.PositiveIntegerField()
    cook_time = models.PositiveIntegerField()

    level = models.CharField(
        max_length=20, 
        choices=LevelChoices.choices, 
        default=LevelChoices.BEGINNER
    )

    cuisine = models.CharField(
        choices=CuisineChoices.choices,
        max_length=50,
    )

    course = models.CharField(
        choices=CourseChoices.choices,
        max_length=50
    )
    
    tags = models.ManyToManyField(Tag, related_name='recipes', blank=True)
    fork_count = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Recipe"
        verbose_name_plural = "Recipes"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', '-created_at']),
            models.Index(fields=['author', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.name} by {self.author.username}"
    
    @property
    def total_time(self):
        """Total time in minutes"""
        return self.prep_time + self.cook_time
    
    @property
    def average_rating(self):
        """Average rating from reviews"""
        reviews = self.reviews.all()
        if reviews.exists():
            return reviews.aggregate(models.Avg('rating'))['rating__avg']
        return None
    
    @property
    def review_count(self):
        """Number of reviews"""
        return self.reviews.count()

from django.db import models
from django.core.validators import MinValueValidator


class Ingredient(models.Model):
    """Individual ingredient for a recipe"""
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name='ingredients',
        help_text="Recipe this ingredient belongs to"
    )
    name = models.CharField(
        max_length=200,
        help_text="Ingredient name (e.g., 'all-purpose flour')"
    )
    quantity = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Quantity amount (e.g., 2.5)"
    )
    unit = models.CharField(
        max_length=50,
        help_text="Unit of measurement (e.g., 'cups', 'tbsp', 'grams')"
    )
    order = models.PositiveIntegerField(
        help_text="Display order (1, 2, 3...)"
    )
    optional = models.BooleanField(
        default=False,
        help_text="Is this ingredient optional?"
    )
    notes = models.CharField(
        max_length=200,
        blank=True,
        help_text="Additional notes (e.g., 'plus extra for dusting')"
    )
    
    class Meta:
        verbose_name = "Ingredient"
        verbose_name_plural = "Ingredients"
        ordering = ['order']  # Display in order
        unique_together = [['recipe', 'order']]  # No duplicate orders per recipe
    
    def __str__(self):
        optional_text = " (optional)" if self.optional else ""
        notes_text = f" - {self.notes}" if self.notes else ""
        return f"{self.quantity} {self.unit} {self.name}{optional_text}{notes_text}"


class Step(models.Model):
    """Instruction step for a recipe"""
    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name='steps',
        help_text="Recipe this step belongs to"
    )
    order = models.PositiveIntegerField(
        help_text="Step number (1, 2, 3...)"
    )
    instruction = models.TextField(
        help_text="Detailed instruction for this step"
    )
    duration = models.PositiveIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(1)],
        help_text="Time for this step in minutes (optional)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Step"
        verbose_name_plural = "Steps"
        ordering = ['order']  # Display in order
        unique_together = [['recipe', 'order']]  # No duplicate orders per recipe
    
    def __str__(self):
        duration_text = f" ({self.duration} min)" if self.duration else ""
        instruction_preview = self.instruction[:50] + "..." if len(self.instruction) > 50 else self.instruction
        return f"Step {self.order}{duration_text}: {instruction_preview}"