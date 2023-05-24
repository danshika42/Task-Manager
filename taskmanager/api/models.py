from django.db import models

# Create your models here.
class Task(models.Model):
    name=models.CharField(max_length=50)
    description=models.TextField(default="", null=True, blank=True)
    done=models.BooleanField(default=False)
    duetime=models.DateTimeField()

