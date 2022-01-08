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
from quickmatch import views # NEW
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
router.register(r'user_profile', views.UserProfileView, 'user_profile')


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('hello/', views.hello_world), # NEW
    # http://127.0.0.1:8000/ksiazki
    #path("matches/", views.list_matches), # NEW
    #path('accounts/', include('django.contrib.auth.urls')), # NEW
    #path('accounts/profile/', views.profile_view, name='user_profile'), # NEW
    #path('accounts/signup/', views.user_signup, name="user_signup"), # NEW
    path('api/', include(router.urls)),
    #path('api/sign_for_match/', views.SignForMatchView.as_view({'post':'create'})),
    #path('api/user_profile/', views.UserProfileView.as_view({'get':'retrieve'})),
    path('login/', TemplateView.as_view(template_name='hello.html')), # to login
    #path('create_match', views.CreateMatchView.as_view()),
    # path('', TemplateView.as_view(template_name='index.html'))
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls'))
]


