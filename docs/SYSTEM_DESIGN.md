# System Design Document
## CoughTest - Cough Audio Research Data Collection Platform

### Document Information
- **Version**: 1.0
- **Date**: November 2025
- **Architecture**: Full-Stack Web Application
- **Purpose**: Research data collection system design

---

## 1. System Overview

### 1.1 Architecture Pattern
**Three-Tier Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Presentation   │    │   Application   │    │      Data       │
│     Layer       │◄──►│     Layer       │◄──►│     Layer       │
│   (React SPA)   │    │  (Django API)   │    │   (SQLite DB)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2 Technology Stack
```yaml
Frontend:
  - React 19.2.0 (UI Framework)
  - Bootstrap 5.3.8 (CSS Framework)
  - Axios (HTTP Client)
  - Web Audio API (Recording)

Backend:
  - Django 5.0.1 (Web Framework)
  - Django REST Framework (API)
  - SQLite (Database)
  - JWT Authentication

Infrastructure:
  - Node.js (Frontend Build)
  - Python 3.9+ (Backend Runtime)
  - Local File System (Media Storage)
```

---

## 2. System Architecture

### 2.1 High-Level Architecture
```
Internet
    │
    ▼
┌─────────────────────────────────────────────────────────────┐
│                    Load Balancer                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
    ┌─────────────────┼─────────────────┐
    │                 │                 │
    ▼                 ▼                 ▼
┌─────────┐    ┌─────────────┐    ┌─────────────┐
│Frontend │    │   Backend   │    │   Media     │
│ Server  │    │   API       │    │  Storage    │
│(React)  │    │ (Django)    │    │ (Files)     │
└─────────┘    └─────────────┘    └─────────────┘
                      │
                      ▼
               ┌─────────────┐
               │  Database   │
               │  (SQLite)   │
               └─────────────┘
```

### 2.2 Component Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
├─────────────────────────────────────────────────────────────┤
│  Components/     │  Pages/        │  Services/    │ Utils/  │
│  - Navbar        │  - Home        │  - API        │ - Validators│
│  - Footer        │  - Record      │  - Auth       │ - Helpers   │
│  - ErrorBoundary │  - Browse      │               │ - Constants │
│                  │  - Statistics  │               │             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Django)                         │
├─────────────────────────────────────────────────────────────┤
│  Apps/           │  Core/         │  Models/      │ Views/  │
│  - accounts/     │  - middleware  │  - User       │ - API   │
│  - recordings/   │  - validators  │  - Recording  │ - Auth  │
│  - core/         │  - utils       │  - UserAction │ - Export│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ ORM
┌─────────────────────────────────────────────────────────────┐
│                    Database (SQLite)                        │
├─────────────────────────────────────────────────────────────┤
│  Tables:                                                    │
│  - auth_user                                               │
│  - recordings_coughrecording                               │
│  - core_useraction                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Database Design

### 3.1 Entity Relationship Diagram
```
┌─────────────────┐         ┌─────────────────────────────────┐
│      User       │         │        CoughRecording           │
├─────────────────┤    1:N  ├─────────────────────────────────┤
│ id (PK)         │◄────────┤ recording_id (PK, UUID)         │
│ username        │         │ user_id (FK, nullable)          │
│ email           │         │ anonymous_name                  │
│ password        │         │ audio_file                      │
│ first_name      │         │ file_name                       │
│ last_name       │         │ file_size                       │
│ date_joined     │         │ file_format                     │
│ is_active       │         │ duration                        │
└─────────────────┘         │ sample_rate                     │
                            │ bit_rate                        │
                            │ channels                        │
                            │ recording_method                │
                            │ ip_address                      │
                            │ user_agent                      │
                            │ created_at                      │
                            │ uploaded_at                     │
                            └─────────────────────────────────┘
                                          │
                                          │ 1:N
                                          ▼
                            ┌─────────────────────────────────┐
                            │         UserAction              │
                            ├─────────────────────────────────┤
                            │ id (PK)                         │
                            │ user_id (FK, nullable)          │
                            │ action                          │
                            │ details (JSON)                  │
                            │ ip_address                      │
                            │ user_agent                      │
                            │ timestamp                       │
                            └─────────────────────────────────┘
```

### 3.2 Database Schema
```sql
-- User table (Django built-in)
CREATE TABLE auth_user (
    id INTEGER PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(254),
    password VARCHAR(128) NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    date_joined DATETIME NOT NULL,
    is_active BOOLEAN NOT NULL
);

-- Cough Recording table
CREATE TABLE recordings_coughrecording (
    recording_id UUID PRIMARY KEY,
    user_id INTEGER REFERENCES auth_user(id),
    anonymous_name VARCHAR(100),
    audio_file VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER NOT NULL,
    file_format VARCHAR(10) NOT NULL,
    duration DECIMAL(5,2),
    sample_rate INTEGER,
    bit_rate INTEGER,
    channels INTEGER,
    recording_method VARCHAR(20) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at DATETIME NOT NULL,
    uploaded_at DATETIME NOT NULL
);

-- User Action table (Audit Trail)
CREATE TABLE core_useraction (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES auth_user(id),
    action VARCHAR(50) NOT NULL,
    details JSON,
    ip_address INET,
    user_agent TEXT,
    timestamp DATETIME NOT NULL
);
```

