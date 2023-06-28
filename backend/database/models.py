from django.db import models
from multiselectfield import MultiSelectField

class User(models.Model):
    displayName = models.CharField(max_length=10, default='name')
    username = models.CharField(max_length=10)
    password = models
    # django.contrib.auth.models.User
    # django can do the hashing for me apparently

# class Option(models.Model):
#     sportChoices = [
#         ('skateboard', 'Skateboarding'),
#         ('bmx', 'BMXing'),
#         ('scooter', 'Scooter riding'),
#         ('roller', 'Rollerblading')
#     ]
#     name = models.CharField(max_length=10, choices=sportChoices, unique=True)

sportChoices = (
        ('skateboard', 'Skateboarding'),
        ('bmx', 'BMXing'),
        ('scooter', 'Scooter riding'),
        ('roller', 'Rollerblading')
    )

class Spot(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50, blank=True) # maybe TextField instead?
    latitude = models.FloatField()
    longitude = models.FloatField() # change to decimalfield if only want a certain number of decimal places
    suitableFor = MultiSelectField(choices=sportChoices, max_length=50)
    


