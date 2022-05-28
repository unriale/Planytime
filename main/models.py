from django.db import models
from django.contrib.auth.models import User
import datetime


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()


class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.TextField(max_length=100)
    date = models.DateField(default=datetime.date.today)
    startTime = models.TimeField()
    endTime = models.TimeField()
    colorTypeId = models.IntegerField()
    dayIndex = models.IntegerField()


class Token(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    access_token = models.TextField(max_length=2048, null=True)
    refresh_token = models.TextField(max_length=2048, null=True)
    id_token = models.TextField(max_length=2048, null=True)
