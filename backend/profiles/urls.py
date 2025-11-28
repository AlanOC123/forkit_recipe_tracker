from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet, UserCuisineViewSet, UserTechniqueViewSet, UserAllergyViewSet, CustomTokenObtainPairView
)

router = DefaultRouter()

router.register('profiles', UserProfileViewSet, basename='userprofile')
router.register('user-cuisines', UserCuisineViewSet, basename='usercuisine')
router.register('user-techniques', UserTechniqueViewSet, basename='usertechnique')
router.register('user-allergies', UserAllergyViewSet, basename='userallergy')

urlpatterns = router.urls