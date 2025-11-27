"""
Custom middleware for the application
"""
import logging
import time
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from django.core.cache import cache

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(MiddlewareMixin):
    """Log all requests for monitoring and debugging"""
    
    def process_request(self, request):
        request.start_time = time.time()
        
        # Log request details
        logger.info(f"Request: {request.method} {request.path} from {self.get_client_ip(request)}")
        
        return None
    
    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            logger.info(f"Response: {response.status_code} in {duration:.3f}s")
        
        return response
    
    def get_client_ip(self, request):
        """Get client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class RateLimitMiddleware(MiddlewareMixin):
    """Simple rate limiting middleware"""
    
    def process_request(self, request):
        # Skip rate limiting for static files and admin
        if request.path.startswith('/static/') or request.path.startswith('/admin/'):
            return None
        
        client_ip = self.get_client_ip(request)
        cache_key = f"rate_limit_{client_ip}"
        
        # Get current request count
        request_count = cache.get(cache_key, 0)
        
        # Rate limit: 100 requests per hour
        if request_count >= 100:
            return JsonResponse({
                'error': True,
                'message': 'Rate limit exceeded. Please try again later.',
                'code': 'RATE_LIMIT_EXCEEDED'
            }, status=429)
        
        # Increment counter
        cache.set(cache_key, request_count + 1, 3600)  # 1 hour
        
        return None
    
    def get_client_ip(self, request):
        """Get client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class SecurityHeadersMiddleware(MiddlewareMixin):
    """Add security headers to responses"""
    
    def process_response(self, request, response):
        # Add security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        return response
