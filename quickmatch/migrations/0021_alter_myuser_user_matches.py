# Generated by Django 3.2.9 on 2021-12-15 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickmatch', '0020_auto_20211215_0909'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='user_matches',
            field=models.ManyToManyField(related_name='players', to='quickmatch.Match'),
        ),
    ]
