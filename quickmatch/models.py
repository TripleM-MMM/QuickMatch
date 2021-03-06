from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import proxy

# Create your models here.
class Match(models.Model):
    pitch = models.ForeignKey(to="Pitch", on_delete=models.DO_NOTHING)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    organizer = models.ForeignKey(to="MyUser", on_delete=models.DO_NOTHING) # id of organizer
    date = models.DateTimeField()
    description = models.CharField(max_length=150)
    signed_players = models.IntegerField()
    max_players = models.IntegerField()

    class Meta:
        ordering = ["date", "pitch_id"]
        verbose_name = "Match"
        verbose_name_plural = "Matches"

    def __str__(self):
        return "Match: " + self.description

class Pitch(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    photo_url = models.URLField(max_length=500)

    class Meta:
        ordering = ["name", "address"]
        verbose_name = "Pitch"
        verbose_name_plural = "Pitches"

    def __str__(self):
        return "Pitch: " + self.name

class MyUser(User):
    models.OneToOneField(User, on_delete=models.CASCADE)
    user_matches = models.ManyToManyField(to="Match", related_name="players", blank=True, null=True, symmetrical=True, editable=True, default=None)


class MyUserInline(admin.StackedInline):
    model = MyUser
    can_delete = False
    verbose_name_plural = 'user'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (MyUserInline,)
