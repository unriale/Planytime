from django.contrib import admin

from .models import Note, Event

class EventAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'date', 'startTime', 'endTime')
    list_filter = ('user', 'date',)


admin.site.register(Note)
admin.site.register(Event, EventAdmin)
