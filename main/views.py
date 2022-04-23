from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User, auth
from rest_framework import viewsets
from . import serializers
from .serializers import UserSerializer
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def home(request):
    return render(request, 'home.html', {'name': 'CAR'})


def singup(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]

        if not User.objects.filter(username=username).exists():
            if not User.objects.filter(email=email).exists():
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                return Response({"signed_up": True})
            return Response({"signed_up": False})


    

def register(request):
    if request.method == "POST":
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]

        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(
                username=username, first_name=first_name, last_name=last_name, email=email, password=password)
            user.save()
            print("User was added (hope so...)")
        else:
            print("USername is taken")

    else:
        print("NOT POST")
    return redirect("/")


def login_forms(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        print(username)

        print(password)

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            print("_________LOGGED IN____________")
            auth.login(request, user)
            return Response({"loggedin": True})

        else:
            print("______USER WAS NOT FOUND IN THE DATABASE________")
            return Response({"loggedin": False})

    return redirect("/")


@csrf_exempt
def login(request):
    print("----------Request method: ", request.method)
    if request.method == "POST":
        email = request.POST.get('email', False)
        # email = request.POST["email"]
        password = request.POST.get('password', False)

        print("AAAAAAAAAAa")
        print(email)

        user = auth.authenticate(email=email, password=password)

        if user is not None:
            print("_________LOGGED IN____________")
            auth.login(request, user)
            return Response({"loggedin": True})

        else:
            print("______USER WAS NOT FOUND IN THE DATABASE________")
            return Response({"loggedin": False})

    return redirect("/")


class Login(APIView):

    def post(self, request):

        email = request.data["email"]
        password = request.data["password"]

        print(User.objects.filter(email=email))

        user = auth.authenticate(username="alisa", password="12345")
        print("LOOOK")
        print(user)

        if user is not None:
            print("_________LOGGED IN____________")
            auth.login(request, user)
            return Response({"loggedin": True})

        else:
            print("______USER WAS NOT FOUND IN THE DATABASE________")
            return Response({"loggedin": False})
