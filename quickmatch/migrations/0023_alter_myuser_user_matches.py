# Generated by Django 3.2.9 on 2021-12-15 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickmatch', '0022_alter_myuser_user_matches'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='user_matches',
            field=models.ManyToManyField(blank=True, null=True, related_name='players', to='quickmatch.Match'),
        ),
    ]
