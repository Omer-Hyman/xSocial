from django.contrib.auth.models import User
from rest_framework import fields, serializers
from database.models import Spot, SportChoice
from django.contrib.auth.password_validation import validate_password
from drf_extra_fields.fields import Base64ImageField

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

class SportChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportChoice
        fields = '__all__'

class SpotSerializer(serializers.HyperlinkedModelSerializer):
    createdBy = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), allow_null=True)
    suitableFor = SportChoiceSerializer(many=True, read_only=False)
    image=Base64ImageField()

    class Meta:
        model = Spot
        fields = '__all__'

    def create(self, validated_data):
        suitableForSports = validated_data.pop('suitableFor', [])
        spot = Spot.objects.create(**validated_data)
        for suitableForSport in suitableForSports:
            sportChoiceName = suitableForSport.get('Sport')
            if sportChoiceName:
                sportChoice = SportChoice.objects.get(Sport=sportChoiceName)
                spot.suitableFor.add(sportChoice)

        return spot

# class SpotImageSerializer(serializers.HyperlinkedModelSerializer):
#     image=Base64ImageField()
#     class Meta:
#         model = SpotImage
#         fields = ['image']
#     def create(self, validated_data):
#         image=validated_data.pop('image')
#         return SpotImage.objects.create(image=image)
