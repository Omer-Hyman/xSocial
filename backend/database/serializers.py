from django.contrib.auth.models import User
from rest_framework import serializers
from database.models import Spot

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class SpotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Spot
        fields = ['name', 'description', 'latitude', 'longitude', 'suitableFor']