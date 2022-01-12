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

# Create your views here.
#def hello_world(request): # NEW
#    return render(request, template_name="hello.html")


#def list_matches(request):
#    matches = Match.objects.all()
#    return render(request, template_name="matches_list.html", context={"matches": matches})


#def profile_view(request): # NEW
#    return render(request, template_name="view_profile.html")

# def user_signup(request):
#     if request.method == 'POST':
#         ... # tu trzeba przetworzyć dane z formularza
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return render(request, template_name="registration/signup_complete.html")
#     else:
#         # tutaj obsługujemy przypadek kiedy użytkownik pierwszy raz wyświetlił stronę
#         form = UserCreationForm()
#         # na końcu zwracamy wyrenderowanego HTMLa
#     return render(request, template_name="registration/signup_form.html", context={'form': form})


# def user_signout(request):
#     return render(request, template_name="registration/logged_out.html")

# NEW - for React.js

# Views for matches
class MatchView(viewsets.ViewSet):
    def list(self, request):
        queryset = Match.objects.all()
        serializer = MatchSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

#@login_required(login_url='/login/')
class CreateMatchView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CreateMatchSerializer

    def create(self, request, format=None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            pitch = Pitch.objects.get(id=serializer.data.get('pitch'))
            price = serializer.data.get('price')
            date = serializer.data.get('date')
            description = serializer.data.get('description')
            max_players = serializer.data.get('max_players')
            #organizer = MyUser.objects.get(id=self.request.user.id) # MUST BE A MYUSER INSTANCE
            organizer = MyUser.objects.create(username="JOHN1", email="JOHN1@gmail.com", password="JOHN1X")
            # organizer = MyUser() # MUST BE AN EXISTING MYUSER INSTANCE
            # organizer.save() # MUST BE AN EXISTING MYUSER INSTANCE
            print(self.request.user.id)
            signed_players = 1
            match = Match(pitch=pitch, price=price, organizer=organizer, date=date, description=description, signed_players=signed_players, max_players=max_players)
            match.save()
            match.players.add(organizer)
            organizer.save()
            match.save()

            # print("Organizer matches:")
            # for m in organizer.user_matches.all():
            #     print(m)
            # print("Players for m:")
            # print(m)
            # for p in match.players.all():
            #     print(p)

            #organizer.user_matches.add(match)
        
        return Response(MatchSerializer(match).data, status=status.HTTP_201_CREATED)

class SignForMatchView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SignForMatchSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            match_id = serializer.data.get('match_id')
            match = Match.objects.get(id=match_id)
            user = MyUser.objects.get(id=self.request.user.id)
            match.players.add(user)
            #user.user_matches.add(match)
            match.signed_players = match.signed_players + 1
            user.save()
            match.save()

            # print("User matches:")
            # for m in user.user_matches.all():
            #     print(m)
            # print("Players for m:")
            # print(m)
            # for p in match.players.all():
            #     print(p)
        
        return Response(MatchSerializer(match).data, status=status.HTTP_201_CREATED)

class DeleteMatchView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = DeleteMatchSerializer

    def create(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            match_id = serializer.data.get('match_id')
            match = Match.objects.get(id=match_id)
            user = MyUser.objects.get(id=self.request.user.id)
            if user==match.organizer:
                for p in match.players.all():
                    p.user_matches.remove(match)
                    p.save()
                match.delete()
                return Response(MyUserSerializer(user).data, status=status.HTTP_200_OK)

            return Response(MatchSerializer(match).data, status=status.HTTP_403_FORBIDDEN)
        
            
class PitchView(viewsets.ViewSet):
    def list(self, request):
        queryset = Pitch.objects.all()
        serializer = PitchSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Views for user
class MyUserView(viewsets.ViewSet):
    def list(self, request):
        queryset = MyUser.objects.all()
        serializer = MyUserSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MyUserSerializer

    def list(self, request, pk=None, format=None):
        user = MyUser.objects.get(id=self.request.user.id)
        serializer = MyUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)