from rest_framework.serializers import ModelSerializer
from main.models import Note, Event

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
