from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import proxy

# Create your models here.
class Match(models.Model):
    place = models.CharField(max_length=100)
    price = models.IntegerField
    organizer = models.IntegerField # id of organizer
    date = models.DateTimeField()
    description = models.TextField()
    signed_players = models.IntegerField
    max_players = models.IntegerField

class Pitch(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    photo_url = models.CharField(max_length=100)

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

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)