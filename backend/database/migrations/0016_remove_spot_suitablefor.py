# Generated by Django 5.0 on 2023-12-27 15:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0015_spot_createdby'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='spot',
            name='suitableFor',
        ),
    ]