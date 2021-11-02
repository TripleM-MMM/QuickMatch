from django.contrib import admin

# Register your models here.
from quickmatch.models import Match # NEW
admin.site.register(Match) # NEW