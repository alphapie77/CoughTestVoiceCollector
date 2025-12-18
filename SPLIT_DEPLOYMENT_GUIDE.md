# Split Deployment Guide
**Frontend: Vercel | Backend: PythonAnywhere**

## 🎯 Deployment Steps

### 0. Prepare Environment Files
Run: `deploy-split.bat` then update domains in the generated `.env` files

### 1. Deploy Backend to PythonAnywhere

#### Upload Code
```bash
# In PythonAnywhere console
git clone https://github.com/yourusername/your-repo.git
cd CoughTestVoiceCollector/backend
```

#### Setup Environment
```bash
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.pythonanywhere .env
nano .env  # Edit with your details
```

#### Configure Database
```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

#### Configure Web App (PythonAnywhere Dashboard)
- **Source code**: `/home/yourusername/CoughTestVoiceCollector/backend`
- **WSGI file**: Copy content from `pythonanywhere_wsgi.py`
- **Static files**: `/static/` → `/home/yourusername/CoughTestVoiceCollector/backend/staticfiles/`
- **Media files**: `/media/` → `/home/yourusername/CoughTestVoiceCollector/backend/media/`

### 2. Deploy Frontend to Vercel

#### Update API URL
Edit `frontend/.env.production`:
```env
REACT_APP_API_URL=https://yourusername.pythonanywhere.com/api
```

#### Deploy to Vercel
1. Push code to Git repository
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set **Root Directory** to `frontend`
5. Deploy

### 3. Configure CORS

Update `backend/.env` on PythonAnywhere:
```env
CORS_ORIGINS=https://your-frontend-app.vercel.app
ALLOWED_HOSTS=yourusername.pythonanywhere.com
```

Restart your PythonAnywhere web app.

## 🔧 Environment Files

### PythonAnywhere Backend (.env)
```env
ENVIRONMENT=production
DEBUG=False
SECRET_KEY=your-secure-secret-key
CORS_ORIGINS=https://your-frontend-app.vercel.app
ALLOWED_HOSTS=yourusername.pythonanywhere.com
DATABASE_URL=sqlite:////home/yourusername/CoughTestVoiceCollector/backend/db.sqlite3
MEDIA_ROOT=/home/yourusername/CoughTestVoiceCollector/backend/media
```

### Vercel Frontend (.env.production)
```env
REACT_APP_API_URL=https://yourusername.pythonanywhere.com/api
GENERATE_SOURCEMAP=false
```

## ✅ Testing Checklist

- [ ] Backend API accessible at `https://yourusername.pythonanywhere.com/api/health/`
- [ ] Frontend loads at `https://your-app.vercel.app`
- [ ] File upload works (check CORS)
- [ ] API calls successful from frontend
- [ ] Static files loading correctly

## 🚨 Common Issues

**CORS Error**: Update `CORS_ORIGINS` in backend `.env`
**API Not Found**: Check `REACT_APP_API_URL` in frontend
**Static Files**: Run `python manage.py collectstatic --noinput`