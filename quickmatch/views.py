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
class MatchView(viewsets.ModelViewSet):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()

class CreateMatchView(viewsets.ViewSet):
    serializer_class = CreateMatchSerializer

    def create(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            pitch = Pitch.objects.get(id=serializer.data.get('pitch'))
            price = serializer.data.get('price')
            date = serializer.data.get('date')
            description = serializer.data.get('description')
            max_players = serializer.data.get('max_players')
            organizer = self.request.session.session_key # MUST BE A MYUSER INSTANCE
            signed_players = 1

            match = Match(pitch=pitch, price=price, organizer=organizer, date=date, description=description, signed_players=signed_players, max_players=max_players)
            match.save()
        
        return Response(MatchSerializer(match).data, status=status.HTTP_201_CREATED)


class PitchView(viewsets.ModelViewSet):
    serializer_class = PitchSerializer
    queryset = Pitch.objects.all()

# Views for user
class MyUserView(viewsets.ModelViewSet):
    serializer_class = MyUserSerializer
    queryset = MyUser.objects.all()