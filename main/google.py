from os import path
import pickle
from google.auth.transport.requests import Request
from rest_framework.response import Response
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from rest_framework.decorators import api_view
import pandas as pd
from .models import Event
import time
from datetime import datetime

SCOPES = ['https://www.googleapis.com/auth/calendar.events']


def get_crendetials_google():
    flow = InstalledAppFlow.from_client_secrets_file(
        "credentials.json", SCOPES)
    creds = flow.run_local_server(port=8080)
    pickle.dump(creds, open("token.txt", "wb"))
    return creds


def get_all_events(request):
    creds = None
    if path.exists("token.txt"):
        creds = pickle.load(open("token.txt", "rb"))
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            creds = get_crendetials_google()
    result = []

    try:
        service = build("calendar", "v3", credentials=creds)
        response = service.events().list(calendarId="primary").execute()
        for event in response["items"]:
            title = event.get("summary")
            obj = {}
            if title:
                obj["title"] = title
                obj["start"] = event["start"]
                obj["end"] = event["end"]
                result.append(obj)
        result = reformat_events(request, result)
    except OSError as err:
        return Response({'error': "OS error: {0}".format(err)}, status=400)
    return Response(result, status=200)


@api_view(['GET'])
def get_google_calendar_events(request):
    return get_all_events(request)


@api_view(['GET'])
def change_calendar(request):
    get_crendetials_google()
    return get_all_events(request)


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
