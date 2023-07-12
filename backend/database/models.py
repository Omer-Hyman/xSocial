from django.db import models
from multiselectfield import MultiSelectField
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
# from django.contrib.auth.models import AbstractUser

# class User(models.Model):
#     displayName = models.CharField(max_length=10, default='name')
#     username = models.CharField(max_length=10)
#     password = models
    # django.contrib.auth.models.User
    # django can do the hashing for me apparently

# class User(AbstractUser):
#     displayName = models.CharField(max_length=10)
    
#     def __str__(self):
#         return self.username

# class Option(models.Model):
#     sportChoices = [
#         ('skateboard', 'Skateboarding'),
#         ('bmx', 'BMXing'),
#         ('scooter', 'Scooter riding'),
#         ('roller', 'Rollerblading')
#     ]
#     name = models.CharField(max_length=10, choices=sportChoices, unique=True)

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

sportChoices = (
        ('skateboard', 'Skateboarding'),
        ('bmx', 'BMXing'),
        ('scooter', 'Scooter riding'),
        ('roller', 'Rollerblading')
    )

class Spot(models.Model):
    createdBy = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50, blank=True) # maybe TextField instead?
    latitude = models.FloatField()
    longitude = models.FloatField() # change to decimalfield if only want a certain number of decimal places
    suitableFor = MultiSelectField(choices=sportChoices, max_length=50)
    image = models.ImageField(blank=True, null=True)
    

# class SpotImage(models.Model):
#     image = models.ImageField(blank=True, null=True, upload_to='images')
    
