# 🎤 CoughTest - Medical Research Data Collection Platform

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.0.1-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com/)
[![Research](https://img.shields.io/badge/Research-Academic-orange.svg)](docs/RESEARCH_METHODOLOGY.md)
[![Documentation](https://img.shields.io/badge/Docs-Complete-brightgreen.svg)](docs/DOCUMENTATION_INDEX.md)
[![License](https://img.shields.io/badge/License-Academic-yellow.svg)](LICENSE)

> **A comprehensive web-based platform for systematic cough audio data collection, designed for medical research and academic validation. This platform serves as both a functional research tool and a demonstration of full-stack software engineering principles.**

**🎓 Academic Project** | **🏥 Medical Research** | **💻 Software Engineering** | **📊 Data Science**

## 🌟 Research Platform Features

### 🔬 **Research-Focused Capabilities**
- **🎙️ Standardized Audio Collection**: 10-second browser-based cough recording with quality validation
- **📊 Comprehensive Metadata**: Technical specifications, user context, and system information
- **📤 Multi-Format Export**: CSV (statistical analysis), HTML (review), ZIP (complete dataset)
- **📈 Real-Time Analytics**: Platform statistics and data quality metrics
- **🔍 Data Validation**: Automated quality checks and research compliance

### 💻 **Technical Implementation**
- **🏗️ Full-Stack Architecture**: Django REST API + React SPA
- **🔐 Secure Authentication**: JWT-based with anonymous submission support
- **📁 Multi-Format Support**: WAV, MP3, WebM, OGG, M4A audio files
- **📱 Cross-Platform**: Responsive design for desktop and mobile
- **⚡ Performance Optimized**: Caching, pagination, and efficient data handling
- **🎵 Vibe Coding**: Developed with modern coding practices and creative problem-solving

### 🎓 **Academic Standards**
- **📋 IEEE Compliance**: Software requirements (IEEE 830-1998) and design (IEEE 1016-2009)
- **🔬 Research Methodology**: Comprehensive data collection and validation framework
- **📚 Complete Documentation**: 14 professional documents covering all aspects
- **✅ Quality Assurance**: Comprehensive testing strategy and validation procedures

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

## 📚 Comprehensive Documentation Suite

### 🎓 **Academic Documentation**
- **[📋 Software Requirements Specification](docs/SOFTWARE_REQUIREMENTS.md)** - IEEE 830-1998 compliant
- **[🏗️ System Design Document](docs/SYSTEM_DESIGN.md)** - IEEE 1016-2009 compliant  
- **[🔬 Research Methodology](docs/RESEARCH_METHODOLOGY.md)** - Academic framework and validation
- **[🔌 API Documentation](docs/API_DOCUMENTATION.md)** - Complete REST API reference

### 👥 **User & Operations**
- **[👤 User Manual](docs/USER_MANUAL.md)** - Comprehensive platform guide
- **[🚀 Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment
- **[🖥️ Windows Setup Guide](docs/WINDOWS_SETUP_GUIDE.md)** - Windows-specific setup
- **[🌐 Cross-Platform Guide](docs/CROSS_PLATFORM_GUIDE.md)** - Multi-OS compatibility

### 🔧 **Technical & Testing**
- **[✅ Testing Strategy](docs/TESTING_STRATEGY.md)** - IEEE 829-2008 compliant
- **[📊 Test Results](docs/TEST_RESULTS.md)** - Current validation status
- **[📥 Bulk Import Guide](docs/BULK_IMPORT_GUIDE.md)** - Dataset import procedures
- **[📖 Documentation Index](docs/DOCUMENTATION_INDEX.md)** - Complete navigation guide

## 🎯 Research Applications & Use Cases

### 🔬 **For Medical Researchers**
- **Data Collection**: Systematic cough audio sampling with standardized protocols
- **Statistical Analysis**: Export to R, Python, SPSS with complete metadata
- **Quality Assurance**: Automated validation and quality metrics
- **Longitudinal Studies**: Track contributions over time with comprehensive audit trails
- **Multi-Site Research**: Standardized collection across different locations

### 🎓 **For Academic Validation**
- **Thesis Research**: Complete platform demonstrating software engineering principles
- **Peer Review**: IEEE-compliant documentation ready for academic review
- **Reproducible Research**: Full methodology documentation and data export capabilities
- **Educational Resource**: Example of professional full-stack development

### 👥 **For Research Participants**
- **Easy Contribution**: Browser-based recording or file upload
- **Privacy Protection**: Anonymous participation with optional identification
- **Quality Feedback**: Real-time validation and recording quality assessment
- **Contribution Tracking**: Personal dashboard for registered users

### 💻 **For Software Engineers**
- **Architecture Reference**: Modern full-stack implementation example
- **API Integration**: RESTful API with comprehensive documentation
- **Quality Standards**: IEEE-compliant requirements and design documentation
- **Testing Framework**: Complete testing strategy and automation examples

## 🔒 Privacy & Security

- **Anonymous Options**: No personal information required
- **Secure Storage**: Audio files with unique identifiers
- **JWT Authentication**: Token-based security
- **Research Metadata**: IP/user agent for academic purposes only

## 🤝 Contributing

This platform is designed for academic medical research. Contributors help advance respiratory health research by providing cough audio samples.

## 📊 Research Data & Academic Integrity

### 🔬 **Research Dataset**
This repository contains **real research data** collected for academic validation:

```yaml
Data Components:
  Database: backend/db.sqlite3 (metadata, user data, system logs)
  Audio Files: backend/media/cough_recordings/ (actual research samples)
  Documentation: Complete methodology and validation procedures
  Export Tools: Multi-format data export for statistical analysis

Research Standards:
  Data Integrity: 100% preserved for academic validation
  Reproducibility: Complete methodology documentation
  Quality Assurance: Comprehensive validation procedures
  Ethical Compliance: Privacy protection and consent management
```

### 🎓 **Academic Contributions**
- **Software Engineering**: Demonstrates professional development practices
- **Research Methodology**: Systematic data collection and validation framework  
- **Quality Assurance**: IEEE-compliant testing and documentation standards
- **Data Science**: Complete pipeline from collection to analysis-ready export

⚠️ **Research Integrity Notice**: All data preserved for thesis validation and peer review

## 🏆 Project Achievements

### 🎓 **Academic Excellence**
```yaml
Standards Compliance:
  ✅ IEEE 830-1998 (Software Requirements Specification)
  ✅ IEEE 1016-2009 (Software Design Descriptions)  
  ✅ IEEE 829-2008 (Software Test Documentation)
  ✅ Academic research methodology standards

Documentation Quality:
  ✅ 14 comprehensive documents (3,200+ lines)
  ✅ Multi-audience approach (engineers, researchers, users)
  ✅ Complete technical specifications
  ✅ Research validation procedures
```

### 💻 **Technical Excellence**
```yaml
Software Quality:
  ✅ Full-stack web application (Django + React)
  ✅ RESTful API with comprehensive documentation
  ✅ Responsive design with cross-platform support
  ✅ Comprehensive testing strategy and validation
  ✅ Vibe coding approach with modern development practices

Research Features:
  ✅ Standardized data collection protocols
  ✅ Multi-format export capabilities (CSV, HTML, ZIP)
  ✅ Real-time analytics and quality metrics
  ✅ Bulk import tools for existing datasets
```

## 📞 Contact & Support

### 🎓 **Academic Inquiries**
- **Research Methodology**: See [Research Methodology](docs/RESEARCH_METHODOLOGY.md)
- **Technical Implementation**: See [System Design](docs/SYSTEM_DESIGN.md)
- **Documentation Suite**: See [Documentation Index](docs/DOCUMENTATION_INDEX.md)

### 💻 **Technical Support**
- **Setup Issues**: See [Windows Setup Guide](docs/WINDOWS_SETUP_GUIDE.md) or [Cross-Platform Guide](docs/CROSS_PLATFORM_GUIDE.md)
- **API Integration**: See [API Documentation](docs/API_DOCUMENTATION.md)
- **Testing & Validation**: See [Testing Strategy](docs/TESTING_STRATEGY.md)

## 📄 License

**Academic Research License** - Created for thesis research and medical data collection purposes.

---

<div align="center">

**🎓 Academic Research Project | 🏥 Medical Data Collection | 💻 Software Engineering Excellence**

*Built for advancing medical research in respiratory health analysis*

[![Research](https://img.shields.io/badge/Research-Validated-success.svg)](docs/RESEARCH_METHODOLOGY.md)
[![Documentation](https://img.shields.io/badge/Documentation-IEEE_Compliant-blue.svg)](docs/DOCUMENTATION_INDEX.md)
[![Quality](https://img.shields.io/badge/Quality-Professional-brightgreen.svg)](docs/TESTING_STRATEGY.md)

</div>