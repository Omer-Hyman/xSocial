from django.contrib.auth.models import User
from rest_framework import fields, serializers
from database.models import Spot, sportChoices

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_staff']
        fields = ['username', 'password']

class SpotSerializer(serializers.HyperlinkedModelSerializer):
    suitableFor = fields.MultipleChoiceField(choices=sportChoices)
    class Meta:
        model = Spot
        fields = ['name', 'description', 'latitude', 'longitude', 'suitableFor']
