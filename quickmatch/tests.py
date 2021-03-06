from django.db.models.query import QuerySet
from django.test import TestCase
from django.test.client import Client, RequestFactory
from quickmatch.models import *
from django.utils import timezone
from rest_framework.test import APIRequestFactory, APIClient, RequestsClient
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from quickmatch.views import *
from django.contrib.auth import authenticate

# Create your tests here.

def create_match(pitchX, priceX, organizerX, dateX, descriptionX, signed_playersX, max_playersX):
    return Match.objects.create(pitch_id=pitchX, price=priceX, organizer=organizerX, date=dateX,description=descriptionX, signed_players=signed_playersX, max_players=max_playersX)

def create_user(usernameX, emailX, passwordX):
    return MyUser.objects.create(username=usernameX, email=emailX, password=passwordX)

def create_pitch(nameX, addressX, contactX, photo_urlX):
    return Pitch.objects.create(name=nameX, address=addressX, contact=contactX, photo_url=photo_urlX)



class MatchTest(TestCase):
    def setUp(self):
        self.u = create_user("AdamX", "adamx@wp.pl", "Adamx1234")
        self.u.set_password('12345')
        self.u.save()
        self.p = create_pitch("Orlik", "ul. Piaski 8", "www.website.com", 'www.photo.com')
        self.m = create_match(self.p.id, "5", self.u, '3000-10-25 14:30:59', "Krotki opis", "1", "10")

    def test_match_creation(self):
        self.assertTrue(isinstance(self.m, Match))

    def test_match_view_class(self):
        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/matches/')
        self.assertTrue(response.status_code==status.HTTP_200_OK)

    def test_create_match_view(self):
        self.client = APIClient()
        self.client.login(username="AdamX", password="12345")
        response = self.client.post('/api/create_match/', {'pitch': self.p.id, 'price': '55', 'date': '3016-10-25 14:30:59', 'description': 'Długi opis', 'max_players': '8'}, format='json')
        self.assertEqual(response.status_code, 201)

    def test_sign_for_match_view(self):
        self.m.players.add(self.u)
        self.u1 = create_user("JanX", "janx@wp.pl", "Janx1234")
        self.u1.set_password('1234')
        self.u1.save()
        self.client = APIClient()
        self.client.login(username="JanX", password="1234")
        response = self.client.post('/api/sign_for_match/', {'match_id': self.m.id}, format='json')
        self.assertEqual(response.status_code, 201)



class PitchTest(TestCase):
    def setUp(self):
        self.u = create_user("AdamX", "adamx@wp.pl", "Adamx1234")
        self.u.set_password('12345')
        self.u.save()
        self.p = create_pitch("Orlik", "ul. Piaski 8", "www.website.com", 'www.photo.com')
        self.m = create_match(self.p.id, "5", self.u, '2006-10-25 14:30:59', "Krotki opis", "1", "10")

    def test_pitch_creation(self):
        self.assertTrue(isinstance(self.p, Pitch))

    def test_pitch_view_class(self):
        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/pitches/')
        self.assertTrue(response.status_code==status.HTTP_200_OK)



class MyUserTest(TestCase):
    def setUp(self):
        self.u = create_user("AdamX", "adamx@wp.pl", "Adamx1234")
        self.u.set_password('12345')
        self.u.save()
        self.p = create_pitch("Orlik", "ul. Piaski 8", "www.website.com", 'www.photo.com')
        self.m = create_match(self.p.id, "5", self.u, '2006-10-25 14:30:59', "Krotki opis", "1", "10")

    def test_myuser_creation(self):
        self.assertTrue(isinstance(self.u, MyUser))

    def test_myuser_view_class(self):
        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/users/')
        self.assertTrue(response.status_code==status.HTTP_200_OK)

    def test_user_profile_view(self):
        self.client = APIClient()
        self.client.login(username="AdamX", password="12345")
        response = self.client.get('/api/user_profile/')
        self.assertEqual(response.status_code, 200)