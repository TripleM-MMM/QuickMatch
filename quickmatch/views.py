from django.shortcuts import render
from django.http import HttpResponse # NEW

# Create your views here.
def hello_world(request): # NEW
    return render(request, template_name="hello.html")