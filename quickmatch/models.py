from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import proxy

# Create your models here.
class Match(models.Model):
    pitch_id = models.CharField(max_length=100)
    price = models.CharField(max_length=100, blank=True)
    organizer = models.CharField(max_length=100, blank=True) # id of organizer
    date = models.DateTimeField(blank=True)
    description = models.TextField()
    signed_players = models.CharField(max_length=100, blank=True)
    max_players = models.CharField(max_length=100, default=4)

class Pitch(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    photo_url = models.CharField(max_length=500)

class MyUser(User):
    models.OneToOneField(User, on_delete=models.CASCADE)
    user_matches = models.CharField(max_length=100)


class MyUserInline(admin.StackedInline):
    model = MyUser
    can_delete = False
    verbose_name_plural = 'user'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (MyUserInline,)
