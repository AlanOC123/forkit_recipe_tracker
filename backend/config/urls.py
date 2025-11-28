from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from profiles.views import CustomTokenObtainPairView

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # My App APIs
    path('api/', include('shared.urls')),
    path('api/', include('profiles.urls')),
    path('api/', include('recipes.urls')),

    # JWT Authentiation Endpoints
    path('api/token', CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/token/verify', TokenVerifyView.as_view(), name="token_verify"),
]