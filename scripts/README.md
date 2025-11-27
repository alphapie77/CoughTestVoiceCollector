# 🛠️ Scripts Directory

Automation scripts for CoughTest project setup and management.

## Windows Scripts (.bat)

| Script | Description |
|--------|-------------|
| `setup.bat` | Complete project setup with dependencies and admin user |
| `start_servers.bat` | Start Django backend and React frontend servers |
| `build_production.bat` | Build optimized production version |
| `test_application.bat` | Run application tests and verification |

## Unix Scripts (.sh)

| Script | Description |
|--------|-------------|
| `setup.sh` | Complete project setup for macOS/Linux |
| `start_servers.sh` | Start development servers with process management |

## Usage

### Windows (Command Prompt)
```cmd
scripts\setup.bat
scripts\start_servers.bat
```

### Windows (PowerShell)
```powershell
.\scripts\setup.bat
.\scripts\start_servers.bat
```

### macOS/Linux
```bash
chmod +x scripts/*.sh
./scripts/setup.sh
./scripts/start_servers.sh
```

## What Each Script Does

### setup.bat/.sh
1. Installs Python dependencies
2. Runs database migrations
3. Creates admin user (admin/admin123)
4. Installs Node.js dependencies
5. Builds production version

### start_servers.bat/.sh
1. Starts Django backend on port 8000
2. Starts React frontend on port 3000
3. Opens both in separate processes/windows

### build_production.bat
1. Builds optimized React frontend
2. Collects Django static files
3. Runs deployment checks

### test_application.bat
1. Tests backend configuration
2. Verifies database status
3. Tests management commands
4. Tests frontend build process