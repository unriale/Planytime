from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'password', 'last_login', 'is_superuser', 'username', 
        'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined')
