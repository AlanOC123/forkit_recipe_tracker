from django.core.management.base import BaseCommand
from shared.models import Allergen, Cuisine, Level, Technique, Tag

class Command(BaseCommand):
    help = "Seed lookup tables with initial data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding lookup tables..\n")

        allergens = [
            'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Soy',
            'Wheat', 'Fish', 'Shellfish', 'Gluten', 'Sesame'
        ]

        for allergen in allergens:
            Allergen.objects.get_or_create(name=allergen)
        
        self.stdout.write(self.style.SUCCESS(f"Created {len(allergens)} allergens...\n"))

        cuisines = [
            {'name': 'Italian', 'icon': '🇮🇹'},
            {'name': 'Chinese', 'icon': '🇨🇳'},
            {'name': 'Mexican', 'icon': '🇲🇽'},
            {'name': 'French', 'icon': '🇫🇷'},
            {'name': 'Japanese', 'icon': '🇯🇵'},
            {'name': 'Indian', 'icon': '🇮🇳'},
            {'name': 'Thai', 'icon': '🇹🇭'},
            {'name': 'Greek', 'icon': '🇬🇷'},
            {'name': 'Spanish', 'icon': '🇪🇸'},
            {'name': 'Lebanese', 'icon': '🇱🇧'},
        ]

        for cuisine in cuisines:
            Cuisine.objects.get_or_create(
                name=cuisine['name'],
                defaults={'icon': cuisine['icon']}
            )
        
        self.stdout.write(self.style.SUCCESS(f"Created {len(cuisines)} cuisines...\n"))

        levels = [
            {'name': 'Beginner', 'tier': 1, 'min_xp': 0, 'max_xp': 99},
            {'name': 'Intermediate', 'tier': 2, 'min_xp': 100, 'max_xp': 299},
            {'name': 'Advanced', 'tier': 3, 'min_xp': 300, 'max_xp': 599},
            {'name': 'Expert', 'tier': 4, 'min_xp': 600, 'max_xp': 999},
            {'name': 'Master', 'tier': 5, 'min_xp': 1000, 'max_xp': 10000},
        ]

        for level in levels:
            Level.objects.get_or_create(
                tier=level['tier'],
                defaults={
                    'name': level['name'],
                    'min_xp': level['min_xp'],
                    'max_xp': level['max_xp']
                }
            )
        
        self.stdout.write(self.style.SUCCESS(f"Created {len(levels)} levels...\n"))

        techniques = [
            {'name': 'Knife Skills', 'icon': '🔪'},
            {'name': 'Sauce Making', 'icon': '🥫'},
            {'name': 'Baking', 'icon': '🍰'},
            {'name': 'Grilling', 'icon': '🔥'},
            {'name': 'Sautéing', 'icon': '🍳'},
            {'name': 'Braising', 'icon': '🍲'},
            {'name': 'Fermentation', 'icon': '🫙'},
            {'name': 'Pasta Making', 'icon': '🍝'},
        ]

        for technique in techniques:
            Technique.objects.get_or_create(
                name=technique['name'],
                defaults={'icon': technique['icon']}
            )
        
        self.stdout.write(self.style.SUCCESS(f"Created {len(techniques)} techniques...\n"))

        tags = [
            # Dietary
            {'name': 'Vegetarian', 'category': 'dietary'},
            {'name': 'Vegan', 'category': 'dietary'},
            {'name': 'Gluten-Free', 'category': 'dietary'},
            {'name': 'Dairy-Free', 'category': 'dietary'},
            {'name': 'Keto', 'category': 'dietary'},
            {'name': 'Paleo', 'category': 'dietary'},
            
            # Method
            {'name': 'One-Pot', 'category': 'method'},
            {'name': 'Quick', 'category': 'method'},
            {'name': 'Slow Cooker', 'category': 'method'},
            {'name': 'Instant Pot', 'category': 'method'},
            {'name': 'No-Cook', 'category': 'method'},
            
            # Occasion
            {'name': 'Weeknight Dinner', 'category': 'occasion'},
            {'name': 'Date Night', 'category': 'occasion'},
            {'name': 'Meal Prep', 'category': 'occasion'},
            {'name': 'Party Food', 'category': 'occasion'},
            {'name': 'Holiday', 'category': 'occasion'},
        ]

        for tag in tags:
            Tag.objects.get_or_create(
                name=tag["name"],
                defaults={"category": tag["category"]}
            )
        
        self.stdout.write(self.style.SUCCESS(f"Created {len(tags)} tags...\n"))

        self.stdout.write(self.style.SUCCESS(f"\nAll lookup tables seeded!\n"))
