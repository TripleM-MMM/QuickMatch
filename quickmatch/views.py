from django.shortcuts import render
from django.http import HttpResponse # NEW
from quickmatch.models import Match

# Create your views here.
def hello_world(request): # NEW
    return render(request, template_name="hello.html")


def list_matches(request):
    matches = Match.objects.all()
    return render(request, template_name="matches_list.html", context={"matches": matches})