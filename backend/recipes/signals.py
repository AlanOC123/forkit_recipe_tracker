from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RecipeCompletion, DifficultyChoices
from profiles.models import UserCuisine, UserTechnique
from shared.models import Level

DIFFICULTY_MAP = {
    DifficultyChoices.EASY.value: 10,
    DifficultyChoices.MEDIUM.value: 25,
    DifficultyChoices.HARD.value: 35,
    DifficultyChoices.VERY_HARD.value: 50,
}

@receiver(post_save, sender=RecipeCompletion)
def award_xp_on_completion(sender, instance: RecipeCompletion, created: bool, **kwargs):

    if not created:
        return
    
    recipe = instance.recipe
    user_profile = instance.user_profile

    difficulty_key = recipe.difficulty
    xp_gained = DIFFICULTY_MAP.get(difficulty_key, 10)

    for recipe_cuisine in recipe.cuisines.all():
        user_cuisine, _ = UserCuisine.objects.get_or_create(
            user_profile=user_profile,
            cuisine=recipe_cuisine.cuisine,
            defaults={'level_id': 1, 'experience': 0}
        )

        user_cuisine.experience += xp_gained

        new_level = Level.objects.filter(
            min_xp__lte=user_cuisine.experience,
            max_xp__gte=user_cuisine.experience,
        ).first()

        if new_level:
            user_cuisine.level = new_level
        
        user_cuisine.save()
    
    for recipe_technique in recipe.techniques.all():
        user_technique, _ = UserTechnique.objects.get_or_create(
            user_profile=user_profile,
            technique=recipe_technique.technique,
            defaults={'level_id': 1, 'experience': 0}
        )

        user_technique.experience += xp_gained

        new_level = Level.objects.filter(
            min_xp__lte=user_technique.experience,
            max_xp__gte=user_technique.experience,
        ).first()

        if new_level:
            user_technique.level = new_level

        user_technique.save()