# PowerShell Commands for CoughTest

## Run Scripts in PowerShell:

```powershell
# Setup project
.\setup.bat

# Start servers
.\start_servers.bat

# Build production
.\build_production.bat

# Test application
.\test_application.bat
```

## Alternative - Use Command Prompt:

```cmd
setup.bat
start_servers.bat
build_production.bat
test_application.bat
```

## Manual Setup if Scripts Don't Work:

```powershell
# Backend setup
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
cd ..

# Frontend setup
cd frontend
npm install
cd ..

# Start servers
cd backend
Start-Process python "manage.py runserver"
cd ..\frontend
npm start
```
