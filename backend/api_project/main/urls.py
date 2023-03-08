from django.urls import path, include
from .views import *

urlpatterns = [
    path('products', ProductList.as_view()),
    path('auth/csrf_cookie', GetCSRFToken.as_view()),
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
]
