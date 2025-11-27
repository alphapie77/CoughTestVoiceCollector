"""
Custom validators for the application
"""
import os
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile
from .config import get_config

config = get_config()


def validate_audio_file(file: UploadedFile) -> None:
    """Validate uploaded audio file"""
    
    # Check file size
    if file.size > config.MAX_FILE_SIZE:
        raise ValidationError(
            f'File size ({file.size / (1024*1024):.1f}MB) exceeds maximum allowed size ({config.MAX_FILE_SIZE / (1024*1024):.1f}MB)'
        )
    
    # Check file extension
    ext = os.path.splitext(file.name)[1].lower().lstrip('.')
    if ext not in config.ALLOWED_AUDIO_FORMATS:
        raise ValidationError(
            f'File format "{ext}" not supported. Allowed formats: {", ".join(config.ALLOWED_AUDIO_FORMATS)}'
        )
    
    # Check MIME type
    allowed_mime_types = [
        'audio/wav', 'audio/wave', 'audio/x-wav',
        'audio/mpeg', 'audio/mp3',
        'audio/webm',
        'audio/ogg',
        'audio/mp4', 'audio/m4a'
    ]
    
    if hasattr(file, 'content_type') and file.content_type:
        if file.content_type not in allowed_mime_types:
            raise ValidationError(
                f'MIME type "{file.content_type}" not supported'
            )


def validate_anonymous_name(name: str) -> None:
    """Validate anonymous name"""
    if not name or not name.strip():
        raise ValidationError('Anonymous name is required')
    
    if len(name.strip()) < 2:
        raise ValidationError('Anonymous name must be at least 2 characters long')
    
    if len(name.strip()) > 50:
        raise ValidationError('Anonymous name must be less than 50 characters')
    
    # Check for valid characters
    allowed_chars = set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_')
    if not all(c in allowed_chars for c in name.strip()):
        raise ValidationError('Anonymous name can only contain letters, numbers, hyphens, and underscores')


def validate_recording_method(method: str) -> None:
    """Validate recording method"""
    allowed_methods = ['browser', 'upload']
    if method not in allowed_methods:
        raise ValidationError(f'Recording method must be one of: {", ".join(allowed_methods)}')
