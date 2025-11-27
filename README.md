# 🎤 CoughTest - Medical Research Platform

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.0.1-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-Academic-yellow.svg)](LICENSE)

A professional fullstack web application for collecting cough audio data for medical research and thesis purposes. Built with Django REST Framework backend and React frontend.

## 🌟 Key Features

- **🎙️ Audio Recording**: 10-second browser-based cough recording
- **📁 File Upload**: Support for WAV, MP3, WebM audio formats
- **👤 User Management**: JWT authentication + anonymous submissions
- **📊 Research Analytics**: Real-time statistics and data visualization
- **📥 Bulk Import**: Command-line tool for existing datasets
- **📤 CSV Export**: Thesis-ready data export with comprehensive metadata
- **🎵 Audio Playback**: Built-in audio player for recorded samples
- **📱 Responsive Design**: Professional Bootstrap UI for all devices

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Git

### Installation

**Windows:**
```cmd
git clone <repository-url>
cd CoughTest
scripts\setup.bat
scripts\start_servers.bat
```

**macOS/Linux:**
```bash
git clone <repository-url>
cd CoughTest
chmod +x scripts/*.sh
./scripts/setup.sh
./scripts/start_servers.sh
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin (admin/admin123)

## 📊 Research Data Collection

### Metadata Collected
- **Audio Technical**: Duration, sample rate, bit rate, channels, file size
- **User Information**: Username or anonymous identifier
- **Recording Details**: Method (browser/upload), timestamp, file format
- **System Information**: IP address, user agent (for research purposes)

### CSV Export Format
```csv
Recording ID, User Type, User Name, File Name, File Size (MB),
File Format, Duration (seconds), Recording Method, Created At,
Sample Rate, Bit Rate, Channels, IP Address, User Agent
```

## 🏗️ Project Structure

```
CoughTest/
├── 📁 backend/              # Django REST API
│   ├── accounts/            # User authentication
│   ├── recordings/          # Audio recording management
│   ├── coughtest_backend/   # Django project settings
│   └── requirements.txt     # Python dependencies
├── 📁 frontend/             # React application
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   └── services/        # API communication
│   └── package.json         # Node.js dependencies
├── 📁 scripts/              # Automation scripts
│   ├── setup.bat/.sh        # Project setup
│   ├── start_servers.bat/.sh # Development servers
│   └── build_production.bat # Production build
├── 📁 docs/                 # Documentation
└── README.md               # This file
```

## 🔧 Available Scripts

| Script | Windows | macOS/Linux | Description |
|--------|---------|-------------|-------------|
| Setup | `scripts\setup.bat` | `./scripts/setup.sh` | Install dependencies, create admin user |
| Start | `scripts\start_servers.bat` | `./scripts/start_servers.sh` | Run development servers |
| Build | `scripts\build_production.bat` | Manual commands | Build for production |
| Test | `scripts\test_application.bat` | Manual commands | Test application |

## 📥 Bulk Data Import

Import existing cough audio datasets:

```bash
cd backend
python manage.py import_cough_data "path/to/audio/files" --anonymous-prefix "Study2024"
```

**Supported formats**: WAV, MP3, WebM, M4A, OGG

## 🌐 Cross-Platform Compatibility

- **✅ Website**: Works on all modern browsers and devices
- **✅ Development**: Windows, macOS, Linux support
- **✅ Database**: SQLite (included) or PostgreSQL/MySQL
- **✅ Deployment**: Cloud platforms, self-hosted, Docker

## 📚 Documentation

- **[Bulk Import Guide](docs/BULK_IMPORT_GUIDE.md)** - Import existing datasets
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment
- **[Cross-Platform Guide](docs/CROSS_PLATFORM_GUIDE.md)** - OS compatibility
- **[Windows Setup](docs/WINDOWS_SETUP_GUIDE.md)** - Windows-specific instructions
- **[Test Results](docs/TEST_RESULTS.md)** - Application test status

## 🎯 Use Cases

### For Researchers
- Collect cough audio samples with comprehensive metadata
- Export data in CSV format for statistical analysis
- View platform analytics and user engagement metrics
- Import existing datasets for analysis

### For Contributors
- Submit recordings anonymously or with user accounts
- Record directly in browser or upload existing files
- Track personal contributions via dashboard
- Play back recorded audio samples

## 🔒 Privacy & Security

- **Anonymous Options**: No personal information required
- **Secure Storage**: Audio files with unique identifiers
- **JWT Authentication**: Token-based security
- **Research Metadata**: IP/user agent for academic purposes only

## 🤝 Contributing

This platform is designed for academic medical research. Contributors help advance respiratory health research by providing cough audio samples.

## 📊 Research Data

This repository contains real research data collected for thesis purposes:

- **Database**: `backend/db.sqlite3` - Contains all recording metadata and user data
- **Audio Files**: `backend/media/cough_recordings/` - Actual cough audio samples
- **Research Purpose**: Data included for reproducibility and academic validation
- **Export Tools**: Built-in CSV/HTML/ZIP export for thesis analysis

⚠️ **Important**: This data is preserved for research integrity and thesis validation.

## 📄 License

Academic Research License - Created for thesis and medical research purposes.

---

**Built for advancing medical research in respiratory health analysis** 🏥