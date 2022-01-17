from django.contrib import admin
from django.contrib.auth.models import User

# Register your models here.
from quickmatch.models import Match, Pitch, UserAdmin # NEW
admin.site.register(Match) # NEW
admin.site.register(Pitch) # NEW
# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)