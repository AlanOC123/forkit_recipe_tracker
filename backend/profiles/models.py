from django.db import models
from django.contrib.auth.models import User
from config.shared import AllergyChoices

class UserProfile(models.Model):
    bio = models.TextField(
        verbose_name="Biography",
        max_length=500,
        help_text="Tell us about yourself!",
        blank=True
    )

    profile_picture = models.ImageField(
        verbose_name="Profile Picture",
        upload_to='profile_pictures/', 
        blank=True, 
        null=True,
        help_text="Your profile picture"
    )

    location = models.CharField(
        verbose_name="Location",
        max_length=100, 
        blank=True,
        help_text="City, Country"
    )

    website = models.URLField(
        verbose_name="Website",
        help_text="Personal website or blog",
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

    user = models.OneToOneField(
        to=User, 
        related_name='profile', 
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"
        ordering = ["-created_at"]

    def __str__(self):
        return f"Profile for {self.user.username}"
    
    @property
    def recipe_count(self):
        return self.user.recipes.count()

    @property
    def follower_count(self):
        return self.user.followers.count()

    @property
    def following_count(self):
        return self.user.following.count()
    
    def get_profile_picture(self):
        if self.profile_picture:
            return self.profile_picture.url
        return 'static/images/default-avatar.png'

class UserAllergy(models.Model):
    class SeverityChoices(models.TextChoices):
        MILD = 'mild', 'Mild (Avoid if possible)'
        MODERATE = 'moderate', 'Moderate (Causes discomfort)'
        SEVERE = 'severe', 'Severe (Medical attention needed)'
        ANAPHYLAXIS = 'anaphylaxis', 'Anaphylaxis (Life-threatening)'
    
    user_profile = models.ForeignKey(
        to=UserProfile,
        on_delete=models.CASCADE,
        related_name="allergies"
    )

    allergy_type = models.CharField(
        max_length=50,
        choices=AllergyChoices.choices,
        help_text="Type of allergy"
    )

    severity = models.CharField(
        max_length=20,
        choices=SeverityChoices.choices,
        default=SeverityChoices.MODERATE, 
        help_text="Severity of allergic reaction"
    )

    notes = models.TextField(
        blank=True,
        help_text="Additional details (e.g., 'Can handle trace amounts')"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "User Allergy"
        verbose_name_plural = "User Allergies"
        unique_together = ('user_profile', 'allergy_type')
        ordering = ['-severity', 'allergy_type']

    def __str__(self):
        return f"{self.user_profile.user.username} - {self.get_allergy_type_display()} ({self.get_severity_display()})"

class Preference(models.Model):
    class ThemeModeChoices(models.TextChoices):
        LIGHT = "light", "Light"
        DARK = "dark", "Dark"
        SYSTEM = "system", "System"

    user_profile = models.OneToOneField(
        to=UserProfile, 
        on_delete=models.CASCADE, 
        related_name='preferences'
    )

    theme = models.CharField(
        verbose_name="Theme Mode",
        choices=ThemeModeChoices.choices, 
        max_length=15, 
        default=ThemeModeChoices.SYSTEM
    )

    class Meta:
        verbose_name = "User Preference"
        verbose_name_plural = "User Preferences"
