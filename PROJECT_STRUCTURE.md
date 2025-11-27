# RespiTrack Research Platform - Project Structure

## 🏗️ Architecture Overview

This project follows modern software engineering principles with a clean separation of concerns, proper error handling, and scalable architecture.

## 📁 Directory Structure

```
CoughTest/
├── backend/                    # Django REST API Backend
│   ├── core/                   # Core application utilities
│   │   ├── management/         # Custom Django commands
│   │   │   └── commands/       # Management commands
│   │   ├── config.py          # Configuration management
│   │   ├── exceptions.py      # Custom exception handling
│   │   ├── middleware.py      # Custom middleware (logging, security, rate limiting)
│   │   ├── utils.py           # Utility functions
│   │   └── validators.py      # Input validation
│   ├── recordings/            # Main recordings app
│   │   ├── migrations/        # Database migrations
│   │   ├── management/        # App-specific commands
│   │   ├── models.py          # Data models
│   │   ├── serializers.py     # API serializers
│   │   ├── views.py           # API views with enhanced error handling
│   │   └── urls.py            # URL routing
│   ├── accounts/              # User management (minimal, mostly unused)
│   ├── coughtest_backend/     # Django project settings
│   ├── logs/                  # Application logs
│   ├── media/                 # Uploaded audio files
│   ├── db.sqlite3            # SQLite database
│   ├── manage.py             # Django management script
│   └── requirements.txt      # Python dependencies
├── frontend/                  # React Frontend Application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── ErrorBoundary.js  # Error handling component
│   │   │   ├── Footer.js     # Footer component
│   │   │   └── Navbar.js     # Navigation component
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useRecording.js   # Recording functionality hook
│   │   ├── pages/            # Page components
│   │   │   ├── About.js      # About page
│   │   │   ├── Home.js       # Landing page
│   │   │   ├── RecordCough.js    # Recording interface
│   │   │   ├── Statistics.js # Analytics dashboard
│   │   │   └── ViewRecordings.js # Browse recordings
│   │   ├── services/         # API services
│   │   │   └── api.js        # Enhanced API client with retry logic
│   │   ├── utils/            # Utility functions
│   │   │   ├── constants.js  # Application constants
│   │   │   ├── errorHandler.js   # Error handling utilities
│   │   │   ├── helpers.js    # Helper functions
│   │   │   └── validators.js # Client-side validation
│   │   ├── App.js            # Main application component
│   │   ├── App.css           # Application styles
│   │   ├── index.js          # Application entry point
│   │   └── index.css         # Global styles
│   ├── package.json          # Node.js dependencies
│   └── .env                  # Environment variables
├── docs/                     # Documentation
├── scripts/                  # Setup and deployment scripts
├── .gitignore               # Git ignore rules
├── CHANGELOG.md             # Version history
├── LICENSE                  # License information
└── README.md               # Project documentation
```

## 🔧 Key Architecture Components

### Backend Architecture

#### 1. **Core Module** (`backend/core/`)
- **Configuration Management**: Environment-based settings
- **Exception Handling**: Structured error responses
- **Middleware Stack**: Logging, rate limiting, security headers
- **Validation Layer**: Input validation with custom validators
- **Utility Functions**: File handling, metadata extraction

#### 2. **Recordings App** (`backend/recordings/`)
- **Models**: CoughRecording with comprehensive metadata
- **Views**: Enhanced API views with validation and logging
- **Serializers**: Data serialization with validation
- **Management Commands**: Health checks and maintenance

#### 3. **Security Features**
- Rate limiting middleware
- Security headers (XSS, CSRF protection)
- Input validation (client and server-side)
- Error sanitization

### Frontend Architecture

#### 1. **Component Structure**
- **Pages**: Route-based page components
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for functionality
- **Services**: API communication layer

#### 2. **Utility Layer**
- **Constants**: Centralized configuration
- **Error Handling**: Comprehensive error management
- **Validation**: Client-side input validation
- **Helpers**: Reusable utility functions

#### 3. **Performance Features**
- Lazy loading with React.Suspense
- Error boundaries for error handling
- Browser compatibility detection
- Retry logic for API calls

## 🛠️ Development Tools

### Management Commands
```bash
# Health check
python manage.py health_check

# Database migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Setup Scripts
```bash
# Windows setup
scripts/setup.bat

# Unix setup
scripts/setup.sh

# Start development servers
scripts/start_servers.bat  # Windows
scripts/start_servers.sh   # Unix
```

## 📊 Features

### Core Functionality
- **Anonymous Audio Recording**: Browser-based and file upload
- **Data Export**: CSV, HTML, and ZIP formats for research
- **Analytics Dashboard**: Real-time statistics and visualizations
- **Browse Interface**: Audio playback and metadata viewing

### Technical Features
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error management
- **Caching**: Performance optimization
- **Logging**: Structured application logging
- **Validation**: Multi-layer input validation

## 🔒 Security

- Rate limiting (100 requests/hour for anonymous users)
- Input validation and sanitization
- Security headers (XSS, CSRF, clickjacking protection)
- File type and size validation
- Error message sanitization

## 📈 Performance

- Response caching for statistics
- Lazy loading of React components
- API retry logic with exponential backoff
- Optimized database queries
- File compression for exports

## 🧪 Quality Assurance

- Error boundaries for React components
- Comprehensive error logging
- Health check endpoints
- Browser compatibility detection
- Input validation on multiple layers

This architecture ensures maintainability, scalability, and follows software engineering best practices for a production-ready research platform.