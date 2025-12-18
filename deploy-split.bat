@echo off
echo 🚀 Preparing Split Deployment (Vercel Frontend + PythonAnywhere Backend)

REM Generate secret key
set SECRET_KEY=django-insecure-change-this-%RANDOM%-%RANDOM%-%RANDOM%

echo 📝 Setting up backend environment for PythonAnywhere...
(
echo ENVIRONMENT=production
echo DEBUG=False
echo SECRET_KEY=%SECRET_KEY%
echo CORS_ORIGINS=https://your-frontend-app.vercel.app
echo ALLOWED_HOSTS=yourusername.pythonanywhere.com
echo DATABASE_URL=sqlite:////home/yourusername/CoughTestVoiceCollector/backend/db.sqlite3
echo MEDIA_ROOT=/home/yourusername/CoughTestVoiceCollector/backend/media
echo MEDIA_URL=/media/
) > backend\.env

echo 📝 Setting up frontend environment for Vercel...
(
echo REACT_APP_API_URL=https://yourusername.pythonanywhere.com/api
echo GENERATE_SOURCEMAP=false
) > frontend\.env.production

echo ✅ Environment files created!
echo.
echo Next steps:
echo 1. Update usernames/domains in the .env files
echo 2. Deploy backend to PythonAnywhere (see SPLIT_DEPLOYMENT_GUIDE.md)
echo 3. Deploy frontend to Vercel (see SPLIT_DEPLOYMENT_GUIDE.md)
pause