from rest_framework import serializers
from .models import Product
import locale
locale.setlocale(locale.LC_TIME, "ru_RU.utf-8")


class ProductSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format='%d %B %Y')

    class Meta:
        model = Product
        fields = '__all__'
