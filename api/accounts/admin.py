from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.safestring import mark_safe
from .models import User



@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "usable_password", "password1", "password2", "email", "first_name", "last_name"),
            },
        ),
    )

    fieldsets = BaseUserAdmin.fieldsets + (
        (
            "Profile Picture", 
            {
                "fields": ("avatar", "avatar_preview"),
            }
        ),
    )

    readonly_fields = ("avatar_preview",)

    def avatar_preview(self, obj):
        if obj.avatar:
            return mark_safe(
                f'<img src="{obj.avatar.url}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />'
            )
        
        return "-"
    
