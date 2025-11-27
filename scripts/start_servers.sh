#!/bin/bash
echo "Starting CoughTest Development Servers..."
echo

echo "Starting Django Backend Server..."
cd backend
python manage.py runserver &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 5

echo "Starting React Frontend Server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo
echo "Both servers are starting..."
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Admin Panel: http://localhost:8000/admin"
echo
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait