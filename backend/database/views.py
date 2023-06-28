from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
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

# def signup(request):
#     if request.user.is_authenticated:
#         return redirect('/')
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             password = form.cleaned_data.get('password1')
#             user = authenticate(username=username, password=password)
#             login(request, user)
#             return redirect('/')
#         else:
#             return render(request, 'login.html', {'form': form})
#     else:
#         form = UserCreationForm()
#         return render(request, 'login.html', {'form': form})

# def signIn(request):
#     if request.user.is_authenticated:
#         return render(request, 'map.html')
#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return redirect('/')
#         else:
#             form = AuthenticationForm(request.POST)
#             return render(request, 'signin.html', {'form': form})
#     else:
#         form = AuthenticationForm()
#         return render(request, 'signin.html', {'form': form})

def index(request):
    return HttpResponse("Hello world!")
