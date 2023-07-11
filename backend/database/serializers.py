from django.contrib.auth.models import User
from rest_framework import fields, serializers
from database.models import Spot, sportChoices
from django.contrib.auth.password_validation import validate_password

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         # fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_staff']
#         fields = ['username', 'password']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = User
        fields = ['username', 'password']

    
    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         username=validated_data['username'],
    #         password=validated_data['password']
    #         )
    #     return user

class SpotSerializer(serializers.HyperlinkedModelSerializer):
    suitableFor = fields.MultipleChoiceField(choices=sportChoices)
    class Meta:
        model = Spot
        fields = ['name', 'description', 'latitude', 'longitude', 'suitableFor']
