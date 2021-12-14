from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import proxy

# Create your models here.
class Match(models.Model):
    pitch = models.ForeignKey(to="Pitch", on_delete=models.DO_NOTHING)
    price = models.CharField(max_length=100, blank=True)
    organizer = models.ForeignKey(to="MyUser", on_delete=models.DO_NOTHING) # id of organizer
    date = models.DateTimeField(blank=True)
    description = models.TextField()
    signed_players = models.CharField(max_length=100, blank=True)
    max_players = models.CharField(max_length=100, default=4)

    class Meta:
        ordering = ["date", "pitch_id"]
        verbose_name = "Match"
        verbose_name_plural = "Matches"

    def __str__(self):
        return "Match: " + self.date + " " + self.pitch

class Pitch(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    photo_url = models.CharField(max_length=500)

    class Meta:
        ordering = ["name", "address"]
        verbose_name = "Pitch"
        verbose_name_plural = "Pitches"

    def __str__(self):
        return "Pitch: " + self.name

class MyUser(User):
    models.OneToOneField(User, on_delete=models.CASCADE)
    user_matches = models.ManyToManyField(Match, blank=True)


class MyUserInline(admin.StackedInline):
    model = MyUser
    can_delete = False
    verbose_name_plural = 'user'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (MyUserInline,)
