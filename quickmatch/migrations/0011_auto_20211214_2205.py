# Generated by Django 3.2.9 on 2021-12-14 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickmatch', '0010_auto_20211214_2157'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='user_matches',
        ),
        migrations.AddField(
            model_name='myuser',
            name='user_matches',
            field=models.ManyToManyField(blank=True, to='quickmatch.Match'),
        ),
    ]
