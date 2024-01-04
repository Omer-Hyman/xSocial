"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path, reverse_lazy
from rest_framework import routers
from database import views
from django.views.generic.base import RedirectView
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'spots', views.SpotViewSet)
router.register(r'SportChoices', views.SportChoiceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-user-login/', views.UserLogIn.as_view()),
    path('api-user-registration/', views.UserRegistrationView.as_view()),
    path('spot/<int:pk>/', views.SpotViewSet.as_view({'get': 'get'})),
    path('spots/', views.SpotViewSet.as_view({'get': 'getAll'})),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # path('database/', include('database.urls')),

