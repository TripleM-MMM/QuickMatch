# Generated by Django 3.2.9 on 2021-12-15 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickmatch', '0019_alter_myuser_user_matches'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='description',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='pitch',
            name='photo_url',
            field=models.URLField(max_length=500),
        ),
    ]
