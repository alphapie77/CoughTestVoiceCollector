"""
Custom exceptions for the application
"""
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


class ValidationError(Exception):
    """Custom validation error"""
    def __init__(self, message, code=None):
        self.message = message
        self.code = code
        super().__init__(self.message)


class FileProcessingError(Exception):
    """Error during file processing"""
    def __init__(self, message, file_name=None):
        self.message = message
        self.file_name = file_name
        super().__init__(self.message)


class AudioProcessingError(Exception):
    """Error during audio processing"""
    def __init__(self, message, audio_format=None):
        self.message = message
        self.audio_format = audio_format
        super().__init__(self.message)


def custom_exception_handler(exc, context):
    """Custom exception handler for API responses"""
    response = exception_handler(exc, context)
    
    if response is not None:
        custom_response_data = {
            'error': True,
            'message': 'An error occurred',
            'details': response.data
        }
        
        # Log the error
        logger.error(f"API Error: {exc}", exc_info=True)
        
        # Customize error messages
        if isinstance(exc, ValidationError):
            custom_response_data['message'] = exc.message
            custom_response_data['code'] = exc.code
        elif isinstance(exc, FileProcessingError):
            custom_response_data['message'] = f"File processing error: {exc.message}"
            custom_response_data['file_name'] = exc.file_name
        elif isinstance(exc, AudioProcessingError):
            custom_response_data['message'] = f"Audio processing error: {exc.message}"
            custom_response_data['audio_format'] = exc.audio_format
        
        response.data = custom_response_data
    
    return response