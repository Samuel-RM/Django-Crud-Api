from django.shortcuts import render
from  rest_framework import viewsets
from .models import Task
from .serializer import TaskSerializer

# Create your views here.
class TaskVies(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()



