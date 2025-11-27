from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid
import os
from mutagen import File as MutagenFile


def upload_to(instance, filename):
    """Generate upload path for audio files"""
    from django.utils import timezone
    ext = filename.split('.')[-1]
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')
    
    if instance.user:
        username = instance.user.username
    elif instance.anonymous_name:
        username = instance.anonymous_name
    else:
        username = 'anonymous'
    
    # Clean username for filename
    username = ''.join(c for c in username if c.isalnum() or c in '-_')
    filename = f"{timestamp}_{username}.{ext}"
    return os.path.join('cough_recordings', filename)


class CoughRecording(models.Model):
    # Unique identifier for each recording
    recording_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    # User information (optional for anonymous submissions)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    anonymous_name = models.CharField(max_length=100, null=True, blank=True)
    
    # Audio file
    audio_file = models.FileField(upload_to=upload_to)
    
    # Metadata for thesis purposes
    file_name = models.CharField(max_length=255)
    file_size = models.BigIntegerField()  # in bytes
    file_format = models.CharField(max_length=10)  # wav, mp3, etc.
    duration = models.FloatField(null=True, blank=True)  # in seconds
    
    # Recording method
    RECORDING_METHOD_CHOICES = [
        ('browser', 'Browser Recording'),
        ('upload', 'File Upload'),
    ]
    recording_method = models.CharField(max_length=10, choices=RECORDING_METHOD_CHOICES)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    # Additional metadata
    user_agent = models.TextField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    # Audio technical details
    sample_rate = models.IntegerField(null=True, blank=True)
    bit_rate = models.IntegerField(null=True, blank=True)
    channels = models.IntegerField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Cough Recording'
        verbose_name_plural = 'Cough Recordings'
    
    def __str__(self):
        user_display = self.user.username if self.user else self.anonymous_name or 'Anonymous'
        return f"Cough Recording by {user_display} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
    
    def save(self, *args, **kwargs):
        if self.audio_file:
            # Extract file metadata
            self.file_name = os.path.basename(self.audio_file.name)
            self.file_size = self.audio_file.size
            self.file_format = self.file_name.split('.')[-1].lower()
            
            # Try to extract audio metadata using mutagen
            try:
                audio_file = MutagenFile(self.audio_file.file)
                if audio_file:
                    self.duration = getattr(audio_file.info, 'length', None)
                    self.sample_rate = getattr(audio_file.info, 'sample_rate', None)
                    self.bit_rate = getattr(audio_file.info, 'bitrate', None)
                    self.channels = getattr(audio_file.info, 'channels', None)
            except:
                pass  # If metadata extraction fails, continue without it
        
        super().save(*args, **kwargs)
    
    @property
    def user_display_name(self):
        """Return display name for user (username or anonymous name)"""
        if self.user:
            return self.user.username
        return self.anonymous_name or f"Anonymous_{self.recording_id.hex[:8]}"
    
    @property
    def file_size_mb(self):
        """Return file size in MB"""
        return round(self.file_size / (1024 * 1024), 2) if self.file_size else 0