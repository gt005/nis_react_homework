from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework import permissions
from django.contrib import auth

from .models import Product
from .serializers import *


class ProductList(APIView):
    permission_classes = [permissions.IsAuthenticated]

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


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, *args, **kwargs):
        return Response({'success': 'CSRF cookie set'})
