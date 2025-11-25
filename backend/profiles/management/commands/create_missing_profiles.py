from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from profiles.models import UserProfile

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        users_without_profile = User.objects.filter(profile__isnull=True)
        count=0

        for user in users_without_profile:
            profile = UserProfile.objects.create(user=user)
            count +=1 
        
        self.stdout.write(self.style.SUCCESS(f'✅ Created {count} missing profiles'))