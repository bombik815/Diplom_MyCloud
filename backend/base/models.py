from django.db import models
from django.contrib.auth.models import User

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user_id, filename)

class File_tb(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    file_file = models.FileField(upload_to=user_directory_path, null=True, blank=True)
    file_name = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(max_length=255, blank=True, null=True)
    size_file = models.CharField(max_length =50, blank=True)
    create_at = models.DateTimeField(auto_created=True)
    file_type = models.CharField(max_length=20, blank=True, null=True)
   
    
    def __str__(self):
        return f"{self.file_name}, {self.description}"
    
    
    
    