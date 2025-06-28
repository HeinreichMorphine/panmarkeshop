@echo off
echo ========================================
echo Panmark Enterprise - Deployment Script
echo ========================================
echo.

echo Checking XAMPP installation...
if not exist "C:\xampp\htdocs" (
    echo ERROR: XAMPP not found at C:\xampp\htdocs
    echo Please install XAMPP first from https://www.apachefriends.org/
    pause
    exit /b 1
)

echo XAMPP found! Copying files...
xcopy /E /I /Y ".\*" "C:\xampp\htdocs\Panmark\"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Deployment successful!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Start XAMPP Control Panel
    echo 2. Start Apache service
    echo 3. Open browser and go to:
    echo    http://localhost/Panmark/public/index.html
    echo.
    echo Demo Accounts:
    echo - Admin: admin / admin123
    echo - Customer: john_doe / password123
    echo.
    pause
) else (
    echo ERROR: Failed to copy files
    pause
    exit /b 1
) 