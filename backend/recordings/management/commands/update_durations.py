from django.core.management.base import BaseCommand
from recordings.models import CoughRecording
import os

class Command(BaseCommand):
    help = 'Update durations for existing recordings'

    def handle(self, *args, **options):
        try:
            from pydub import AudioSegment
        except ImportError:
            self.stdout.write(self.style.ERROR('Pydub not installed'))
            return
            
        records = CoughRecording.objects.all()
        updated_count = 0
        
        for record in records:
            if os.path.exists(record.audio_file.path):
                try:
                    # Use pydub to get duration
                    audio = AudioSegment.from_file(record.audio_file.path)
                    actual_duration = len(audio) / 1000.0  # Convert milliseconds to seconds
                    
                    if abs(actual_duration - (record.duration or 0)) > 0.1:
                        record.duration = actual_duration
                        record.save()
                        updated_count += 1
                        self.stdout.write(f'Updated {record.file_name}: {actual_duration:.2f}s')
                    else:
                        self.stdout.write(f'No change for {record.file_name}: {actual_duration:.2f}s')
                        
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error processing {record.file_name}: {e}'))
            else:
                self.stdout.write(self.style.WARNING(f'File not found: {record.audio_file.path}'))
        
        self.stdout.write(self.style.SUCCESS(f'Updated {updated_count} records'))