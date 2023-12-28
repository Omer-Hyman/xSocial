# Generated by Django 5.0 on 2023-12-28 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0022_rename_sportchoices_sportchoice'),
    ]

    operations = [
        migrations.CreateModel(
            name='SportChoices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SportChoice', models.CharField(max_length=20)),
            ],
        ),
        migrations.DeleteModel(
            name='SportChoice',
        ),
        migrations.AlterField(
            model_name='spot',
            name='suitableFor',
            field=models.ManyToManyField(blank=True, to='database.sportchoices'),
        ),
    ]