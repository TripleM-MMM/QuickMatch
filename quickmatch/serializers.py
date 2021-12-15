from rest_framework import serializers
from .models import Match, MyUser, Pitch
from django.contrib.auth.models import User

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('id', 'pitch', 'price', 'organizer', 'date', 'description', 'signed_players', 'max_players', 'players')


class PitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pitch
        fields = ('id', 'name', 'address', 'contact', 'photo_url')



class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'user_matches')