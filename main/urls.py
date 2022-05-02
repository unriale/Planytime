from django.urls import path, include

from . import views
from .views import UserViewSet, signup

from rest_framework import routers
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'user', UserViewSet)


urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('router/', include(router.urls)),
]
