# API Documentation
## CoughTest Research Platform REST API

### Document Information
- **Version**: 1.0
- **Base URL**: `http://localhost:8000/api`
- **Authentication**: JWT Bearer Token
- **Content Type**: `application/json`

---

## 1. Authentication Endpoints

### 1.1 User Registration
**Endpoint**: `POST /auth/register/`

**Description**: Register a new user account for the research platform (optional - users can also contribute anonymously).

**Request Body**:
```json
{
  "username": "researcher01",
  "email": "researcher@university.edu",
  "password": "SecurePassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "username": "researcher01",
    "email": "researcher@university.edu",
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "message": "User registered successfully"
}
```

### 1.2 User Login
**Endpoint**: `POST /auth/login/`

**Request Body**:
```json
{
  "username": "researcher01",
  "password": "SecurePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "username": "researcher01",
      "email": "researcher@university.edu",
      "first_name": "John",
      "last_name": "Doe"
    }
  },
  "message": "Login successful"
}
```

### 1.3 Token Refresh
**Endpoint**: `POST /auth/token/refresh/`

**Request Body**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

---

## 2. Recording Management Endpoints

### 2.1 Upload Recording
**Endpoint**: `POST /recordings/upload/`

**Description**: Upload a cough audio recording with metadata. Authentication is optional - anonymous users can submit with an identifier.

**Headers**:
```
Content-Type: multipart/form-data
Authorization: Bearer <access_token> (optional - not required for anonymous submissions)
```

**Form Data**:
```
audio_file: <audio_file> (required)
anonymous_name: "Participant001" (optional identifier for anonymous submissions)
recording_method: "browser" | "upload" (required)
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "recording_id": "550e8400-e29b-41d4-a716-446655440000",
    "file_name": "20251128_103045_cough.webm",
    "file_size": 245760,
    "file_size_mb": 0.23,
    "duration": 10.5,
    "file_format": "webm",
    "sample_rate": 44100,
    "bit_rate": 128000,
    "channels": 1,
    "recording_method": "browser",
    "user_display_name": "researcher01",
    "created_at": "2025-11-28T10:30:45Z",
    "uploaded_at": "2025-11-28T10:30:45Z"
  },
  "message": "Recording uploaded successfully"
}
```

### 2.2 List Recordings
**Endpoint**: `GET /recordings/list/`

**Description**: Retrieve paginated list of all recordings with filtering options.

**Query Parameters**:
```
page: 1 (pagination)
page_size: 20 (items per page)
recording_method: "browser" | "upload" (filter)
file_format: "webm" | "wav" | "mp3" (filter)
search: "search_term" (search in usernames, names, filenames)
ordering: "created_at" | "-created_at" | "duration" (sorting)
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "count": 150,
    "next": "http://localhost:8000/api/recordings/list/?page=2",
    "previous": null,
    "results": [
      {
        "recording_id": "550e8400-e29b-41d4-a716-446655440000",
        "file_name": "20251128_103045_cough.webm",
        "file_size_mb": 0.23,
        "duration": 10.5,
        "file_format": "webm",
        "recording_method": "browser",
        "user_display_name": "researcher01",
        "created_at": "2025-11-28T10:30:45Z",
        "audio_file_url": "http://localhost:8000/media/cough_recordings/20251128_103045_cough.webm"
      }
    ]
  }
}
```

### 2.3 Recording Details
**Endpoint**: `GET /recordings/detail/{recording_id}/`

