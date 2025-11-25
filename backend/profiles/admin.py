from django.contrib import admin
from .models import UserProfile, UserAllergy, UserCuisine, UserTechnique

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(UserAllergy)
admin.site.register(UserCuisine)
admin.site.register(UserTechnique)