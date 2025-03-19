from django.urls import path
from . import views

urlpatterns = [
    path('computers/', views.ComputerListCreate.as_view(), name='computer-list-create'),
    path('computers/<int:pk>/', views.ComputerRetrieveUpdateDestroy.as_view(), name='computer-retrieve-update-destroy'),
]