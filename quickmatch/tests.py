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
# from django.core.urlresolvers import reverse

# Create your tests here.

def create_match(pitchX, priceX, organizerX, dateX, descriptionX, signed_playersX, max_playersX):
    return Match.objects.create(pitch_id=pitchX, price=priceX, organizer=organizerX, date=dateX,description=descriptionX, signed_players=signed_playersX, max_players=max_playersX)

def create_user(usernameX, emailX, passwordX):
    return MyUser.objects.create(username=usernameX, email=emailX, password=passwordX)

def create_pitch(nameX, addressX, contactX, photo_urlX):
    return Pitch.objects.create(name=nameX, address=addressX, contact=contactX, photo_url=photo_urlX)

# model test
class MatchTest(TestCase):
    def setUp(self):
        self.u = create_user("AdamX", "adamx@wp.pl", "Adamx1234")
        self.p = create_pitch("Orlik", "ul. Piaski 8", "www.website.com", 'www.photo.com')
        self.m = create_match(self.p.id, "5", self.u, '2006-10-25 14:30:59', "Krotki opis", "1", "10")

    def test_match_creation(self):
        self.assertTrue(isinstance(self.m, Match))

    # view class test
    def test_match_view_class(self):
        request = RequestFactory().get('/')
        view = MatchView()
        view.setup(request)

        r = view.list(request)
        self.assertTrue(r.status_code==status.HTTP_200_OK)

    def test_create_match_view(self):
        self.client = APIClient()
        self.client.login(username="AdamX", password="Adamx1234")
        response = self.client.post('/api/create_match/', {'pitch': self.p.id, 'price': '55', 'date': '2016-10-25 14:30:59', 'description': 'Długi opis', 'max_players': '8'}, format='json')
        self.assertEqual(response.status_code, 201)

    def test_sign_for_match_view(self):
        self.u1 = create_user("JanX", "janx@wp.pl", "Janx1234")
        self.client = APIClient()
        self.client.login(username="JanX", password="Janx1234")
        response = self.client.post('/api/sign_for_match/', {'match_id': self.m.id}, format='json')
        self.assertEqual(response.status_code, 201)

    # def test_create_match(self):
    #     u = create_user("AdamX", "adamx@wp.pl", "Adamx1234")
    #     client = Client()
    #     login = self.client.login(username="AdamX", password="Adamx1234")
    #     response = self.client.get('/user_profile/')
    #     self.assertEqual(response.status_code, 200)
        
        # client = APIClient()
        # client.login(username='lauren', password='secret')
        # response = client.post('/create_match/', {'pitch': '"Orlik"', 'price': '5', 'date': '2006-10-25 14:30:59', 'description': 'Krotki opis', 'max_players': '10'}, format='json')
        # self.assertTrue(response.status_code==status.HTTP_201_CREATED)

# model test
class PitchTest(TestCase):
    def setUp(self):
        self.u = create_user("AdamX", "adamx@wp.pl", "Adamx1234")
        self.p = create_pitch("Orlik", "ul. Piaski 8", "www.website.com", 'www.photo.com')
        self.m = create_match(self.p.id, "5", self.u, '2006-10-25 14:30:59', "Krotki opis", "1", "10")

    def test_pitch_creation(self):
        self.assertTrue(isinstance(self.p, Pitch))

    # view class test
    def test_pitch_view_class(self):
        request = RequestFactory().get('/')
        view = PitchView()
        view.setup(request)

        r = view.list(request)
        self.assertTrue(r.status_code==status.HTTP_200_OK)

# model test
class MyUserTest(TestCase):
    def setUp(self):
        self.u = create_user("AdamX", "adamx@wp.pl", "Adamx1234")
        self.p = create_pitch("Orlik", "ul. Piaski 8", "www.website.com", 'www.photo.com')
        self.m = create_match(self.p.id, "5", self.u, '2006-10-25 14:30:59', "Krotki opis", "1", "10")

    def test_myuser_creation(self):
        self.assertTrue(isinstance(self.u, MyUser))

    # view class test
    def test_myuser_view_class(self):
        request = RequestFactory().get('/')
        view = MyUserView()
        view.setup(request)

        r = view.list(request)
        self.assertTrue(r.status_code==status.HTTP_200_OK)

    def test_user_profile_view(self):
        self.client = APIClient()
        self.client.login(username="AdamX", password="Adamx1234")
        response = self.client.get('/api/user_profile/')
        self.assertEqual(response.status_code, 200)


# API test

class MatchApiTest(APITestCase):
    def test_match_api(self):
        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/matches/')
        assert response.status_code == 200
    # factory = APIRequestFactory()
    # request = factory.post('api//matches/', {'id': '0', 'pitch_id': '1', 'price': '50', 'organizer': 'Jan', 'data': '2006-10-25 14:30:59', 'description': 'Krótki opis', 'signed_players': '1', 'max_players': '10'})
    # assert request.status_code == 200

class PitchApiTest(APITestCase):
    def test_pitch_api(self):
        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/pitches/')
        assert response.status_code == 200

class UserApiTest(APITestCase):
    def test_user_api(self):
        client = RequestsClient()
        response = client.get('http://127.0.0.1:8000/api/users/')
        assert response.status_code == 200

# class EntryResourceTest(ResourceTestCase):

#     def test_get_api_json(self):
#         resp = self.api_client.get('/api/matches/', format='json')
#         self.assertValidJSONResponse(resp)


# class MatchCreationTest(APITestCase):
#     def test_create_match(self):
#         """
#         Ensure we can create a new user object.
#         """
#         url = reverse('create_match')
#         data = {'name': 'DabApps'}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Match.objects.count(), 1)
#         self.assertEqual(Match.objects.get().name, 'DabApps')