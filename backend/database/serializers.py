from django.contrib.auth.models import User
from rest_framework import fields, serializers
from database.models import Spot, sportChoices
from django.contrib.auth.password_validation import validate_password
from drf_extra_fields.fields import Base64ImageField

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         # fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'is_staff']
#         fields = ['username', 'password']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = User
        fields = ['id','username', 'password']
    
    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         username=validated_data['username'],
    #         password=validated_data['password']
    #         )
    #     return user

class SpotSerializer(serializers.HyperlinkedModelSerializer):
    createdBy = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), allow_null=True,)
    suitableFor = fields.MultipleChoiceField(choices=sportChoices)
    image=Base64ImageField()

    class Meta:
        model = Spot
        fields = ['createdBy', 'name', 'description', 'latitude', 'longitude', 'suitableFor', 'image']

# class SpotImageSerializer(serializers.HyperlinkedModelSerializer):
#     image=Base64ImageField()
#     class Meta:
#         model = SpotImage
#         fields = ['image']
#     def create(self, validated_data):
#         image=validated_data.pop('image')
#         return SpotImage.objects.create(image=image)
