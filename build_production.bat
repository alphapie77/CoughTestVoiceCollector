@echo off
echo ========================================
echo    CoughTest Production Build Script
echo ========================================
echo.

echo [1/3] Building React Frontend...
cd frontend
npm run build
echo Frontend build complete!
echo.

echo [2/3] Collecting Django Static Files...
cd ..\backend
python manage.py collectstatic --noinput
echo Static files collected!
echo.

echo [3/3] Running Production Checks...
python manage.py check --deploy
echo.

echo ========================================
echo        PRODUCTION BUILD COMPLETE!
echo ========================================
echo.
echo Build artifacts:
echo - Frontend: frontend/build/
echo - Static files: backend/staticfiles/
echo.
echo Ready for deployment!
echo.
pause