from django.urls import path
from api import views

urlpatterns = [
    path('gettask/', views.TaskView.as_view()),
    path('createtask/', views.CreateTaskView.as_view()),
    path('updatetask/<int:pk>', views.UpdateTaskView.as_view()),
    path('deletetask/<int:pk>', views.DeleteTaskView.as_view()),
]