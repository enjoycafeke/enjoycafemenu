@echo off
setlocal
cd /d "%~dp0"
echo ==============================================
echo Enjoy Cafe - Production Build
echo ==============================================
call npm run build
if errorlevel 1 (
  echo.
  echo BUILD FAILED.
  pause
  exit /b 1
)
echo.
echo Production output: %CD%\dist
pause
