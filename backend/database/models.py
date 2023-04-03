from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=10)
    # django.contrib.auth.models.User
    # django can do the hashing for me apparently

class Spot(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50, blank=True) # maybe TextField instead?
    latitude = models.FloatField()
    longitude = models.FloatField() # change to decimalfield if only want a certain number of decimal places
    sportChoices = [
        ('skateboard', 'Skateboarding'),
        ('bmx', 'BMXing'),
        ('scooter', 'Scooter riding'),
        ('roller', 'Rollerblading')
    ]
    suitableFor = models.CharField(
        choices=sportChoices,
        default='skateboard',
        max_length=50
    )
