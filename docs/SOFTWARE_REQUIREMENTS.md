# Software Requirements Specification (SRS)
## CoughTest - Medical Research Data Collection Platform

### Document Information
- **Version**: 1.0
- **Date**: November 2024
- **Project**: CoughTest Research Platform
- **Purpose**: Medical research data collection for thesis

---

## 1. Introduction

### 1.1 Purpose
This document specifies the software requirements for CoughTest, a web-based platform designed to collect cough audio samples for medical research and thesis purposes.

### 1.2 Scope
The system enables researchers to:
- Collect cough audio recordings from participants
- Store comprehensive metadata for research analysis
- Export data in multiple formats for statistical analysis
- Maintain data integrity for academic validation

### 1.3 Definitions and Acronyms
- **API**: Application Programming Interface
- **CSV**: Comma-Separated Values
- **JWT**: JSON Web Token
- **REST**: Representational State Transfer
- **SPA**: Single Page Application

---

## 2. Overall Description

### 2.1 Product Perspective
CoughTest is a standalone web application consisting of:
- **Frontend**: React-based user interface
- **Backend**: Django REST API
- **Database**: SQLite for research data storage
- **Media Storage**: Local file system for audio files

### 2.2 Product Functions
1. **Audio Recording**: Browser-based 10-second cough recording
2. **File Upload**: Support for multiple audio formats
3. **Data Management**: User accounts and anonymous submissions
4. **Research Analytics**: Real-time statistics and visualizations
5. **Data Export**: CSV, HTML, and ZIP export capabilities
6. **Bulk Import**: Command-line tools for existing datasets

### 2.3 User Classes
- **Researchers**: Data collection and analysis
- **Participants**: Audio submission (registered/anonymous)
- **Administrators**: System management and maintenance

---

## 3. Functional Requirements

### 3.1 Audio Recording System
**FR-001**: The system shall allow users to record 10-second cough samples using browser microphone
**FR-002**: The system shall support WebM audio format with Opus codec
**FR-003**: The system shall validate recording duration and quality

### 3.2 File Upload System
**FR-004**: The system shall accept WAV, MP3, WebM, OGG, M4A audio formats
**FR-005**: The system shall enforce maximum file size of 50MB
**FR-006**: The system shall extract audio metadata automatically

### 3.3 User Management
**FR-007**: The system shall support user registration and authentication
**FR-008**: The system shall allow anonymous submissions with identifier
**FR-009**: The system shall implement JWT-based session management

### 3.4 Data Collection
**FR-010**: The system shall capture comprehensive metadata:
- Audio technical specifications (duration, sample rate, bit rate)
- User information (username or anonymous ID)
- System information (IP address, user agent)
- Timestamps (creation, upload)

### 3.5 Research Analytics
**FR-011**: The system shall provide real-time statistics dashboard
**FR-012**: The system shall display recording counts by method and format
**FR-013**: The system shall calculate aggregate statistics (total duration, file sizes)

### 3.6 Data Export
**FR-014**: The system shall export data in CSV format for statistical analysis
**FR-015**: The system shall generate HTML reports with embedded audio players
**FR-016**: The system shall create ZIP packages with audio files and metadata

---

## 4. Non-Functional Requirements

### 4.1 Performance
**NFR-001**: The system shall handle concurrent uploads from 50 users
**NFR-002**: Audio recording shall have <100ms latency
**NFR-003**: Statistics shall load within 2 seconds

### 4.2 Security
**NFR-004**: All API endpoints shall implement proper authentication
**NFR-005**: File uploads shall be validated for security threats
**NFR-006**: User data shall be protected with encryption

### 4.3 Reliability
**NFR-007**: The system shall maintain 99% uptime during research periods
**NFR-008**: Data integrity shall be preserved with backup mechanisms
**NFR-009**: Error handling shall provide meaningful feedback

### 4.4 Usability
**NFR-010**: The interface shall be responsive across devices
**NFR-011**: Recording process shall be completed in <3 clicks
**NFR-012**: Export functions shall be accessible to non-technical users

### 4.5 Compatibility
**NFR-013**: The system shall support modern browsers (Chrome, Firefox, Safari, Edge)
**NFR-014**: The platform shall be cross-platform (Windows, macOS, Linux)
**NFR-015**: Audio playback shall work on mobile devices

---

## 5. System Architecture

### 5.1 Technology Stack
- **Frontend**: React 19.2.0, Bootstrap 5.3.8
- **Backend**: Django 5.0.1, Django REST Framework
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: JWT tokens
- **File Storage**: Local filesystem with media handling

### 5.2 API Design
- RESTful architecture with JSON responses
- Standardized error handling and status codes
- Comprehensive logging for research audit trails

---

## 6. Data Requirements

### 6.1 Data Models
1. **User**: Authentication and profile information
2. **CoughRecording**: Audio files with comprehensive metadata
3. **UserAction**: Audit trail for research validation

### 6.2 Data Retention
- Research data shall be preserved for academic validation
- Audio files shall be stored with unique identifiers
- Metadata shall be exportable for thesis analysis

---

## 7. Research Compliance

### 7.1 Academic Standards
- Data collection follows ethical research guidelines
- Participant privacy protection with anonymous options
- Comprehensive audit trails for research validation

### 7.2 Data Export Requirements
- CSV format compatible with statistical software (R, SPSS, Python)
- Metadata includes all technical specifications for analysis
- Batch export capabilities for large datasets

---

## 8. Acceptance Criteria

### 8.1 Functional Testing
- All recording and upload functions work across browsers
- Statistics accurately reflect database contents
- Export functions generate valid, complete datasets

### 8.2 Research Validation
- Data integrity maintained throughout collection process
- Metadata completeness verified for thesis requirements
- Export formats validated with statistical software

---

**Document Prepared For**: Academic Research and Software Engineering Documentation
**Compliance**: IEEE 830-1998 Standard for Software Requirements Specifications