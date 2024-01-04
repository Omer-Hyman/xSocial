from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# SPORT_CHOICES = (
#     ('skateboard', 'Skateboarding'),
#     ('bmx', 'BMXing'),
#     ('scooter', 'Scooter riding'),
#     ('roller', 'Rollerblading')
# )

class SportChoice(models.Model):
    Sport = models.CharField(max_length=20)

    def __str__(self):
        return self.Sport

class Spot(models.Model):
    createdBy = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50, blank=True) # maybe TextField instead?
    latitude = models.FloatField()
    longitude = models.FloatField() # change to decimalfield if only want a certain number of decimal places
    suitableFor = models.ManyToManyField(SportChoice, blank=True)
    image = models.ImageField(blank=True, null=True)

# class SpotImage(models.Model):
#     image = models.ImageField(blank=True, null=True, upload_to='images')
    
