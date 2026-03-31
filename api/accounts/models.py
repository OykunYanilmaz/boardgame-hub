import os
from zoneinfo import ZoneInfo
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import validate_file_size

def user_avatar_upload_path(instance, filename):
    ext = os.path.splitext(filename)[1].lower() or ".jpg"
    tr_now = timezone.now().astimezone(ZoneInfo("Europe/Istanbul"))
    timestamp = tr_now.strftime("%Y%m%d%H%M%S")
    path = f"accounts/avatars/user-{instance.id}-avatar-{timestamp}{ext}"
    return path

class User(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to=user_avatar_upload_path, blank=True, null=True, validators=[validate_file_size])

    def save(self, *args, **kwargs):
        old_avatar_name = None

        if self.pk:
            try:
                old_user = User.objects.get(pk=self.pk)
                if old_user.avatar:
                    old_avatar_name = old_user.avatar.name
            except User.DoesNotExist:
                pass
        
        super().save(*args, **kwargs)

        if old_avatar_name and self.avatar and old_avatar_name != self.avatar.name:
            storage = self.avatar.storage
            if storage.exists(old_avatar_name):
                storage.delete(old_avatar_name)
