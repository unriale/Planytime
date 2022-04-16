from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from rest_framework import viewsets
from . import serializers 
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def home(request):
    return render(request, 'home.html', {'name':'CAR'})


def register(request):
    if request.method == "POST":
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]

        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
            user.save()
            print("User was added (hope so...)")
        else:
            print("USername is taken")

    else:
        print("NOT POST")
    return redirect("/")


def login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = auth.authenticate(username=username, password=password)
        
        if user is not None:
            auth.login(request, user)
            print("_________LOGGED IN____________")
        else:
            print("______USER WAS NOT FOUND IN THE DATABASE________")

    return redirect("/")


        