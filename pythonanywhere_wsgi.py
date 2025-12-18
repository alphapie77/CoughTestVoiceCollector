import os
import sys

# Add your project directory to the sys.path
path = '/home/yourusername/CoughTestVoiceCollector/backend'
if path not in sys.path:
    sys.path.insert(0, path)

# Set environment variables
os.environ['DJANGO_SETTINGS_MODULE'] = 'coughtest_backend.settings'
os.environ['ENVIRONMENT'] = 'production'

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()