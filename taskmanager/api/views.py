from django.shortcuts import render
from .models import Task
from rest_framework.generics import ListAPIView,CreateAPIView,UpdateAPIView,DestroyAPIView
from .serializers import TaskSerializer

# Create your views here.

class TaskView(ListAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer

class CreateTaskView(CreateAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer

class UpdateTaskView(UpdateAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer

class DeleteTaskView(DestroyAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer