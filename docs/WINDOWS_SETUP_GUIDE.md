# 🪟 Windows Setup Guide

## Why `.\setup.bat` is needed in PowerShell

PowerShell requires `.\` prefix for security - it doesn't run scripts from current directory by default.

## Solutions:

### **Option 1: Use Command Prompt (Recommended)**
```cmd
# Open Command Prompt (cmd) instead of PowerShell
setup.bat
start_servers.bat
build_production.bat
```

### **Option 2: Use PowerShell with prefix**
```powershell
.\setup.bat
.\start_servers.bat
.\build_production.bat
```

### **Option 3: Run from File Explorer**
- Double-click `setup.bat` in Windows Explorer
- Double-click `start_servers.bat` to start servers

## Quick Start Steps:

1. **Open Command Prompt** (not PowerShell)
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Navigate to project**
   ```cmd
   cd "E:\CSE CU\Important\project\CoughTest"
   ```

3. **Run setup**
   ```cmd
   setup.bat
   ```

4. **Start servers**
   ```cmd
   start_servers.bat
   ```

## Why This Happens:
- **PowerShell**: Security feature requires `.\` prefix
- **Command Prompt**: Runs .bat files directly
- **File Explorer**: Double-click works normally

**Recommendation: Use Command Prompt (cmd) for batch files on Windows**