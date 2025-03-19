from rest_framework import generics
from .models import Computer
from .serializers import ComputerSerializer

class ComputerListCreate(generics.ListCreateAPIView):
    queryset = Computer.objects.all()
    serializer_class = ComputerSerializer

    def create(self, request, *args, **kwargs):
        print("Datos recibidos:", request.data)  # Imprime los datos recibidos
        return super().create(request, *args, **kwargs)

class ComputerRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Computer.objects.all()
    serializer_class = ComputerSerializer