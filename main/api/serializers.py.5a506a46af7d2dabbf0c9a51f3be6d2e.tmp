from rest_framework.serializers import ModelSerializer
from main.models import Note, Event
from rest_framework import serializers

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class MonthEventSerializer(serializers.Serializer):
    date_to_month = serializers.IntegerField()
    count = serializers.IntegerField()
