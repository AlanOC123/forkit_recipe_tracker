from django.db import models
from django.contrib.auth.models import User
from shared.models import Allergen, Cuisine, Technique, Level

class UserProfile(models.Model):
    user = models.OneToOneField(
        verbose_name="User Profile",
        to=User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    bio = models.TextField(
        verbose_name="User Biography",
        null=True,
        blank=True
    )

    avatar = models.ImageField(
        verbose_name="User Avatar",
        upload_to='avatars/',
        null=True,
        blank=True
    )

    location = models.CharField(
        verbose_name="User Location",
        max_length=50,
        null=True,
        blank=True
    )

    website = models.URLField(
        verbose_name="User Website",
        max_length=100,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        verbose_name="Updated At",
        auto_now=True
    )

    @property
    def get_avatar(self):
        if self.avatar:
            return self.avatar.url

        return "static/images/default-avatar.png"

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"
        ordering = ["-created_at"]
    
    def __str__(self) -> str:
        return f"User Profile for {self.user.username}"

class UserAllergy(models.Model):
    class SeverityChoices(models.TextChoices):
        MILD = "mild", "Mild"
        MODERATE = "moderate", "Moderate"
        SEVERE = "severe", "Severe"
        ANAPHYLAXIS = "anaphylaxis", "Anaphylaxis"
    
    user_profile = models.ForeignKey(
        to=UserProfile,
        on_delete=models.CASCADE,
        related_name="allergies"
    )

    allergen = models.ForeignKey(
        to=Allergen,
        on_delete=models.PROTECT,
        related_name="user_allergies"
    )
    
    severity = models.CharField(
        verbose_name="User Allergy Severity",
        max_length=20,
        choices=SeverityChoices.choices
    )

    notes = models.TextField(
        verbose_name="User Allergy Notes",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True
    )

    class Meta:
        verbose_name = "User Allergy"
        verbose_name_plural = "User Allergies"
        ordering = ["severity"]
        unique_together = ("user_profile", "allergen")
    
    def __str__(self) -> str:
        return f"({self.user_profile.user.username}) - ({self.severity}) - ({self.allergen.name})"

class UserCuisine(models.Model):
    user_profile = models.ForeignKey(
        verbose_name="User Profile",
        to=UserProfile,
        on_delete=models.CASCADE,
        related_name="cuisines"
    )

    cuisine = models.ForeignKey(
        verbose_name="User Cuisine",
        to=Cuisine,
        on_delete=models.PROTECT,
        related_name="user_cuisines"
    )

    level = models.ForeignKey(
        verbose_name="User Cuisine Level",
        to=Level,
        on_delete=models.PROTECT,
        related_name="user_cuisines_at_this_level"
    )
    
    experience = models.PositiveIntegerField(
        verbose_name="User Cuisine Experience Points",
        default=0
    )

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        verbose_name="Updated At",
        auto_now=True
    )

    class Meta:
        verbose_name = "User Cuisine Record"
        verbose_name_plural = "User Cuisine Records"
        ordering = ["-experience"]
        unique_together = ("user_profile", "cuisine")
    
    def __str__(self) -> str:
        return f"({self.user_profile.user.username}) - ({self.experience}) - ({self.level.name}) - ({self.cuisine.name})"
    
class UserTechnique(models.Model):
    user_profile = models.ForeignKey(
        verbose_name="User Profile",
        to=UserProfile,
        on_delete=models.CASCADE,
        related_name="techniques"
    )

    technique = models.ForeignKey(
        verbose_name="User Technique",
        to=Technique,
        on_delete=models.PROTECT,
        related_name="user_techniques"
    )

    level = models.ForeignKey(
        verbose_name="User Technique Level",
        to=Level,
        on_delete=models.PROTECT,
        related_name="user_techniques_at_this_level"
    )
    
    experience = models.PositiveIntegerField(
        verbose_name="User Technique Experience Points",
        default=0
    )

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        verbose_name="Updated At",
        auto_now=True
    )

    class Meta:
        verbose_name = "User Technique Record"
        verbose_name_plural = "User Technique Records"
        ordering = ["-experience"]
        unique_together = ("user_profile", "technique")
    
    def __str__(self) -> str:
        return f"({self.user_profile.user.username}) - ({self.experience}) - ({self.level.name}) - ({self.technique.name})"