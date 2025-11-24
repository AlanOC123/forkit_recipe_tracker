from django.db import models

class AllergyChoices(models.TextChoices):
    GLUTEN = "gluten", "Gluten"
    CRUSTACEANS = "crustaceans", "Crustaceans"
    EGGS = "eggs", "Eggs"
    FISH = "fish", "Fish"
    PEANUTS = "peanuts", "Peanuts"
    SOYBEAN = "soybeans", "Soybeans"
    LACTOSE = "lactose", "Lactose"
    NUTS = "nuts", "Nuts"
    CELERY = "celery", "Celery"
    MUSTARD = "mustard", "Mustard"
    SEEDS = "seeds", "Seeds"
    SESAME = "sesame", "Sesame"
    SULPHITES = "sulphites", "Sulphites"
    LUPIN = "lupin", "Lupin"
    MOLLUSCS = "molluscs", "Molluscs"

class LevelChoices(models.TextChoices):
    BEGINNER = "beginner", "Beginner"
    INTERMEDIATE = "intermediate", "Intermediate"
    EXPERT = "expert", "Expert"
    PROFESSIONAL = "professional", "Professional"

class CuisineChoices(models.TextChoices):
    ITALIAN = 'italian', 'Italian'
    MEXICAN = 'mexican', 'Mexican'
    THAI = 'thai', 'Thai'
    JAPANESE = 'japanese', 'Japanese'
    INDIAN = 'indian', 'Indian'
    CHINESE = 'chinese', 'Chinese'
    FRENCH = 'french', 'French'
    GREEK = 'greek', 'Greek'
    AMERICAN = 'american', 'American'
    MEDITERRANEAN = 'mediterranean', 'Mediterranean'
    OTHER = 'other', 'Other'

class CourseChoices(models.TextChoices):
    BREAKFAST = 'breakfast', 'Breakfast'
    BRUNCH = 'brunch', 'Brunch'
    LUNCH = 'lunch', 'Lunch'
    DINNER = 'dinner', 'Dinner'
    DESSERT = 'dessert', 'Dessert'
    SNACK = 'snack', 'Snack'
    APPETIZER = 'appetizer', 'Appetizer'
    SIDE = 'side', 'Side Dish'
    BEVERAGE = 'beverage', 'Beverage'