"""
Audio processing utilities for CoughTest platform
"""
import os
import tempfile
import logging
from mutagen import File as MutagenFile

logger = logging.getLogger(__name__)

class AudioProcessor:
    """Handle audio file processing and validation"""
    
    MAX_DURATION = 10.0  # 10 seconds
    
    @staticmethod
    def process_audio_file(audio_file):
        """
        Process uploaded audio file - get metadata and validate duration
        Returns: (processed_file, was_truncated, original_duration)
        """
        try:
            # Create temporary file to analyze
            with tempfile.NamedTemporaryFile(delete=False, suffix='.tmp') as temp_file:
                for chunk in audio_file.chunks():
                    temp_file.write(chunk)
                temp_path = temp_file.name
            
            # Get audio metadata
            audio_info = MutagenFile(temp_path)
            original_duration = None
            
            if audio_info and hasattr(audio_info, 'info'):
                original_duration = audio_info.info.length
            
            # Clean up temp file
            os.unlink(temp_path)
            
            # Reset file pointer
            audio_file.seek(0)
            
            # Check if truncation would be needed
            was_truncated = False
            if original_duration and original_duration > AudioProcessor.MAX_DURATION:
                was_truncated = True
                logger.info(f"Audio would be truncated from {original_duration:.2f}s to {AudioProcessor.MAX_DURATION}s")
            
            return audio_file, was_truncated, original_duration
            
        except Exception as e:
            logger.error(f"Error processing audio file: {e}")
            # If processing fails, return original file
            audio_file.seek(0)
            return audio_file, False, None
    
    @staticmethod
    def get_audio_duration(file_path):
        """Get duration of audio file in seconds"""
        try:
            audio_info = MutagenFile(file_path)
            if audio_info and hasattr(audio_info, 'info'):
                return audio_info.info.length
            return None
        except Exception as e:
            logger.error(f"Error getting audio duration: {e}")
            return None