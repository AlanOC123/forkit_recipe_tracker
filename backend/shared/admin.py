from django.contrib import admin
from .models import Allergen, Cuisine, Technique, Tag, Level

admin.site.register(Allergen)
admin.site.register(Cuisine)
admin.site.register(Technique)
admin.site.register(Level)
admin.site.register(Tag)
