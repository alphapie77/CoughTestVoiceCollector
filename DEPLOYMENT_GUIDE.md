# 🚀 CoughTest Deployment Guide

## Development Setup

### Prerequisites
- Python 3.9+ installed
- Node.js 18+ installed
- Git installed

### Quick Start
1. **Clone and Setup**:
   ```bash
   git clone <repository-url>
   cd CoughTest
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser  # Create admin user
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

4. **Start Development Servers**:
   ```bash
   # Option 1: Use batch script (Windows)
   start_servers.bat
   
   # Option 2: Manual start
   # Terminal 1: Backend
   cd backend && python manage.py runserver
   
   # Terminal 2: Frontend
   cd frontend && npm start
   ```

### Access URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## Production Deployment

### Backend (Django)
1. **Environment Variables**:
   ```bash
   DEBUG=False
   SECRET_KEY=your-secret-key
   ALLOWED_HOSTS=your-domain.com
   ```

2. **Database Migration**:
   ```bash
   python manage.py collectstatic
   python manage.py migrate
   ```

3. **Web Server**: Use Gunicorn + Nginx or similar

### Frontend (React)
1. **Build for Production**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**: Upload build folder to web server or use services like Vercel, Netlify

### Environment Configuration
- Update `frontend/.env` with production API URLs
- Configure CORS settings in Django for production domain

## Features Overview

### Core Functionality
- ✅ 10-second cough recording in browser
- ✅ Audio file upload (WAV, MP3, WebM)
- ✅ User authentication with JWT
- ✅ Anonymous submissions
- ✅ Comprehensive metadata collection
- ✅ CSV export for research
- ✅ Real-time statistics
- ✅ Professional Bootstrap UI

### API Endpoints
- ✅ User registration/login/logout
- ✅ Audio upload with metadata extraction
- ✅ Recording listing with filters
- ✅ User dashboard and statistics
- ✅ CSV data export (admin only)

### Data Collection
- ✅ Audio technical metadata (duration, sample rate, etc.)
- ✅ User information (registered/anonymous)
- ✅ Recording method tracking
- ✅ Timestamp and system information
- ✅ Thesis-ready CSV export format

## Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Anonymous cough recording
- [ ] File upload functionality
- [ ] Audio playback
- [ ] Statistics display
- [ ] CSV export (admin)
- [ ] Responsive design on mobile

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check Django CORS settings
2. **Audio Recording**: Ensure HTTPS in production
3. **File Upload**: Check Django file upload settings
4. **Database**: Run migrations if models change

### Performance Optimization
- Enable Django static file serving
- Optimize React build for production
- Consider CDN for audio files
- Database indexing for large datasets

---

**Ready for thesis research data collection! 🎓**