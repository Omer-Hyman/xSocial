# Generated by Django 5.0 on 2023-12-27 17:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0021_sportchoices_remove_spot_suitablefor_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='SportChoices',
            new_name='SportChoice',
        ),
    ]
