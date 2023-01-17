from django.contrib import admin
from .models import File_tb


@admin.register(File_tb)
class File_tbAdmin(admin.ModelAdmin):
    list_display = ("file_name",
                "description","create_at","file_type", "user_id" )
    list_filter = ('file_type',"user_id",)
    search_fields = ("file_name__startswith",)
    
 
 
