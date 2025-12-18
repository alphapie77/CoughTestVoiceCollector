"""
URL configuration for coughtest_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt


@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def api_root(request):
    """API root endpoint with available endpoints"""
    return Response({
        'message': 'CoughTest API',
        'version': '1.0',
        'endpoints': {
            'auth': {
                'register': '/api/auth/register/',
                'login': '/api/auth/login/',
                'logout': '/api/auth/logout/',
                'profile': '/api/auth/profile/',
                'token_refresh': '/api/auth/token/refresh/',
            },
            'recordings': {
                'upload': '/api/recordings/upload/',
                'list': '/api/recordings/list/',
                'detail': '/api/recordings/detail/<recording_id>/',
                'my_recordings': '/api/recordings/my-recordings/',
                'stats': '/api/recordings/stats/',
                'export_csv': '/api/recordings/export-csv/',
                'delete': '/api/recordings/delete/<recording_id>/',
            }
        }
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/health/', lambda request: Response({'status': 'ok'}), name='health-check'),
    path('api/auth/', include('accounts.urls')),
    path('api/recordings/', include('recordings.urls')),
]

# Serve media files during development and production (for PythonAnywhere)
if settings.DEBUG or not settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
