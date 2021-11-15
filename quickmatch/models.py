from django.db import models

# Create your models here.
class Match(models.Model):
    title = models.CharField(max_length=100)
    short_description = models.TextField()
    date = models.DateTimeField()