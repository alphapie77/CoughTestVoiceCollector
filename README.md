# 🎤 CoughTest - Medical Research Platform

A comprehensive fullstack application for collecting cough audio data for medical research purposes. Built with Django REST Framework backend and React frontend.

## 🌟 Features

### Core Functionality
- **Audio Recording**: 10-second browser-based cough recording
- **File Upload**: Support for WAV, MP3, WebM audio files
- **User Management**: Both authenticated users and anonymous submissions
- **Data Export**: CSV export with comprehensive metadata for thesis research
- **Real-time Statistics**: Platform analytics and user dashboards

### Technical Features
- **Backend**: Django 5.0.1 + REST Framework
- **Frontend**: React 18 + Bootstrap 5
- **Database**: SQLite with comprehensive metadata storage
- **Authentication**: JWT token-based authentication
- **Audio Processing**: Metadata extraction using Mutagen
- **Professional UI**: Bootstrap-based responsive design

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

**Access URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin

## 📊 Data Collection

### Metadata Collected
- **Audio Technical**: Duration, sample rate, bit rate, channels, file size
- **User Information**: Username or anonymous identifier
- **Recording Details**: Method (browser/upload), timestamp, file format
- **System Information**: IP address, user agent (for research purposes)

### CSV Export Format
The system exports data in CSV format with the following columns:
- Recording ID, User Type, User Name, File Name, File Size (MB)
- File Format, Duration (seconds), Recording Method, Created At, Uploaded At
- Sample Rate, Bit Rate, Channels, IP Address, User Agent

## 🏗️ Project Structure

```
CoughTest/
├── backend/                 # Django REST API
│   ├── coughtest_backend/   # Main Django project
│   ├── recordings/          # Recording management app
│   ├── accounts/            # User authentication app
│   ├── media/               # Uploaded audio files
│   └── requirements.txt     # Python dependencies
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   └── package.json         # Node.js dependencies
└── README.md               # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile

### Recordings
- `POST /api/recordings/upload/` - Upload cough recording
- `GET /api/recordings/list/` - List all recordings (with filters)
- `GET /api/recordings/detail/<id>/` - Get recording details
- `GET /api/recordings/my-recordings/` - Get user's recordings
- `GET /api/recordings/stats/` - Get platform statistics
- `GET /api/recordings/export-csv/` - Export data to CSV (admin only)
- `DELETE /api/recordings/delete/<id>/` - Delete user's recording

## 🎯 Usage Scenarios

### For Researchers
1. **Data Collection**: Collect cough audio samples with comprehensive metadata
2. **Export Data**: Download CSV files with all recording information
3. **Analytics**: View platform statistics and user engagement metrics

### For Contributors
1. **Anonymous Participation**: Submit recordings without creating an account
2. **User Accounts**: Track personal contributions and manage recordings
3. **Multiple Methods**: Record directly in browser or upload existing files

## 🔒 Privacy & Security

- **Anonymous Options**: Users can contribute without personal information
- **Secure Storage**: Audio files stored securely with unique identifiers
- **JWT Authentication**: Secure token-based authentication system
- **Data Protection**: IP addresses and user agents collected only for research metadata

## 🛠️ Development

### Backend Development
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend Development
```bash
cd frontend
npm start
```

### Creating Superuser
```bash
cd backend
python manage.py createsuperuser
```

## 📈 Thesis Research Features

- **Comprehensive Metadata**: All necessary data points for academic research
- **CSV Export**: Ready-to-use format for statistical analysis
- **User Classification**: Registered vs anonymous user tracking
- **Technical Audio Data**: Sample rates, bit rates, and audio characteristics
- **Temporal Analysis**: Creation and upload timestamps for time-series analysis

## 🤝 Contributing

This platform is designed for medical research data collection. Contributors help advance respiratory health research by providing cough audio samples.

## 📄 License

This project is created for academic research purposes.

---

**Built with ❤️ for medical research advancement**