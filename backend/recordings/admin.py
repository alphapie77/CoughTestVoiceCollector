from django.contrib import admin
from django.utils.html import format_html
from .models import CoughRecording


@admin.register(CoughRecording)
class CoughRecordingAdmin(admin.ModelAdmin):
    list_display = [
        'recording_id_short', 'user_display_name', 'file_name', 
        'file_size_mb', 'duration', 'recording_method', 'created_at'
    ]
    list_filter = ['recording_method', 'file_format', 'created_at']
    search_fields = ['user__username', 'anonymous_name', 'file_name', 'recording_id']
    readonly_fields = [
        'recording_id', 'file_size', 'file_format', 'duration',
        'sample_rate', 'bit_rate', 'channels', 'created_at', 'uploaded_at'
    ]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('recording_id', 'user', 'anonymous_name', 'audio_file')
        }),
        ('File Metadata', {
            'fields': ('file_name', 'file_size', 'file_format', 'duration')
        }),
        ('Audio Technical Details', {
            'fields': ('sample_rate', 'bit_rate', 'channels'),
            'classes': ('collapse',)
        }),
        ('Recording Details', {
            'fields': ('recording_method', 'created_at', 'uploaded_at')
        }),
        ('System Information', {
            'fields': ('ip_address', 'user_agent'),
            'classes': ('collapse',)
        }),
    )
    
    def recording_id_short(self, obj):
        return str(obj.recording_id)[:8] + '...'
    recording_id_short.short_description = 'Recording ID'
    
    def file_size_mb(self, obj):
        return f"{obj.file_size_mb} MB"
    file_size_mb.short_description = 'File Size'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')