"""qmproj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from quickmatch import views
from django.urls import include
from rest_framework import routers
from quickmatch import views
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'matches', views.MatchView, 'match')
router.register(r'users', views.MyUserView, 'user')
router.register(r'pitches', views.PitchView, 'pitch')
router.register(r'create_match', views.CreateMatchView, 'create_match')
router.register(r'sign_for_match', views.SignForMatchView, 'sign_for_match')
router.register(r'sign_out_from_match', views.SignOutFromMatchView, 'sign_out_from_match')
router.register(r'user_profile', views.UserProfileView, 'user_profile')
router.register(r'delete_match', views.DeleteMatchView, 'delete_match')
router.register(r'edit_user_profile', views.EditUserProfileView, 'edit_user_profile')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls'))
]


