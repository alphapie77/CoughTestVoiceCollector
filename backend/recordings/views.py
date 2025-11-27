from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse
from django.db.models import Count, Sum, Avg
from django.contrib.auth.models import User
import csv
import io
from .models import CoughRecording
from .serializers import (
    CoughRecordingSerializer, 
    CoughRecordingListSerializer,
    CoughRecordingStatsSerializer
)


class CoughRecordingCreateView(generics.CreateAPIView):
    """Create new cough recording (authenticated or anonymous)"""
    queryset = CoughRecording.objects.all()
    serializer_class = CoughRecordingSerializer
    permission_classes = [permissions.AllowAny]


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
    """Get comprehensive statistics about recordings"""
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
@permission_classes([permissions.IsAdminUser])
def export_csv(request):
    """Export all recordings data to CSV for thesis research"""
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="cough_recordings_data.csv"'
    
    writer = csv.writer(response)
    
    # CSV Headers
    headers = [
        'Recording ID', 'User Type', 'User Name', 'File Name', 'File Size (MB)',
        'File Format', 'Duration (seconds)', 'Recording Method', 'Created At',
        'Uploaded At', 'Sample Rate', 'Bit Rate', 'Channels', 'IP Address',
        'User Agent'
    ]
    writer.writerow(headers)
    
    # Write data rows
    for recording in CoughRecording.objects.all().select_related('user'):
        user_type = 'Registered' if recording.user else 'Anonymous'
        user_name = recording.user_display_name
        
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
    
    return response


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