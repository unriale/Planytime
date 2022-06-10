from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('events/', views.get_events),
    path('eventsave/', views.save_events),
    path('eventupdate/', views.update_event),
    path('eventdelete/', views.delete_event),
    path('getmonthevents/', views.get_month_events),
    path('getcolorevents/', views.get_color_events),
    path('replan/', views.replan),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
