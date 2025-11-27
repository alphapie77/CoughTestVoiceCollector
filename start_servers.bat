@echo off
echo Starting CoughTest Development Servers...
echo.

echo Starting Django Backend Server...
start "Django Backend" cmd /k "cd backend && python manage.py runserver"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting React Frontend Server...
start "React Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:8000/admin
echo.
echo Press any key to exit...
pause > nul