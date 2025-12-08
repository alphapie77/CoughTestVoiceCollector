#!/bin/bash
echo "========================================"
echo "   CoughTest Project Setup Script"
echo "========================================"
echo

echo "[1/4] Setting up Backend (Django)..."
cd backend
echo "Installing Python dependencies..."
pip install -r requirements.txt
echo

echo "Creating required directories..."
mkdir -p media/cough_recordings
mkdir -p logs
echo

echo "Running database migrations..."
python manage.py migrate
echo

echo "Creating superuser (admin/admin123)..."
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin123') if not User.objects.filter(username='admin').exists() else print('Admin user already exists')"
echo

echo "[2/4] Setting up Frontend (React)..."
cd ../frontend
echo "Installing Node.js dependencies..."
npm install
echo

echo "[3/4] Building production version..."
npm run build
echo

echo "[4/4] Setup Complete!"
echo
echo "========================================"
echo "          SETUP SUCCESSFUL!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Run: ./start_servers.sh"
echo "2. Visit: http://localhost:3000"
echo "3. Admin: http://localhost:8000/admin (admin/admin123)"
echo