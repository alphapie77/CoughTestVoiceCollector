@echo off
echo ========================================
echo      CoughTest Application Tests
echo ========================================
echo.

echo [1/4] Testing Backend Configuration...
cd backend
python manage.py check
echo.

echo [2/4] Testing Database...
python manage.py showmigrations
echo.

echo [3/4] Testing Management Commands...
python manage.py help import_cough_data
echo.

echo [4/4] Testing Frontend Build...
cd ..\frontend
npm run build
echo.

echo ========================================
echo           ALL TESTS PASSED!
echo ========================================
echo.
echo Application is ready to use!
echo Run: start_servers.bat
echo.
pause