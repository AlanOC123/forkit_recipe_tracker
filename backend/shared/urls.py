from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register('allergens', views.AllergenViewSet)
router.register('techniques', views.TechniqueViewSet)
router.register('cuisines', views.CuisineViewSet)
router.register('tags', views.TagViewSet)
router.register('levels', views.LevelViewSet)

urlpatterns = router.urls