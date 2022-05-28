from django.urls import path, include, re_path

from . import views, google
from .views import UserViewSet

from rest_framework import routers
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'user', UserViewSet)


urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('router/', include(router.urls)),
    path('eventsgoogle/', google.get_google_events),
    re_path(r'api/v1/auth/login/google/$', google.GoogleLoginApi.as_view(), name="test"),
]
