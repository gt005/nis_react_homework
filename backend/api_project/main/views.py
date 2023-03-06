from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import permissions
from django.contrib import auth

from .models import Product
from .serializers import *


class ProductList(LoginRequiredMixin, APIView):
    def get(self, request):
        products = Product.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(products, 10)
        next_page = -1

        try:
            products = paginator.page(page)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        serializer = ProductSerializer(products, many=True)

        if products.has_next():
            next_page = products.next_page_number()

        return Response({
            'products': serializer.data,
            'nextPage': next_page,
        })


class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        user = request.user

        try:
            is_authenticated = user.is_authenticated

            if is_authenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({
                'error': 'Something went wrong when checking authentication status'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else:
                    if len(password) < 3:
                        return Response({
                            'error': 'Password must be at least 3 characters'})
                    else:
                        User.objects.create_user(username=username,
                                                 password=password)
                        return Response(
                            {'success': 'User created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except:
            return Response(
                {'error': 'Something went wrong when registering account'})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data

        username = data['username']
        password = data['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return Response({'success': 'User authenticated'})
        else:
            return Response({'error': 'Error Authenticating'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        try:
            auth.logout(request)
            return Response({'success': 'Loggout Out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, *args, **kwargs):
        return Response({'success': 'CSRF cookie set'})
