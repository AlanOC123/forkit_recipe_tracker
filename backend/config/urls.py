from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from profiles.views import (
    CustomTokenObtainPairView,
    UserRegistrationView,
    PasswordRequestView,
    PasswordConfirmView
)

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # My App APIs
    path('api/', include('shared.urls')),
    path('api/', include('profiles.urls')),
    path('api/', include('recipes.urls')),

    # JWT Authentiation Endpoints
    path('api/token/', CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('api/token/verify/', TokenVerifyView.as_view(), name="token_verify"),

    # Register
    path('api/register/', UserRegistrationView.as_view(), name='user_register'),

    # Password Reset Endpoints
    path('api/password-reset/', PasswordRequestView.as_view(), name="password_reset"),
    path('api/password-reset/confirm/', PasswordConfirmView.as_view(), name="password_reset_confirm"),
]