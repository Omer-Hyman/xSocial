# Generated by Django 4.1.7 on 2023-06-26 17:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0007_rename_displaynamez_users_displayname'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Users',
            new_name='User',
        ),
    ]
