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