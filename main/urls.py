from django.urls import path, include

from . import views, google
from .views import UserViewSet

from rest_framework import routers
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'user', UserViewSet)


urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('router/', include(router.urls)),
    path('gcevents/', google.get_google_calendar_events)
]
