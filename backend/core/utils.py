"""
Utility functions for the application
"""
import os
import hashlib
import logging
from typing import Optional, Dict, Any
from django.core.files.uploadedfile import UploadedFile
from django.utils import timezone

logger = logging.getLogger(__name__)


def generate_file_hash(file: UploadedFile) -> str:
    """Generate SHA-256 hash of uploaded file"""
    hash_sha256 = hashlib.sha256()
    
    # Reset file pointer
    file.seek(0)
    
    # Read file in chunks
    for chunk in iter(lambda: file.read(4096), b""):
        hash_sha256.update(chunk)
    
    # Reset file pointer
    file.seek(0)
    
    return hash_sha256.hexdigest()


def sanitize_filename(filename: str) -> str:
    """Sanitize filename for safe storage"""
    # Remove path components
    filename = os.path.basename(filename)
    
    # Replace unsafe characters
    unsafe_chars = '<>:"/\\|?*'
    for char in unsafe_chars:
        filename = filename.replace(char, '_')
    
    # Limit length
    name, ext = os.path.splitext(filename)
    if len(name) > 100:
        name = name[:100]
    
    return f"{name}{ext}"


def get_client_info(request) -> Dict[str, Any]:
    """Extract client information from request"""
    return {
        'ip_address': get_client_ip(request),
        'user_agent': request.META.get('HTTP_USER_AGENT', ''),
        'referer': request.META.get('HTTP_REFERER', ''),
        'timestamp': timezone.now().isoformat()
    }


def get_client_ip(request) -> str:
    """Get client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR', '')
    return ip


def format_file_size(size_bytes: int) -> str:
    """Format file size in human readable format"""
    if size_bytes == 0:
        return "0 B"
    
    size_names = ["B", "KB", "MB", "GB"]
    i = 0
    while size_bytes >= 1024 and i < len(size_names) - 1:
        size_bytes /= 1024.0
        i += 1
    
    return f"{size_bytes:.1f} {size_names[i]}"


def log_user_action(user, action: str, details: Optional[Dict] = None):
    """Log user actions for audit trail"""
    log_data = {
        'user': str(user) if user else 'Anonymous',
        'action': action,
        'timestamp': timezone.now().isoformat(),
        'details': details or {}
    }
    
    logger.info(f"User Action: {log_data}")


class AudioMetadataExtractor:
    """Extract metadata from audio files"""
    
    @staticmethod
    def extract_metadata(file_path: str) -> Dict[str, Any]:
        """Extract audio metadata using multiple libraries"""
        metadata = {
            'duration': None,
            'sample_rate': None,
            'bit_rate': None,
            'channels': None,
            'format': None
        }
        
        try:
            # Try with mutagen first
            from mutagen import File as MutagenFile
            audio_file = MutagenFile(file_path)
            
            if audio_file and hasattr(audio_file, 'info'):
                info = audio_file.info
                metadata.update({
                    'duration': getattr(info, 'length', None),
                    'sample_rate': getattr(info, 'sample_rate', None),
                    'bit_rate': getattr(info, 'bitrate', None),
                    'channels': getattr(info, 'channels', None)
                })
        except Exception as e:
            logger.warning(f"Mutagen extraction failed: {e}")
        
        # Fallback to pydub if mutagen fails
        if not metadata['duration']:
            try:
                from pydub import AudioSegment
                audio = AudioSegment.from_file(file_path)
                metadata.update({
                    'duration': len(audio) / 1000.0,  # Convert to seconds
                    'sample_rate': audio.frame_rate,
                    'channels': audio.channels
                })
            except Exception as e:
                logger.warning(f"Pydub extraction failed: {e}")
        
        return metadata
