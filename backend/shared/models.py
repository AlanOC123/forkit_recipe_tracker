from django.db import models

class Allergen(models.Model):
    name = models.CharField(
        verbose_name="Allergen Name", 
        max_length=50,
        unique=True
    )

    description = models.TextField(
        verbose_name="Allergen Description", 
        blank=True,
        null=True
    )

    icon = models.CharField(
        verbose_name="Allergen Icon",
        max_length=30,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        verbose_name="Created At", 
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Allergen"
        verbose_name_plural = "Allergens"
        ordering = ["name"]
    
    def __str__(self):
        return self.name


class Cuisine(models.Model):
    name = models.CharField(
        verbose_name="Cuisine Name", 
        max_length=50,
        unique=True
    )

    description = models.TextField(
        verbose_name="Cuisine Description", 
        blank=True,
        null=True
    )

    icon = models.CharField(
        verbose_name="Cuisine Icon",
        max_length=30,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        verbose_name="Created At", 
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Cuisine"
        verbose_name_plural = "Cuisines"
        ordering = ["name"]
    
    def __str__(self):
        return self.name

class Level(models.Model):
    name = models.CharField(
        verbose_name="Level Name", 
        max_length=50,
        unique=True,
    )

    tier = models.PositiveSmallIntegerField(
        verbose_name="Level Tier", 
        unique=True,
    )

    description = models.TextField(
        verbose_name="Level Description", 
        blank=True,
        null=True
    )

    min_xp = models.PositiveIntegerField(
        verbose_name="Minimum Experience"
    )

    max_xp = models.PositiveIntegerField(
        verbose_name="Maximum Experience"
    )

    icon = models.CharField(
        verbose_name="Level Icon",
        max_length=30,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        verbose_name="Created At", 
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Level"
        verbose_name_plural = "Levels"
        ordering = ["tier"]
    
    def __str__(self):
        return f"Level: {self.name}. Tier: {self.tier}."

class Technique(models.Model):
    name = models.CharField(
        verbose_name="Technique Name", 
        max_length=50,
        unique=True
    )

    description = models.TextField(
        verbose_name="Technique Description", 
        blank=True,
        null=True
    )
    icon = models.CharField(
        max_length=30,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        verbose_name="Created At", 
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Technique"
        verbose_name_plural = "Techniques"
        ordering = ["name"]
    
    def __str__(self):
        return self.name

class Tag(models.Model):
    class TagCategoryChoices(models.TextChoices):
        DIETARY = "dietary", "Dietary"
        METHOD = "method", "Method"
        OCCASION = "occasion", "Occasion"

    name = models.CharField(
        verbose_name="Tag Name", 
        max_length=50,
        unique=True
    )

    category = models.CharField(
        verbose_name="Tag Category", 
        max_length=20,
        choices=TagCategoryChoices.choices
    )
    
    created_at = models.DateTimeField(
        verbose_name="Created At", 
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        ordering = ["name"]
    
    def __str__(self):
        return self.name