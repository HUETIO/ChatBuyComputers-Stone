from rest_framework import serializers
from .models import Computer

class ComputerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Computer
        fields = '__all__'  # Incluye todos los campos del modelo