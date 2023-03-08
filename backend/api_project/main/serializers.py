from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format='%d %B %Y')

    class Meta:
        model = Product
        fields = '__all__'
