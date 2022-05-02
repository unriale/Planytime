from django.http import JsonResponse
from django.shortcuts import redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def signup(request):
    username = request.data['username']
    email = request.data['email']
    password = request.data['password']

    if not User.objects.filter(username=username).exists():
        if not User.objects.filter(email=email).exists():
            user = User.objects.create_user(
                username=username, email=email, password=password)
            user.save()
            print("User was created")
            serializer = UserSerializer(user)
            return Response(serializer.data, status=200)
        return Response({'error': 'email exists'}, status=400)
    return Response({'error': 'username exists'}, status=400)