---

## 4. API Design

### 4.1 REST API Endpoints
```yaml
Authentication:
  POST /api/auth/register/     # User registration
  POST /api/auth/login/        # User login
  POST /api/auth/logout/       # User logout
  GET  /api/auth/profile/      # Get user profile
  PATCH /api/auth/profile/     # Update profile

Recordings:
  POST /api/recordings/upload/           # Upload recording
  GET  /api/recordings/list/             # List all recordings
  GET  /api/recordings/detail/{id}/      # Get recording details
  GET  /api/recordings/my-recordings/    # User's recordings
  GET  /api/recordings/stats/            # Statistics
  DELETE /api/recordings/delete/{id}/    # Delete recording

Data Export:
  GET  /api/recordings/export-csv/       # Export CSV
  GET  /api/recordings/export-html/      # Export HTML
  GET  /api/recordings/export-zip/       # Export ZIP

System:
  GET  /api/health/                      # Health check
```

### 4.2 API Response Format
```json
{
  "success": true,
  "data": {
    "recording_id": "uuid",
    "file_name": "cough_sample.webm",
    "duration": 10.5,
    "created_at": "2025-11-28T10:30:00Z"
  },
  "message": "Recording uploaded successfully",
  "timestamp": "2025-11-28T10:30:00Z"
}
```

---

## 5. Security Architecture

### 5.1 Authentication Flow
```
Client                    Backend                   Database
  │                         │                         │
  ├─ POST /auth/login/ ────►│                         │
  │                         ├─ Validate credentials ─►│
  │                         │◄─ User data ────────────┤
  │◄─ JWT tokens ───────────┤                         │
  │                         │                         │
  ├─ API Request + JWT ────►│                         │
  │                         ├─ Verify JWT ────────────┤
  │                         ├─ Process request ──────►│
  │◄─ Response ─────────────┤◄─ Data ─────────────────┤
```

### 5.2 Security Measures
```yaml
Authentication:
  - JWT tokens with expiration
  - Refresh token rotation
  - Password hashing (Django default)

Authorization:
  - Role-based permissions
  - Resource-level access control
  - Anonymous submission support

Data Protection:
  - Input validation and sanitization
  - File type and size restrictions
  - SQL injection prevention (ORM)
  - XSS protection (React)

Network Security:
  - CORS configuration
  - HTTPS enforcement (production)
  - Rate limiting
  - Request logging
```

---

## 6. File Storage Architecture

### 6.1 Media Storage Structure
```
media/
└── cough_recordings/
    ├── 20251128_103045_sample1.webm
    ├── 20251128_103156_sample2.webm
    ├── uuid-generated-filename.webm
    └── ...
```

### 6.2 File Processing Pipeline
```
Upload Request
      │
      ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Validate   │───►│   Extract   │───►│    Store    │
│   Format    │    │  Metadata   │    │   & Save    │
└─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │
      ▼                    ▼                    ▼
  File Type           Audio Properties      Database
  Size Check          Duration, Sample      Record
  Security Scan       Rate, Bit Rate       Creation
```

---

## 7. Performance Considerations

### 7.1 Optimization Strategies
```yaml
Frontend:
  - Component lazy loading
  - API request caching
  - Debounced search inputs
  - Optimized bundle size

Backend:
  - Database query optimization
  - Response caching (statistics)
  - Pagination for large datasets
  - Async file processing

Database:
  - Indexed columns for queries
  - Connection pooling
  - Query result caching
```

### 7.2 Scalability Design
```yaml
Horizontal Scaling:
  - Stateless API design
  - Load balancer ready
  - Database replication support

Vertical Scaling:
  - Efficient memory usage
  - CPU optimization
  - Storage optimization
```

---

## 8. Monitoring and Logging

### 8.1 Logging Architecture
```yaml
Application Logs:
  - Request/Response logging
  - Error tracking
  - User action audit trail
  - Performance metrics

Research Logs:
  - Data collection events
  - Export activities
  - User interactions
  - System health checks
```

### 8.2 Monitoring Points
```yaml
System Metrics:
  - API response times
  - Database query performance
  - File upload success rates
  - User session analytics

Research Metrics:
  - Recording submission rates
  - Data quality metrics
  - Export usage statistics
  - User engagement patterns
```

---

## 9. Deployment Architecture

### 9.1 Development Environment
```
Developer Machine
├── Frontend (localhost:3000)
├── Backend (localhost:8000)
├── Database (SQLite file)
└── Media Storage (local files)
```

### 9.2 Production Environment
```
Production Server
├── Web Server (Nginx)
├── Application Server (Gunicorn)
├── Database (PostgreSQL)
├── Media Storage (Cloud/NFS)
└── SSL Certificate (HTTPS)
```

---

**Document Prepared For**: Software Engineering and System Architecture Documentation
**Compliance**: IEEE 1016-2009 Standard for Software Design Descriptions
