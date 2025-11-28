from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse
from django.db.models import Count, Sum, Avg
from django.contrib.auth.models import User
from django.core.cache import cache
import csv
import io
import zipfile
import os
import logging
from django.conf import settings
from .models import CoughRecording
from .serializers import (
    CoughRecordingSerializer, 
    CoughRecordingListSerializer,
    CoughRecordingStatsSerializer
)
from core.validators import validate_audio_file, validate_anonymous_name, validate_recording_method
from core.exceptions import ValidationError, FileProcessingError
from core.utils import get_client_info, log_user_action, AudioMetadataExtractor
from core.audio_processor import AudioProcessor

logger = logging.getLogger(__name__)


class CoughRecordingCreateView(generics.CreateAPIView):
    """Create new cough recording (authenticated or anonymous)"""
    queryset = CoughRecording.objects.all()
    serializer_class = CoughRecordingSerializer
    permission_classes = [permissions.AllowAny]
    
    def perform_create(self, serializer):
        """Enhanced create with validation and logging"""
        try:
            # Validate inputs
            audio_file = self.request.FILES.get('audio_file')
            anonymous_name = self.request.data.get('anonymous_name')
            recording_method = self.request.data.get('recording_method')
            
            if audio_file:
                validate_audio_file(audio_file)
            
            if anonymous_name:
                validate_anonymous_name(anonymous_name)
            
            if recording_method:
                validate_recording_method(recording_method)
            
            # Get client info
            client_info = get_client_info(self.request)
            
            # Save with additional metadata
            instance = serializer.save(
                ip_address=client_info['ip_address'],
                user_agent=client_info['user_agent']
            )
            
            # Log the action
            log_user_action(
                user=self.request.user if self.request.user.is_authenticated else None,
                action='recording_created',
                details={
                    'recording_id': str(instance.recording_id),
                    'method': recording_method,
                    'file_size': audio_file.size if audio_file else None
                }
            )
            
            logger.info(f"Recording created: {instance.recording_id}")
            
        except Exception as e:
            logger.error(f"Error creating recording: {e}")
            raise ValidationError(str(e))


class CoughRecordingListView(generics.ListAPIView):
    """List all cough recordings with filtering"""
    queryset = CoughRecording.objects.all()
    serializer_class = CoughRecordingListSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['recording_method', 'file_format', 'user']
    search_fields = ['user__username', 'anonymous_name', 'file_name']
    ordering_fields = ['created_at', 'duration', 'file_size']
    ordering = ['-created_at']


class CoughRecordingDetailView(generics.RetrieveAPIView):
    """Get detailed view of a specific recording"""
    queryset = CoughRecording.objects.all()
    serializer_class = CoughRecordingSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'recording_id'


