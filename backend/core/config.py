"""
Configuration management for the application
"""
import os
from typing import Dict, Any


class Config:
    """Base configuration class"""
    
    # Database
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///db.sqlite3')
    
    # Security
    SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-quu%^+cqhph33h5k*v*26j4omjn!epl432@*l$x%qog!qk&668')
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
    
    # File Upload
    MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', 50 * 1024 * 1024))  # 50MB
    ALLOWED_AUDIO_FORMATS = ['wav', 'mp3', 'webm', 'ogg', 'm4a']
    
    # API
    API_RATE_LIMIT = os.getenv('API_RATE_LIMIT', '100/hour')
    
    # CORS
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')
    
    # Media
    MEDIA_ROOT = os.getenv('MEDIA_ROOT', 'media')
    MEDIA_URL = os.getenv('MEDIA_URL', '/media/')


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost').split(',')
    
    # Enhanced security for production
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True


class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    DATABASE_URL = 'sqlite:///:memory:'


def get_config() -> Config:
    """Get configuration based on environment"""
    env = os.getenv('ENVIRONMENT', 'development').lower()
    
    config_map = {
        'development': DevelopmentConfig,
        'production': ProductionConfig,
        'testing': TestingConfig,
    }
    
    return config_map.get(env, DevelopmentConfig)()