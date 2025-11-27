#!/usr/bin/env python
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coughtest_backend.settings')
django.setup()

from recordings.models import CoughRecording

def fix_durations():
    try:
        from pydub import AudioSegment
        print("Pydub imported successfully")
    except ImportError:
        print("Pydub not available, trying alternative approach")
        # Simple approach - just check file sizes and estimate
        records = CoughRecording.objects.all()
        for record in records:
            if record.recording_method == 'browser' and record.duration == 10.0:
                # For browser recordings, check if they're actually shorter
                try:
                    file_size = os.path.getsize(record.audio_file.path)
                    # Rough estimation: smaller files are likely shorter recordings
                    if file_size < 50000:  # Less than 50KB
                        estimated_duration = max(1.0, file_size / 10000)  # Rough estimate
                        record.duration = estimated_duration
                        record.save()
                        print(f"Updated {record.file_name}: {estimated_duration:.2f}s (estimated)")
                    else:
                        print(f"Keeping {record.file_name}: 10.0s (normal size)")
                except Exception as e:
                    print(f"Error with {record.file_name}: {e}")
        return
    
    # Use pydub if available
    records = CoughRecording.objects.all()
    updated_count = 0
    
    for record in records:
        if os.path.exists(record.audio_file.path):
            try:
                audio = AudioSegment.from_file(record.audio_file.path)
                actual_duration = len(audio) / 1000.0
                
                if abs(actual_duration - (record.duration or 0)) > 0.1:
                    record.duration = actual_duration
                    record.save()
                    updated_count += 1
                    print(f"Updated {record.file_name}: {actual_duration:.2f}s")
                else:
                    print(f"No change for {record.file_name}: {actual_duration:.2f}s")
                    
            except Exception as e:
                print(f"Error processing {record.file_name}: {e}")
        else:
            print(f"File not found: {record.audio_file.path}")
    
    print(f"Updated {updated_count} records")

if __name__ == '__main__':
    fix_durations()