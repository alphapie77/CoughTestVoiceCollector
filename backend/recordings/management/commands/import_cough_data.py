import os
import shutil
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.core.files import File
from recordings.models import CoughRecording
from mutagen import File as MutagenFile


class Command(BaseCommand):
    help = 'Import pre-gathered cough sound data into the database'

    def add_arguments(self, parser):
        parser.add_argument('data_folder', type=str, help='Path to folder containing audio files')
        parser.add_argument('--user', type=str, help='Username to assign recordings to (optional)')
        parser.add_argument('--anonymous-prefix', type=str, default='Imported', 
                          help='Prefix for anonymous names (default: Imported)')
        parser.add_argument('--method', type=str, choices=['browser', 'upload'], 
                          default='upload', help='Recording method (default: upload)')

    def handle(self, *args, **options):
        data_folder = options['data_folder']
        username = options['user']
        anonymous_prefix = options['anonymous_prefix']
        recording_method = options['method']

        if not os.path.exists(data_folder):
            self.stdout.write(self.style.ERROR(f'Folder not found: {data_folder}'))
            return

        # Get user if specified
        user = None
        if username:
            try:
                user = User.objects.get(username=username)
                self.stdout.write(f'Assigning recordings to user: {username}')
            except User.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'User not found: {username}'))
                return

        # Supported audio formats
        supported_formats = ['.wav', '.mp3', '.webm', '.m4a', '.ogg']
        
        imported_count = 0
        skipped_count = 0

        self.stdout.write(f'Scanning folder: {data_folder}')
        
        for filename in os.listdir(data_folder):
            file_path = os.path.join(data_folder, filename)
            
            # Skip if not a file
            if not os.path.isfile(file_path):
                continue
                
            # Check if supported audio format
            file_ext = os.path.splitext(filename)[1].lower()
            if file_ext not in supported_formats:
                continue

            try:
                # Create CoughRecording instance
                recording = CoughRecording()
                
                # Set user or anonymous name
                if user:
                    recording.user = user
                else:
                    recording.anonymous_name = f"{anonymous_prefix}_{imported_count + 1:04d}"
                
                recording.recording_method = recording_method
                
                # Copy file to media directory
                with open(file_path, 'rb') as f:
                    django_file = File(f)
                    recording.audio_file.save(filename, django_file, save=False)
                
                # Extract metadata
                try:
                    audio_file = MutagenFile(file_path)
                    if audio_file:
                        recording.duration = getattr(audio_file.info, 'length', None)
                        recording.sample_rate = getattr(audio_file.info, 'sample_rate', None)
                        recording.bit_rate = getattr(audio_file.info, 'bitrate', None)
                        recording.channels = getattr(audio_file.info, 'channels', None)
                except:
                    pass  # Continue without metadata if extraction fails
                
                recording.save()
                imported_count += 1
                
                self.stdout.write(f'✓ Imported: {filename}')
                
            except Exception as e:
                skipped_count += 1
                self.stdout.write(self.style.WARNING(f'✗ Skipped {filename}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS(
            f'\nImport completed!\n'
            f'Imported: {imported_count} files\n'
            f'Skipped: {skipped_count} files'
        ))