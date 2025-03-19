from django.db import models

class Computer(models.Model):
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    procesador = models.CharField(max_length=100)
    memoria = models.CharField(max_length=100)
    almacenamiento = models.CharField(max_length=100)
    tarjeta_grafica = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    imagen = models.URLField()
    
    def __str__(self):
        return f"{self.marca} {self.modelo}"