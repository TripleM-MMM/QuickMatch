from django.contrib import admin
from django.contrib.auth.models import User

# Register your models here.
from quickmatch.models import Match, Pitch, UserAdmin
admin.site.register(Match)
admin.site.register(Pitch)
# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)