# Generated by Django 3.2.9 on 2021-12-14 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickmatch', '0015_auto_20211214_2239'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='user_matches',
            field=models.ManyToManyField(to='quickmatch.Match'),
        ),
    ]