class UserRecordingsView(generics.ListAPIView):
    """List recordings for authenticated user"""
    serializer_class = CoughRecordingListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return CoughRecording.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def recording_stats(request):
    """Get comprehensive statistics about recordings with caching"""
    logger.info("Generating fresh statistics")
    
    total_recordings = CoughRecording.objects.count()
    total_users = CoughRecording.objects.filter(user__isnull=False).values('user').distinct().count()
    total_anonymous = CoughRecording.objects.filter(user__isnull=True).count()
    
    # Aggregate statistics
    aggregates = CoughRecording.objects.aggregate(
        total_duration=Sum('duration'),
        total_size=Sum('file_size'),
        avg_duration=Avg('duration')
    )
    
    # Convert total size to MB
    total_size_mb = (aggregates['total_size'] or 0) / (1024 * 1024)
    
    # Recordings by method
    recordings_by_method = dict(
        CoughRecording.objects.values('recording_method').annotate(
            count=Count('id')
        ).values_list('recording_method', 'count')
    )
    
    # Recordings by format
    recordings_by_format = dict(
        CoughRecording.objects.values('file_format').annotate(
            count=Count('id')
        ).values_list('file_format', 'count')
    )
    
    stats_data = {
        'total_recordings': total_recordings,
        'total_users': total_users,
        'total_anonymous': total_anonymous,
        'total_duration': aggregates['total_duration'] or 0,
        'total_size_mb': round(total_size_mb, 2),
        'avg_duration': round(aggregates['avg_duration'] or 0, 2),
        'recordings_by_method': recordings_by_method,
        'recordings_by_format': recordings_by_format,
    }
    
    serializer = CoughRecordingStatsSerializer(stats_data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def export_csv(request):
    """Export all recordings data to CSV for thesis research"""
    from django.utils import timezone
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="data_{timestamp}.csv"'
    
    writer = csv.writer(response)
    
    # CSV Headers
    headers = [
        'Recording ID', 'User Type', 'User Name', 'File Name', 'File Size (MB)',
        'File Format', 'Duration (seconds)', 'Recording Method', 'Created At',
        'Uploaded At', 'Sample Rate', 'Bit Rate', 'Channels', 'IP Address',
        'User Agent', 'Audio File URL'
    ]
    writer.writerow(headers)
    
    # Write data rows
    for recording in CoughRecording.objects.all().select_related('user'):
        user_type = 'Registered' if recording.user else 'Anonymous'
        user_name = recording.user_display_name
        audio_url = request.build_absolute_uri(recording.audio_file.url) if recording.audio_file else ''
        
        row = [
            str(recording.recording_id),
            user_type,
            user_name,
            recording.file_name,
            recording.file_size_mb,
            recording.file_format,
            recording.duration or '',
            recording.get_recording_method_display(),
            recording.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            recording.uploaded_at.strftime('%Y-%m-%d %H:%M:%S'),
            recording.sample_rate or '',
            recording.bit_rate or '',
            recording.channels or '',
            recording.ip_address or '',
            recording.user_agent or '',
            audio_url
        ]
        writer.writerow(row)
    
    return response


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def export_html(request):
    """Export all recordings data to HTML with embedded audio players"""
    from django.utils import timezone
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')
    response = HttpResponse(content_type='text/html')
    response['Content-Disposition'] = f'attachment; filename="data_{timestamp}.html"'
    
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>CoughTest Recordings Data</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            audio { width: 200px; }
            .metadata { font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <h1>🎤 CoughTest Recordings Data</h1>
        <p>Generated on: """ + request.build_absolute_uri().split('/')[2] + """</p>
        <table>
            <tr>
                <th>Recording ID</th>
                <th>User</th>
                <th>File Name</th>
                <th>Audio Player</th>
                <th>Duration</th>
                <th>Size (MB)</th>
                <th>Format</th>
                <th>Method</th>
                <th>Created At</th>
                <th>Metadata</th>
            </tr>
    """
    
    for recording in CoughRecording.objects.all().select_related('user'):
        user_type = 'Registered' if recording.user else 'Anonymous'
        user_name = recording.user_display_name
        audio_url = request.build_absolute_uri(recording.audio_file.url) if recording.audio_file else ''
        
        metadata = f"Sample Rate: {recording.sample_rate or 'N/A'}<br>"
        metadata += f"Bit Rate: {recording.bit_rate or 'N/A'}<br>"
        metadata += f"Channels: {recording.channels or 'N/A'}"
        
        html_content += f"""
            <tr>
                <td>{recording.recording_id}</td>
                <td>{user_name} ({user_type})</td>
                <td>{recording.file_name}</td>
                <td>
                    <audio controls>
                        <source src="{audio_url}" type="audio/{recording.file_format}">
                        Your browser does not support audio playback.
                    </audio>
                </td>
                <td>{recording.duration or 'N/A'}s</td>
                <td>{recording.file_size_mb}</td>
                <td>{recording.file_format}</td>
                <td>{recording.get_recording_method_display()}</td>
                <td>{recording.created_at.strftime('%Y-%m-%d %H:%M:%S')}</td>
                <td class="metadata">{metadata}</td>
            </tr>
        """
    
    html_content += """
        </table>
    </body>
    </html>
    """
    
    response.write(html_content)
    return response


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def export_zip(request):
    """Export all recordings as ZIP file with CSV and audio files"""
    from django.utils import timezone
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')
    response = HttpResponse(content_type='application/zip')
    response['Content-Disposition'] = f'attachment; filename="data_{timestamp}.zip"'
    
    # Create ZIP file in memory
    zip_buffer = io.BytesIO()
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        # Create CSV content
        csv_buffer = io.StringIO()
        writer = csv.writer(csv_buffer)
        
        # CSV Headers
        headers = [
            'Recording ID', 'User Type', 'User Name', 'Audio File Name', 'File Size (MB)',
            'File Format', 'Duration (seconds)', 'Recording Method', 'Created At',
            'Uploaded At', 'Sample Rate', 'Bit Rate', 'Channels', 'IP Address', 'User Agent'
        ]
        writer.writerow(headers)
        
        # Add each recording to ZIP
        for recording in CoughRecording.objects.all().select_related('user'):
            user_type = 'Registered' if recording.user else 'Anonymous'
            user_name = recording.user_display_name
            
            # Add audio file to ZIP
            if recording.audio_file and os.path.exists(recording.audio_file.path):
                zip_file.write(recording.audio_file.path, f"audio_files/{recording.file_name}")
            
            # Add row to CSV
            row = [
                str(recording.recording_id),
                user_type,
                user_name,
                recording.file_name,
                recording.file_size_mb,
                recording.file_format,
                recording.duration or '',
                recording.get_recording_method_display(),
                recording.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                recording.uploaded_at.strftime('%Y-%m-%d %H:%M:%S'),
                recording.sample_rate or '',
                recording.bit_rate or '',
                recording.channels or '',
                recording.ip_address or '',
                recording.user_agent or ''
            ]
            writer.writerow(row)
        
        # Add CSV to ZIP
        zip_file.writestr('cough_recordings_data.csv', csv_buffer.getvalue())
        
        # Add README file
        readme_content = """# CoughTest Data Export

This ZIP contains:
1. cough_recordings_data.csv - All metadata
2. audio_files/ - All audio recordings

To analyze:
1. Open CSV in Excel/Google Sheets
2. Audio files are in audio_files/ folder
3. Match 'Audio File Name' column with files in audio_files/

Generated from CoughTest Research Platform
"""
        zip_file.writestr('README.txt', readme_content)
    
    response.write(zip_buffer.getvalue())
    return response


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def bulk_upload_recordings(request):
    """Handle multiple audio file uploads with professional warnings"""
    files = request.FILES.getlist('audio_files')
    anonymous_name = request.data.get('anonymous_name')
    recording_method = request.data.get('recording_method', 'upload')
    
    if not files:
        return Response({
            'success': False,
            'error': 'No files provided'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    results = []
    warnings = []
    errors = []
    
    for i, audio_file in enumerate(files):
        try:
            # Validate file
            validate_audio_file(audio_file)
            
            # Process audio file
            processed_file, was_truncated, original_duration = AudioProcessor.process_audio_file(audio_file)
            
            # Get client info
            client_info = get_client_info(request)
            
            # Create numbered anonymous name for bulk uploads
            file_anonymous_name = anonymous_name
            if len(files) > 1:
                file_anonymous_name = f"{anonymous_name}_{i + 1}"
            
            # Create recording directly
            instance = CoughRecording.objects.create(
                audio_file=processed_file,
                anonymous_name=file_anonymous_name,
                recording_method=recording_method,
                ip_address=client_info['ip_address'],
                user_agent=client_info['user_agent'],
                user=request.user if request.user.is_authenticated else None
            )
            
            result = {
                'file_index': i,
                'file_name': audio_file.name,
                'recording_id': str(instance.recording_id),
                'status': 'success'
            }
            
            # Add warnings for duration issues
            if was_truncated:
                warnings.append({
                    'file_index': i,
                    'file_name': audio_file.name,
                    'type': 'duration_warning',
                    'message': f'Audio duration ({original_duration:.1f}s) exceeds research standard (10s). Consider re-recording for optimal research quality.',
                    'original_duration': original_duration,
                    'recommended_duration': 10.0
                })
                result['warning'] = 'Duration exceeds research standard'
            
            results.append(result)
                
        except Exception as e:
            errors.append({
                'file_index': i,
                'file_name': audio_file.name,
                'error': str(e)
            })
    
    # Prepare response
    response_data = {
        'success': len(results) > 0,
        'summary': {
            'total_files': len(files),
            'successful_uploads': len(results),
            'warnings': len(warnings),
            'errors': len(errors)
        },
        'results': results
    }
    
    if warnings:
        response_data['warnings'] = warnings
        response_data['warning_message'] = f'{len(warnings)} file(s) have duration concerns. Research quality may be affected.'
    
    if errors:
        response_data['errors'] = errors
        response_data['error_message'] = f'{len(errors)} file(s) failed to upload.'
    
    return Response(response_data, status=status.HTTP_200_OK if len(results) > 0 else status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_user_recording(request, recording_id):
    """Allow users to delete their own recordings"""
    try:
        recording = CoughRecording.objects.get(
            recording_id=recording_id,
            user=request.user
        )
        recording.delete()
        return Response({'message': 'Recording deleted successfully'})
    except CoughRecording.DoesNotExist:
        return Response(
            {'error': 'Recording not found or not owned by user'}, 
            status=status.HTTP_404_NOT_FOUND
        )
