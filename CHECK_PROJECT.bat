@echo off
setlocal
cd /d "%~dp0"
echo ==============================================
echo Enjoy Cafe - Full Project Check
echo ==============================================
call npm run check
if errorlevel 1 (
  echo.
  echo CHECK FAILED.
  pause
  exit /b 1
)
echo.
echo CHECK PASSED.
pause