**Description**: Get detailed information about a specific recording.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "recording_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_display_name": "researcher01",
    "anonymous_name": null,
    "file_name": "20251128_103045_cough.webm",
    "file_size": 245760,
    "file_size_mb": 0.23,
    "file_format": "webm",
    "duration": 10.5,
    "sample_rate": 44100,
    "bit_rate": 128000,
    "channels": 1,
    "recording_method": "browser",
    "ip_address": "192.168.1.100",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    "created_at": "2025-11-28T10:30:45Z",
    "uploaded_at": "2025-11-28T10:30:45Z",
    "audio_file_url": "http://localhost:8000/media/cough_recordings/20251128_103045_cough.webm"
  }
}
```

### 2.4 User's Recordings
**Endpoint**: `GET /recordings/my-recordings/`

**Description**: Get recordings uploaded by the authenticated user (requires authentication).

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "count": 5,
    "results": [
      {
        "recording_id": "550e8400-e29b-41d4-a716-446655440000",
        "file_name": "20251128_103045_cough.webm",
        "duration": 10.5,
        "created_at": "2025-11-28T10:30:45Z"
      }
    ]
  }
}
```

### 2.5 Delete Recording
**Endpoint**: `DELETE /recordings/delete/{recording_id}/`

**Description**: Delete a recording (only by the owner - requires authentication).

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Recording deleted successfully"
}
```

---

## 3. Statistics and Analytics

### 3.1 Platform Statistics
**Endpoint**: `GET /recordings/stats/`

**Description**: Get comprehensive platform statistics for cough audio research analysis.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "total_recordings": 150,
    "total_users": 45,
    "total_anonymous": 105,
    "total_duration": 1575.5,
    "total_size_mb": 345.67,
    "avg_duration": 10.5,
    "recordings_by_method": {
      "browser": 120,
      "upload": 30
    },
    "recordings_by_format": {
      "webm": 120,
      "wav": 20,
      "mp3": 10
    }
  }
}
```

---

## 4. Data Export Endpoints

### 4.1 CSV Export
**Endpoint**: `GET /recordings/export-csv/`

**Description**: Export all cough recording data in CSV format for statistical analysis.

**Response** (200 OK):
```
Content-Type: text/csv
Content-Disposition: attachment; filename="data_20251128_103045.csv"

Recording ID,User Type,User Name,File Name,File Size (MB),File Format,Duration (seconds),Recording Method,Created At,Uploaded At,Sample Rate,Bit Rate,Channels,IP Address,User Agent,Audio File URL
550e8400-e29b-41d4-a716-446655440000,Registered,researcher01,20251128_103045_cough.webm,0.23,webm,10.5,browser,2025-11-28 10:30:45,2025-11-28 10:30:45,44100,128000,1,192.168.1.100,Mozilla/5.0...,http://localhost:8000/media/cough_recordings/20251128_103045_cough.webm
```

### 4.2 HTML Export
**Endpoint**: `GET /recordings/export-html/`

**Description**: Export cough data as HTML with embedded audio players for review.

**Response** (200 OK):
```
Content-Type: text/html
Content-Disposition: attachment; filename="data_20251128_103045.html"

<!DOCTYPE html>
<html>
<head>
    <title>CoughTest Recordings Data</title>
    <style>/* CSS styles */</style>
</head>
<body>
    <h1>🎤 CoughTest Recordings Data</h1>
    <table>
        <!-- Table with audio players -->
    </table>
</body>
</html>
```

### 4.3 ZIP Export
**Endpoint**: `GET /recordings/export-zip/`

**Description**: Export complete cough dataset including audio files and CSV metadata.

**Response** (200 OK):
```
Content-Type: application/zip
Content-Disposition: attachment; filename="data_20251128_103045.zip"

[Binary ZIP file containing:]
├── cough_recordings_data.csv
├── README.txt
└── audio_files/
    ├── 20251128_103045_cough.webm
    ├── 20251128_103156_sample.wav
    └── ...
```

---

## 5. System Health

### 5.1 Health Check
**Endpoint**: `GET /health/`

**Description**: Check system health and availability.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-11-28T10:30:45Z",
    "version": "1.0.0",
    "database": "connected",
    "media_storage": "accessible"
  }
}
```

---

## 6. Error Responses

### 6.1 Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid file format",
    "details": {
      "field": "audio_file",
      "allowed_formats": ["wav", "mp3", "webm", "ogg", "m4a"]
    }
  },
  "timestamp": "2025-11-28T10:30:45Z"
}
```

