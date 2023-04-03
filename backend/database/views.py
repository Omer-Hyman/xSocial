from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from database.serializers import UserSerializer, SpotSerializer
from database.models import Spot


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class SpotViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows spots to be viewed or edited.
    """
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer
    permission_classes = [permissions.IsAuthenticated]
def index(request):
    return HttpResponse("Hello world!")
