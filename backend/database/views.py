# from django.shortcuts import render, redirect
from django.http import HttpResponse
# from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from database.serializers import UserSerializer, SpotSerializer
from database.models import Spot
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import generics, status

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serialized = self.serializer_class(data=request.data, context={'request': request})
        if serialized.is_valid():
            User.objects.create_user(
                username=serialized.validated_data['username'],
                password=serialized.validated_data['password']
            )
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
        # serialized.is_valid(raise_exception=True)
        # return Response(serialized.data, status=status.HTTP_201_CREATED)



class UserLogIn(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
            'username': user.username
        })

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
