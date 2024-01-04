from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, generics, status
from database.serializers import UserSerializer, SpotSerializer, SportChoiceSerializer
from database.models import Spot, SportChoice
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import action


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

    def create(self, request, *args, **kwargs):
        serialized = self.serializer_class(data=request.data, context={'request': request})
        if serialized.is_valid():
            foreignKeyID = request.data.get('createdBy')
            user = User.objects.get(id=foreignKeyID)
            Spot.objects.create(createdBy=user)

    @action(detail=True, methods=['GET'])
    def get(self, request, pk=None):
        spot = self.get_object()
        serializer = self.get_serializer(spot)
        print(serializer.data)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def getAll(self, request):
        spots = self.get_queryset()
        serializer = self.get_serializer(spots, many=True)
        return Response(serializer.data)

class SportChoiceViewSet(viewsets.ModelViewSet):
    queryset = SportChoice.objects.all()
    serializer_class = SportChoiceSerializer
    permission_classes = [permissions.IsAuthenticated]


# class SpotImageViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows spots to be viewed or edited.
#     """
#     queryset = SpotImage.objects.all()
#     serializer_class = SpotImageSerializer
#     # permission_classes = [permissions.IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         serializer = SpotImageSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

def index(request):
    return HttpResponse("Hello world!")
