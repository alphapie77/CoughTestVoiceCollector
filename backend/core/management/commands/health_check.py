"""
Health check management command
"""
from django.core.management.base import BaseCommand
from django.db import connection
from django.core.cache import cache
import os


class Command(BaseCommand):
    help = 'Perform system health check'

    def handle(self, *args, **options):
        self.stdout.write('🏥 Performing Health Check...\n')
        
        checks = [
            self.check_database,
            self.check_cache,
            self.check_media_directory,
            self.check_logs_directory,
        ]
        
        results = []
        for check in checks:
            try:
                result = check()
                results.append(result)
                status = '✅' if result['status'] else '❌'
                self.stdout.write(f'{status} {result["name"]}: {result["message"]}')
            except Exception as e:
                results.append({
                    'name': check.__name__,
                    'status': False,
                    'message': str(e)
                })
                self.stdout.write(f'❌ {check.__name__}: {str(e)}')
        
        # Summary
        passed = sum(1 for r in results if r['status'])
        total = len(results)
        
        self.stdout.write(f'\n📊 Health Check Summary: {passed}/{total} checks passed')
        
        if passed == total:
            self.stdout.write(self.style.SUCCESS('🎉 All systems operational!'))
        else:
            self.stdout.write(self.style.ERROR('⚠️  Some systems need attention'))

    def check_database(self):
        """Check database connectivity"""
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            return {
                'name': 'Database',
                'status': True,
                'message': 'Connected successfully'
            }
        except Exception as e:
            return {
                'name': 'Database',
                'status': False,
                'message': f'Connection failed: {str(e)}'
            }

    def check_cache(self):
        """Check cache system"""
        try:
            test_key = 'health_check_test'
            test_value = 'test_value'
            cache.set(test_key, test_value, 10)
            retrieved = cache.get(test_key)
            cache.delete(test_key)
            
            if retrieved == test_value:
                return {
                    'name': 'Cache',
                    'status': True,
                    'message': 'Working correctly'
                }
            else:
                return {
                    'name': 'Cache',
                    'status': False,
                    'message': 'Value mismatch'
                }
        except Exception as e:
            return {
                'name': 'Cache',
                'status': False,
                'message': f'Error: {str(e)}'
            }

    def check_media_directory(self):
        """Check media directory"""
        from django.conf import settings
        
        media_root = settings.MEDIA_ROOT
        
        if not os.path.exists(media_root):
            return {
                'name': 'Media Directory',
                'status': False,
                'message': f'Directory does not exist: {media_root}'
            }
        
        if not os.access(media_root, os.W_OK):
            return {
                'name': 'Media Directory',
                'status': False,
                'message': f'Directory not writable: {media_root}'
            }
        
        return {
            'name': 'Media Directory',
            'status': True,
            'message': f'Accessible and writable: {media_root}'
        }

    def check_logs_directory(self):
        """Check logs directory"""
        from django.conf import settings
        
        logs_dir = settings.BASE_DIR / 'logs'
        
        if not os.path.exists(logs_dir):
            return {
                'name': 'Logs Directory',
                'status': False,
                'message': f'Directory does not exist: {logs_dir}'
            }
        
        if not os.access(logs_dir, os.W_OK):
            return {
                'name': 'Logs Directory',
                'status': False,
                'message': f'Directory not writable: {logs_dir}'
            }
        
        return {
            'name': 'Logs Directory',
            'status': True,
            'message': f'Accessible and writable: {logs_dir}'
        }
