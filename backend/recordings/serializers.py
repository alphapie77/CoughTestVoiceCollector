from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CoughRecording


class CoughRecordingSerializer(serializers.ModelSerializer):
    user_display_name = serializers.ReadOnlyField()
    file_size_mb = serializers.ReadOnlyField()
    audio_file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = CoughRecording
        fields = [
            'recording_id', 'user_display_name', 'anonymous_name',
            'audio_file', 'audio_file_url', 'file_name', 'file_size', 
            'file_size_mb', 'file_format', 'duration', 'recording_method',
            'created_at', 'uploaded_at', 'sample_rate', 'bit_rate', 'channels'
        ]
        read_only_fields = [
            'recording_id', 'file_name', 'file_size', 'file_size_mb',
            'file_format', 'duration', 'created_at', 'uploaded_at',
            'sample_rate', 'bit_rate', 'channels', 'user_display_name'
        ]
    
    def get_audio_file_url(self, obj):
        if obj.audio_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.audio_file.url)
        return None
    
    def create(self, validated_data):
        # Set user if authenticated, otherwise use anonymous_name
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['user'] = request.user
        
        # Extract IP address and user agent
        if request:
            validated_data['ip_address'] = self.get_client_ip(request)
            validated_data['user_agent'] = request.META.get('HTTP_USER_AGENT', '')
        
        return super().create(validated_data)
    
    def get_client_ip(self, request):
        """Extract client IP address from request"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class CoughRecordingListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing recordings"""
    user_display_name = serializers.ReadOnlyField()
    file_size_mb = serializers.ReadOnlyField()
    
    class Meta:
        model = CoughRecording
        fields = [
            'recording_id', 'user_display_name', 'file_name',
            'file_size_mb', 'file_format', 'duration', 'recording_method',
            'created_at'
        ]


class CoughRecordingStatsSerializer(serializers.Serializer):
    """Serializer for recording statistics"""
    total_recordings = serializers.IntegerField()
    total_users = serializers.IntegerField()
    total_anonymous = serializers.IntegerField()
    total_duration = serializers.FloatField()
    total_size_mb = serializers.FloatField()
    avg_duration = serializers.FloatField()
    recordings_by_method = serializers.DictField()
    recordings_by_format = serializers.DictField()