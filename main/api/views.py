from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer, EventSerializer, MonthEventSerializer
from main.models import Note

from django.utils import timezone
from main.models import Event
from dateutil.parser import parse

from django.db import connection

import datetime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):

        user.last_login = timezone.now()
        token = super().get_token(user)

        # custom claim
        token['username'] = user.username
        user.save()

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/token/refresh/',
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_events(request):
    user = request.user
    events = user.event_set.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_event(request):
    event = request.data["event"]
    try:
        event_to_delete = Event.objects.get(id=event["id"])
        event_to_delete.delete()
        return Response(event, status=200)
    except:
        return Response(event, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_event(request):
    event = request.data["event"]
    updated_event = Event.objects.filter(id=event["id"]).update(
        title=event["title"],
        date=event["date"],
        startTime=event["startTime"],
        endTime=event["endTime"],
        colorTypeId=event["colorTypeId"],
        dayIndex=event["dayIndex"]
    )
    if updated_event:
        return Response(event, status=200)
    return Response(event, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_events(request):
    user = request.user
    events = request.data['events']
    eventsArr = []
    if events:
        for event in events:
            title = event['title']
            date = event['date']
            startTime = event['startTime']
            endTime = event['endTime']
            colorTypeId = event['colorTypeId']
            dayIndex = event['dayIndex']
            event = Event.objects.create(
                user=user,
                title=title,
                date=date,
                startTime=startTime,
                endTime=endTime,
                colorTypeId=colorTypeId,
                dayIndex=dayIndex)
            eventsArr.append(event)
        serializer = EventSerializer(eventsArr, many=True)
        return Response(serializer.data, status=200)
    return Response({'error': ''}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_month_events(request):
    user = request.user

    with connection.cursor() as cursor:
        cursor.execute(f"SELECT EXTRACT(MONTH from DATE_TRUNC('month',date)) AS date_to_month, \
                                  COUNT(id) AS count FROM main_event WHERE user_id={user.id} GROUP BY DATE_TRUNC('month',date)")
        data = cursor.fetchall()
        data.sort(key=lambda tup: tup[0])
        return Response(data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_color_events(request):
    user = request.user

    with connection.cursor() as cursor:
        cursor.execute(
            f"SELECT \"colorTypeId\", COUNT(id) FROM main_event WHERE user_id={user.id} GROUP BY \"colorTypeId\"")
        data = cursor.fetchall()
        return Response(data, status=200)


def get_dates(request):
    start_date = datetime.datetime.strptime(
        request.data['startDate'][:10], '%Y-%m-%d').date()
    end_date = datetime.datetime.strptime(
        request.data['endDate'][:10], '%Y-%m-%d').date()
    this_end_date = start_date
    dates_arr = [str(start_date + datetime.timedelta(days=1))]

    while str(end_date) != str(this_end_date):
        this_end_date = this_end_date + datetime.timedelta(days=1)
        dates_arr.append(str(this_end_date))

    this_end_date = this_end_date + datetime.timedelta(days=1)
    dates_arr.append(str(this_end_date))
    return dates_arr


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def replan(request):
    user = request.user

    dates_arr = get_dates(request)
    
    data = ""
    for date in dates_arr:
        with connection.cursor() as cursor:
            cursor.execute(
                f"SELECT * FROM main_event WHERE user_id={user.id} AND date='{date}' ORDER BY \"startTime\"")
            data = cursor.fetchall()
            if data:
                new_data = [data[0]]
                for i, plan in enumerate(data):
                    if i + 1 < len(data):
                        next_plan = data[i + 1]
                        data[i+1] = compare_plans(plan, next_plan)
                        new_data.append(compare_plans(plan, next_plan))
                update_time_events(new_data)
    return Response(data, status=200)


def update_time_events(new_data):
    for event in new_data:
        Event.objects.filter(id=event[0]).update(
            date=event[2],
            startTime=event[3],
            endTime=event[4]
        )


def compare_plans(first, second):
    if first[4] >= second[3]:
        date = datetime.date(1, 1, 1)
        datetime1 = datetime.datetime.combine(date, second[4])
        datetime2 = datetime.datetime.combine(date, second[3])
        time_elapsed = datetime1 - datetime2
        start_time_next = datetime.datetime.combine(
            date, first[4]) + datetime.timedelta(minutes=15)
        end_time_next = start_time_next + time_elapsed
        new_second = (second[0], second[1], second[2], start_time_next.time(
        ), end_time_next.time(), second[5], second[6], second[7])
        return new_second
    else:
        return second
