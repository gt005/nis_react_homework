from django.urls import path, include
from .views import *

urlpatterns = [
    path('products', ProductList.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/logout', LogoutView.as_view()),
    path('auth/csrf_cookie', GetCSRFToken.as_view()),
    path('auth/login-status', CheckAuthenticatedView.as_view())
]
