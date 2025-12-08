# CoughTest: Academic Audio Research Platform

[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.0.1-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple.svg)](https://getbootstrap.com/)
[![IEEE](https://img.shields.io/badge/IEEE-Compliant-orange.svg)](docs/DOCUMENTATION_INDEX.md)
[![License](https://img.shields.io/badge/License-Academic-yellow.svg)](LICENSE)

## Overview

CoughTest is an enterprise-grade web application designed for systematic collection and analysis of cough audio data in academic research environments. The platform implements IEEE-compliant software engineering standards while providing researchers with robust tools for audio data acquisition, validation, and export.

**Key Domains:** Academic Research • Audio Data Collection • Software Engineering • Data Science

## Core Capabilities

### Research Features
- **Standardized Data Collection**: Browser-based 10-second audio recording with automated quality validation
- **Comprehensive Metadata Capture**: Technical specifications, user context, and system information for each recording
- **Multi-Format Export**: CSV for statistical analysis, HTML for review, ZIP for complete datasets
- **Real-Time Analytics**: Platform statistics, data quality metrics, and usage patterns
- **Automated Validation**: Quality checks ensuring research compliance and data integrity

### Technical Architecture
- **Full-Stack Implementation**: Django REST API backend with React single-page application frontend
- **Flexible Authentication**: JWT-based user accounts with support for anonymous submissions
- **Audio Format Support**: WAV, MP3, WebM, OGG, M4A file processing and storage
- **Responsive Design**: Cross-platform compatibility for desktop and mobile devices
- **Performance Optimization**: Caching strategies, pagination, and efficient data handling
- **Modern Development Practices**: Clean architecture, modular design, and comprehensive error handling

### Academic Compliance
- **IEEE Standards**: Full compliance with IEEE 830-1998 (Requirements), IEEE 1016-2009 (Design), and IEEE 829-2008 (Testing)
- **Research Methodology**: Systematic data collection framework with validation procedures
- **Professional Documentation**: 14 comprehensive documents covering all system aspects
- **Quality Assurance**: Complete testing strategy with validation and verification procedures

## Getting Started

### System Requirements
- Python 3.9 or higher
- Node.js 18.0 or higher
- Git version control
- 2GB available disk space
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Instructions

**Windows:**
```cmd
git clone https://github.com/alphapie77/CoughTestVoiceCollector.git
cd CoughTestVoiceCollector
scripts\setup.bat
scripts\start_servers.bat
```

**macOS/Linux:**
```bash
git clone https://github.com/alphapie77/CoughTestVoiceCollector.git
cd CoughTestVoiceCollector
chmod +x scripts/*.sh
./scripts/setup.sh
./scripts/start_servers.sh
```

### Application Access
- **Frontend Application**: http://localhost:3000
- **REST API Endpoint**: http://localhost:8000/api
- **Administrative Panel**: http://localhost:8000/admin
  - Default credentials: `admin` / `admin123` (change in production)

## Data Collection Framework

### Metadata Schema
Each recording captures comprehensive metadata for research analysis:

- **Audio Technical Specifications**: Duration, sample rate, bit rate, channel configuration, file size
- **User Attribution**: Authenticated username or anonymous identifier
- **Recording Context**: Collection method (browser/upload), timestamp, file format
- **System Telemetry**: IP address, user agent (for research purposes only)

### Export Data Structure
CSV exports include the following fields for statistical analysis:
```
Recording ID, User Type, User Name, File Name, File Size (MB),
File Format, Duration (seconds), Recording Method, Created At,
Sample Rate, Bit Rate, Channels, IP Address, User Agent
```

## Project Architecture

```
CoughTestVoiceCollector/
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

## Development Scripts

| Script | Windows | macOS/Linux | Description |
|--------|---------|-------------|-------------|
| Setup | `scripts\setup.bat` | `./scripts/setup.sh` | Install dependencies, create admin user |
| Start | `scripts\start_servers.bat` | `./scripts/start_servers.sh` | Run development servers |
| Build | `scripts\build_production.bat` | Manual commands | Build for production |
| Test | `scripts\test_application.bat` | Manual commands | Test application |

## Bulk Data Import

The platform supports importing existing audio datasets through a Django management command:

```bash
cd backend
python manage.py import_cough_data "path/to/audio/files" --anonymous-prefix "Study2024"
```

**Supported Audio Formats**: WAV, MP3, WebM, M4A, OGG

Refer to the [Bulk Import Guide](docs/BULK_IMPORT_GUIDE.md) for detailed instructions and best practices.

## Platform Compatibility

- **Web Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Operating Systems**: Windows 10/11, macOS 10.15+, Linux (Ubuntu 20.04+)
- **Database Systems**: SQLite (development), PostgreSQL, MySQL (production)
- **Deployment Options**: AWS, Azure, Google Cloud, self-hosted servers, Docker containers

## Documentation

Comprehensive documentation suite covering all aspects of the platform:

### Academic & Technical Standards
- [Software Requirements Specification](docs/SOFTWARE_REQUIREMENTS.md) - IEEE 830-1998 compliant
- [System Design Document](docs/SYSTEM_DESIGN.md) - IEEE 1016-2009 compliant  
- [Research Methodology](docs/RESEARCH_METHODOLOGY.md) - Academic framework and validation procedures
- [API Documentation](docs/API_DOCUMENTATION.md) - Complete REST API reference

### User & Operations Guides
- [User Manual](docs/USER_MANUAL.md) - Comprehensive platform usage guide
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) - Production deployment procedures
- [Windows Setup Guide](docs/WINDOWS_SETUP_GUIDE.md) - Windows-specific installation
- [Cross-Platform Guide](docs/CROSS_PLATFORM_GUIDE.md) - Multi-OS compatibility information

### Testing & Quality Assurance
- [Testing Strategy](docs/TESTING_STRATEGY.md) - IEEE 829-2008 compliant test documentation
- [Test Results](docs/TEST_RESULTS.md) - Current validation and verification status
- [Bulk Import Guide](docs/BULK_IMPORT_GUIDE.md) - Dataset import procedures
- [Documentation Index](docs/DOCUMENTATION_INDEX.md) - Complete documentation navigation

## Use Cases

### Research Applications
- **Data Collection**: Systematic audio sampling with standardized protocols and quality controls
- **Statistical Analysis**: Export capabilities for R, Python, SPSS, and other analysis tools
- **Quality Assurance**: Automated validation ensuring data integrity and research compliance
- **Longitudinal Studies**: Comprehensive audit trails for tracking contributions over time
- **Multi-Site Research**: Standardized collection protocols across distributed research locations

### Academic Validation
- **Thesis Research**: Complete platform demonstrating professional software engineering principles
- **Peer Review**: IEEE-compliant documentation suitable for academic review and publication
- **Reproducible Research**: Full methodology documentation enabling research replication
- **Educational Resource**: Reference implementation of modern full-stack development practices

### Participant Experience
- **Streamlined Contribution**: Browser-based recording or file upload with minimal friction
- **Flexible Authentication**: Optional user accounts with JWT security or anonymous submission
- **Quality Feedback**: Real-time validation and recording quality assessment
- **Contribution Tracking**: Personal dashboard for registered users to monitor their submissions

### Technical Integration
- **Architecture Reference**: Modern full-stack implementation with clean separation of concerns
- **API Integration**: RESTful API with comprehensive documentation and examples
- **Quality Standards**: IEEE-compliant requirements, design, and testing documentation
- **Testing Framework**: Complete testing strategy with unit, integration, and system tests

## Security & Privacy

- **Anonymous Submissions**: Platform supports data collection without personal information requirements
- **Secure Storage**: Audio files stored with UUID identifiers, isolated from user data
- **JWT Authentication**: Industry-standard token-based authentication for registered users
- **Research Metadata**: IP addresses and user agents collected solely for academic research purposes
- **Data Protection**: Compliance with research ethics and data protection best practices

## Contributing

This platform serves as an academic research tool for cough audio analysis. Contributions in the form of audio samples help advance scientific research and machine learning applications in audio analysis.

For technical contributions, please refer to the [System Design Document](docs/SYSTEM_DESIGN.md) and [Testing Strategy](docs/TESTING_STRATEGY.md).

## Research Data & Academic Integrity

### Dataset Information
This repository contains authentic research data collected for academic validation purposes:

**Data Components:**
- Database: `backend/db.sqlite3` (metadata, user information, system logs)
- Audio Files: `backend/media/cough_recordings/` (research audio samples)
- Documentation: Complete methodology and validation procedures
- Export Tools: Multi-format data export capabilities for statistical analysis

**Research Standards:**
- Data Integrity: Complete preservation for academic validation and peer review
- Reproducibility: Comprehensive methodology documentation enabling research replication
- Quality Assurance: Systematic validation procedures ensuring data reliability
- Ethical Compliance: Privacy protection and informed consent management

### Academic Contributions
- **Software Engineering**: Professional development practices and architectural patterns
- **Research Methodology**: Systematic data collection and validation framework
- **Quality Assurance**: IEEE-compliant testing and documentation standards
- **Data Science**: End-to-end pipeline from collection to analysis-ready export

**Research Integrity Notice**: All data is preserved in its original form for academic validation, peer review, and reproducibility verification.

## Technical Specifications

### Standards Compliance
- IEEE 830-1998: Software Requirements Specification
- IEEE 1016-2009: Software Design Descriptions
- IEEE 829-2008: Software Test Documentation
- Academic research methodology standards

### Documentation Metrics
- 14 comprehensive technical documents
- 3,200+ lines of professional documentation
- Multi-audience approach (engineers, researchers, end-users)
- Complete technical specifications and validation procedures

### Software Quality Attributes
- Full-stack web application architecture (Django REST + React SPA)
- RESTful API with comprehensive endpoint documentation
- Responsive design with cross-platform browser support
- Comprehensive testing strategy with automated validation
- Modern development practices and clean code architecture

### Research Capabilities
- Standardized data collection protocols with quality validation
- Multi-format export (CSV, HTML, ZIP) for various analysis tools
- Real-time analytics dashboard with quality metrics
- Bulk import utilities for existing audio datasets
- Automated metadata extraction and validation

## Support & Resources

### Academic Inquiries
- Research Methodology: [Research Methodology Document](docs/RESEARCH_METHODOLOGY.md)
- Technical Implementation: [System Design Document](docs/SYSTEM_DESIGN.md)
- Complete Documentation: [Documentation Index](docs/DOCUMENTATION_INDEX.md)

### Technical Support
- Installation Issues: [Windows Setup Guide](docs/WINDOWS_SETUP_GUIDE.md) | [Cross-Platform Guide](docs/CROSS_PLATFORM_GUIDE.md)
- API Integration: [API Documentation](docs/API_DOCUMENTATION.md)
- Testing & Validation: [Testing Strategy](docs/TESTING_STRATEGY.md)

## License

This software is released under an Academic Research License. The platform was developed for thesis research and audio data collection purposes. See [LICENSE](LICENSE) for complete terms and conditions.

---

<div align="center">

### Academic Research Platform for Cough Audio Analysis

*Advancing scientific research through systematic audio data collection and analysis*

[![Research Validated](https://img.shields.io/badge/Research-Validated-success.svg)](docs/RESEARCH_METHODOLOGY.md)
[![IEEE Compliant](https://img.shields.io/badge/Documentation-IEEE_Compliant-blue.svg)](docs/DOCUMENTATION_INDEX.md)
[![Professional Quality](https://img.shields.io/badge/Quality-Professional-brightgreen.svg)](docs/TESTING_STRATEGY.md)

**[Documentation](docs/DOCUMENTATION_INDEX.md)** • **[API Reference](docs/API_DOCUMENTATION.md)** • **[Research Methodology](docs/RESEARCH_METHODOLOGY.md)**

</div>