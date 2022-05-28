from rest_framework import serializers
from rest_framework.views import APIView

from django.shortcuts import redirect

from .services import google_get_tokens, google_get_user_info, google_refresh_access_token
from googleapiclient.discovery import build
import urllib
import json
import pandas as pd
import time
from datetime import datetime
from .models import Token
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from decouple import config


class GoogleLoginApi(APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):

        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        domain = config('REACT_APP_BASE_BACKEND_URL')
        api_uri = "/api/v1/auth/login/google/"
        redirect_uri = f'{domain}{api_uri}'

        tokens = google_get_tokens(code=code, redirect_uri=redirect_uri)

        access_token = tokens["access_token"]
        refresh_token = tokens["refresh_token"]
        id_token = tokens["id_token"]

        user_data = google_get_user_info(access_token=access_token)

        user = None
        if User.objects.filter(email=user_data["email"]).exists():
            user = User.objects.get(email=user_data["email"])
            if not Token.objects.filter(user=user).exists():
                Token.objects.create(
                    user=user, access_token=access_token, refresh_token=refresh_token, id_token=id_token)
            else:
                Token.objects.update(
                    user=user, access_token=access_token, refresh_token=refresh_token, id_token=id_token)

        response = redirect(config('REACT_APP_BASE_FRONTEND_URL'))
        return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_google_events(request):
    user = request.user
    if not Token.objects.filter(user=user).exists():
        return Response({"message": "google calendar is not integrated yet"})

    tokens = Token.objects.get(user=user)
    access_token = tokens.access_token
    refresh_token = tokens.refresh_token

    response = None

    try:
        calendar_url = '{0}?access_token={1}'.format(
            config('REACT_APP_CALENDAR_URL'), access_token)
        response = fetch_google_events(request, calendar_url)
    except:
        new_tokens = google_refresh_access_token(refresh_token)
        Token.objects.update(user=user,
                             access_token=new_tokens["access_token"],
                             id_token=new_tokens["id_token"])
        calendar_url = '{0}?access_token={1}'.format(
            config('REACT_APP_CALENDAR_URL'), new_tokens["access_token"])
        response = fetch_google_events(request, calendar_url)
    return Response(response)


def fetch_google_events(request, calendar_url):
    data = ''
    result = []

    with urllib.request.urlopen(calendar_url) as url:
        data = json.loads(url.read())

    for event in data["items"]:
        title = event.get("summary")
        obj = {}
        if title:
            obj["title"] = title
            obj["start"] = event["start"]
            obj["end"] = event["end"]
            result.append(obj)

    result = reformat_events(request, result)
    return result


def reformat_events(request, events):
    user = request.user
    result = []
    for current_event in events:
        title = current_event["title"]
        dateTime = current_event["start"].get("dateTime")
        if dateTime:
            date = dateTime[:10]
            if is_future_event(date):
                startTime = dateTime[11:16] + ":00"
                endTime = current_event["end"]["dateTime"][11:16] + ":00"
                temp = pd.Timestamp(dateTime)
                dayIndex = (temp.dayofweek + 1) % 7
                event = {'user': user.id, 'title': title, 'date': date, 'startTime': startTime,
                         'endTime': endTime, 'colorTypeId': 12, 'dayIndex': dayIndex}
                result.append(event)
    return result


def is_future_event(current_event_date):
    event_date = time.strptime(current_event_date, "%Y-%m-%d")
    current_date = datetime.today().strftime('%Y-%m-%d')
    current_date = time.strptime(current_date, "%Y-%m-%d")
    return event_date >= current_date
