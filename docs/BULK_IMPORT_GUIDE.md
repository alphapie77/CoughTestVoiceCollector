# 📥 Bulk Import Guide for Pre-Gathered Cough Data

## Quick Import Commands

### Basic Import (Anonymous)
```bash
cd backend
python manage.py import_cough_data "C:\path\to\your\audio\files"
```

### Import to Specific User
```bash
python manage.py import_cough_data "C:\path\to\your\audio\files" --user admin
```

### Custom Anonymous Names
```bash
python manage.py import_cough_data "C:\path\to\your\audio\files" --anonymous-prefix "Study2025"
```

## Command Options

| Option | Description | Default |
|--------|-------------|---------|
| `data_folder` | Path to folder with audio files | Required |
| `--user` | Username to assign recordings to | None (anonymous) |
| `--anonymous-prefix` | Prefix for anonymous names | "Imported" |
| `--method` | Recording method (browser/upload) | "upload" |

## Supported Formats
- ✅ WAV (.wav)
- ✅ MP3 (.mp3) 
- ✅ WebM (.webm)
- ✅ M4A (.m4a)
- ✅ OGG (.ogg)

## Example Usage Scenarios

### 1. Research Dataset Import
```bash
# Import 1000 cough samples as anonymous submissions
python manage.py import_cough_data "D:\research\cough_dataset" --anonymous-prefix "Dataset2025"
```

### 2. User-Specific Import
```bash
# Create user first
python manage.py createsuperuser

# Import to that user
python manage.py import_cough_data "D:\my_recordings" --user researcher1
```

### 3. Multiple Folders
```bash
# Import from multiple sources
python manage.py import_cough_data "D:\batch1" --anonymous-prefix "Batch1"
python manage.py import_cough_data "D:\batch2" --anonymous-prefix "Batch2"
```

## What Gets Imported

### Automatic Metadata Extraction
- ✅ File size and format
- ✅ Audio duration
- ✅ Sample rate
- ✅ Bit rate  
- ✅ Number of channels
- ✅ Timestamps

### Generated Data
- ✅ Unique recording ID
- ✅ Anonymous names (if no user specified)
- ✅ Recording method classification
- ✅ File organization in media folder

## Folder Structure Example
```
your_audio_files/
├── cough_001.wav
├── cough_002.mp3
├── patient_a_cough.wav
├── sample_123.webm
└── recording_xyz.m4a
```

## Verification After Import

### Check Import Results
```bash
# View total recordings
python manage.py shell -c "from recordings.models import CoughRecording; print(f'Total recordings: {CoughRecording.objects.count()}')"

# View recent imports
python manage.py shell -c "from recordings.models import CoughRecording; [print(f'{r.user_display_name}: {r.file_name}') for r in CoughRecording.objects.all()[:10]]"
```

### Access via Web Interface
1. Start servers: `start_servers.bat`
2. Visit: http://localhost:3000/statistics
3. Check: http://localhost:8000/admin (admin panel)

## Troubleshooting

### Common Issues
- **Permission Error**: Run command prompt as administrator
- **Path Not Found**: Use absolute paths with quotes
- **Format Not Supported**: Check file extensions
- **User Not Found**: Create user first with `createsuperuser`

### File Organization
- Files are automatically copied to `backend/media/cough_recordings/`
- Original files remain unchanged
- Duplicate filenames get unique identifiers

## CSV Export After Import
```bash
# Export all data including imported files
python manage.py shell -c "
from recordings.views import export_csv
from django.http import HttpRequest
request = HttpRequest()
request.user = User.objects.get(username='admin')  # Admin user required
response = export_csv(request)
with open('exported_data.csv', 'wb') as f:
    f.write(response.content)
print('CSV exported to exported_data.csv')
"
```

---

**Ready to import your research data! 🎓**
