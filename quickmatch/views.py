from django.shortcuts import render
from django.http import HttpResponse # NEW
from quickmatch.models import Match
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
def hello_world(request): # NEW
    return render(request, template_name="hello.html")


def list_matches(request):
    matches = Match.objects.all()
    return render(request, template_name="matches_list.html", context={"matches": matches})


def profile_view(request): # NEW
    return render(request, template_name="view_profile.html")

def user_signup(request):
    if request.method == 'POST':
        ... # tu trzeba przetworzyć dane z formularza
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, template_name="registration/signup_complete.html")
    else:
        # tutaj obsługujemy przypadek kiedy użytkownik pierwszy raz wyświetlił stronę
        form = UserCreationForm()
        # na końcu zwracamy wyrenderowanego HTMLa
    return render(request, template_name="registration/signup_form.html", context={'form': form})


def user_signout(request):
    return render(request, template_name="registration/logged_out.html")