### 6.2 HTTP Status Codes
```yaml
200 OK: Successful request
201 Created: Resource created successfully
400 Bad Request: Invalid request data
401 Unauthorized: Authentication required
403 Forbidden: Insufficient permissions
404 Not Found: Resource not found
413 Payload Too Large: File size exceeds limit
422 Unprocessable Entity: Validation error
429 Too Many Requests: Rate limit exceeded
500 Internal Server Error: Server error
```

### 6.3 Common Error Codes
```yaml
VALIDATION_ERROR: Input validation failed
FILE_TOO_LARGE: File exceeds size limit
INVALID_FORMAT: Unsupported file format
AUTHENTICATION_REQUIRED: Login required
PERMISSION_DENIED: Insufficient permissions
RESOURCE_NOT_FOUND: Requested resource not found
RATE_LIMIT_EXCEEDED: Too many requests
SERVER_ERROR: Internal server error
```

---

## 7. Rate Limiting

### 7.1 Rate Limits
```yaml
Anonymous Users: 100 requests/hour
Authenticated Users: 1000 requests/hour
File Uploads: 10 uploads/minute
Export Requests: 5 exports/hour
```

### 7.2 Rate Limit Headers
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

---

## 8. Authentication Details

### 8.1 JWT Token Structure
```yaml
Header:
  alg: HS256
  typ: JWT

Payload:
  user_id: 1
  username: "researcher01"
  exp: 1640995200
  iat: 1640991600
  token_type: "access"
```

### 8.2 Token Usage
```yaml
Access Token:
  - Lifetime: 1 hour
  - Usage: API authentication
  - Header: Authorization: Bearer <token>

Refresh Token:
  - Lifetime: 7 days
  - Usage: Token renewal
  - Rotation: New refresh token on each use
```

---

## 9. File Upload Specifications

### 9.1 Supported Formats
```yaml
Audio Formats:
  - WAV: Uncompressed, high quality
  - MP3: Compressed, widely supported
  - WebM: Modern web format with Opus codec
  - OGG: Open source format
  - M4A: Apple format, good compression

MIME Types:
  - audio/wav, audio/wave, audio/x-wav
  - audio/mpeg, audio/mp3
  - audio/webm
  - audio/ogg
  - audio/mp4, audio/m4a
```

### 9.2 File Constraints
```yaml
Size Limits:
  - Maximum: 50MB per file
  - Recommended: <10MB for optimal performance

Duration:
  - Target: 10 seconds
  - Acceptable: 8-12 seconds
  - Maximum: 60 seconds

Quality:
  - Sample Rate: 44.1kHz recommended
  - Bit Depth: 16-bit minimum
  - Channels: Mono or Stereo
```

---

## 10. Research Data Schema

### 10.1 Recording Metadata Fields
```yaml
Core Fields:
  recording_id: UUID (primary key)
  file_name: String (original filename)
  file_size: Integer (bytes)
  duration: Decimal (seconds)
  file_format: String (audio format)

User Fields:
  user_id: Integer (foreign key, nullable)
  anonymous_name: String (for anonymous users)
  user_display_name: String (computed field)

Technical Fields:
  sample_rate: Integer (Hz)
  bit_rate: Integer (bps)
  channels: Integer (1=mono, 2=stereo)
  recording_method: String (browser/upload)

System Fields:
  ip_address: String (anonymized)
  user_agent: String (browser info)
  created_at: DateTime (ISO 8601)
  uploaded_at: DateTime (ISO 8601)
```

### 10.2 Export Data Format
```yaml
CSV Export:
  - UTF-8 encoding
  - Comma-separated values
  - Header row included
  - ISO 8601 timestamps
  - Full metadata inclusion

Statistical Compatibility:
  - R data.frame ready
  - Python pandas compatible
  - SPSS importable
  - Excel readable
```

---

**API Documentation Version**: 1.0  
**Last Updated**: November 2025  
**Compliance**: OpenAPI 3.0 Specification  
**Testing**: Comprehensive test suite included
