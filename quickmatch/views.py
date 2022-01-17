from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.serializers import Serializer # NEW
from quickmatch.models import Match, MyUser, Pitch
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from rest_framework import viewsets, generics, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from django.utils import timezone



# Views for matches
class MatchView(viewsets.ModelViewSet):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
        

class CreateMatchView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateMatchSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                pitch = Pitch.objects.get(id=serializer.data.get('pitch'))
            except Pitch.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            price = serializer.data.get('price')
            date = serializer.data.get('date')
            description = serializer.data.get('description')
            max_players = serializer.data.get('max_players')

            try:
                organizer = MyUser.objects.get(id=self.request.user.id)
            except MyUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            if (max_players <= 1) or (datetime.strptime(date, '%Y-%m-%dT%H:%M:%SZ')<datetime.now()):
                return Response(MyUserSerializer(organizer).data, status=status.HTTP_406_NOT_ACCEPTABLE)

            signed_players = 1
            match = Match(pitch=pitch, price=price, organizer=organizer, date=date, description=description, signed_players=signed_players, max_players=max_players)
            match.save()
            match.players.add(organizer)
            organizer.save()
            match.save()
        
        return Response(MatchSerializer(match).data, status=status.HTTP_201_CREATED)

class SignForMatchView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SignForMatchSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            match_id = serializer.data.get('match_id')

            try:
                match = Match.objects.get(id=match_id)
            except Match.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            try:
                user = MyUser.objects.get(id=self.request.user.id)
            except MyUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            try:
                exists = match.players.get(id=user.id)
            except MyUser.DoesNotExist:
                exists = None

            if (match.signed_players==match.max_players) or (exists!=None) or (match.date<timezone.now()):
                return Response(MatchSerializer(match).data, status=status.HTTP_403_FORBIDDEN)
            match.players.add(user)
            match.signed_players = match.signed_players + 1
            user.save()
            match.save()
        
        return Response(MatchSerializer(match).data, status=status.HTTP_201_CREATED)

class SignOutFromMatchView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SignOutFromMatchSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            match_id = serializer.data.get('match_id')

            try:
                match = Match.objects.get(id=match_id)
            except Match.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            try:
                user = MyUser.objects.get(id=self.request.user.id)
            except MyUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            try:
                exists = match.players.get(id=user.id)
            except MyUser.DoesNotExist:
                exists = None

            if (exists!=None) and (match.date>timezone.now() and (user!=match.organizer)):
                match.players.remove(user)
                match.signed_players = match.signed_players - 1
                match.save()
                user.save()
                return Response(MatchSerializer(match).data, status=status.HTTP_200_OK)
        
        return Response(MatchSerializer(match).data, status=status.HTTP_403_FORBIDDEN)

class DeleteMatchView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = DeleteMatchSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            match_id = serializer.data.get('match_id')

            try:
                match = Match.objects.get(id=match_id)
            except Match.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            try:
                user = MyUser.objects.get(id=self.request.user.id)
            except MyUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            if (user==match.organizer) and (match.date>timezone.now()):
                for p in match.players.all():
                    p.user_matches.remove(match)
                    p.save()
                match.delete()
                return Response(MyUserSerializer(user).data, status=status.HTTP_200_OK)

            return Response(MatchSerializer(match).data, status=status.HTTP_403_FORBIDDEN)
        
            
class PitchView(viewsets.ModelViewSet):
    serializer_class = PitchSerializer
    queryset = Pitch.objects.all()

# Views for user
class MyUserView(viewsets.ModelViewSet):
    serializer_class = MyUserSerializer
    queryset = MyUser.objects.all()

class UserProfileView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MyUserSerializer

    def list(self, request, pk=None, format=None):
        try:
            user = MyUser.objects.get(id=self.request.user.id)
        except MyUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = MyUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EditUserProfileView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = EditMyUserSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                user = MyUser.objects.get(id=self.request.user.id)
            except MyUser.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
                
            new_first_name = serializer.data.get('first_name')
            new_last_name = serializer.data.get('last_name')
            new_email = serializer.data.get('email')
            new_password = serializer.data.get('password')

            user.first_name = new_first_name
            user.last_name = new_last_name
            user.email = new_email
            user.set_password(new_password)

            user.save()

            return Response(MyUserSerializer(user).data, status=status.HTTP_200_OK)
