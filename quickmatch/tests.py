from django.test import TestCase
from quickmatch.models import *
from django.utils import timezone
# from django.core.urlresolvers import reverse

# Create your tests here.

# model test
class MatchTest(TestCase):
    def create_match(self, pitchX="A1", priceX="5", organizerX="101", dateX='2006-10-25 14:30:59', descriptionX="Krotki opis", signed_playersX="1", max_playersX="10"):
        return Match.objects.create(pitch_id=pitchX, price=priceX, organizer=organizerX, date=dateX,description=descriptionX, signed_players=signed_playersX, max_players=max_playersX)
    
    def test_match_creation(self):
        m = self.create_match()
        self.assertTrue(isinstance(m, Match))

# model test
class PitchTest(TestCase):
    def create_pitch(self, nameX="Orlik", addressX="ul. Piaski 8", contactX="www.website.com", photo_urlX='www.photo.com'):
        return Pitch.objects.create(name=nameX, address=addressX, contact=contactX, photo_url=photo_urlX)
    
    def test_pitch_creation(self):
        p = self.create_pitch()
        self.assertTrue(isinstance(p, Pitch))

# model test
class MyUserTest(TestCase):
    def create_myuser(self, usernameX="AdamX", emailX="adamx@wp.pl", passwordX="Adamx1234", user_matchesX='1, 2, 3, 6'):
        return MyUser.objects.create(username=usernameX, email=emailX, password=passwordX, user_matches=user_matchesX)
    
    def test_myuser_creation(self):
        u = self.create_myuser()
        self.assertTrue(isinstance(u, MyUser))


# view test 
# ...


# API test
