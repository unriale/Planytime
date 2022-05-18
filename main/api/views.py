from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer, EventSerializer
from main.models import Note

from django.utils import timezone
from main.models import Event


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
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEvents(request):
    user = request.user
    events = user.event_set.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateEvent(request):
    user = request.user
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
        print("OIDUFHJIDHFNOIDFJOIDHFLIDUHF")
        return Response(event, status=200)
    return Response(event, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def saveEvents(request):
    user = request.user
    events = request.data['events']
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
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=200)
    return Response({'error': ''}, status=400)
    #events = user.event_set.all()
