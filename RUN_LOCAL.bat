@echo off
setlocal EnableExtensions
pushd "%~dp0" >nul 2>&1
if errorlevel 1 goto :folder_error

if not exist node_modules\vite\bin\vite.js (
  echo Dependencies are not installed yet.
  echo Running the full installer first...
  call INSTALL_AND_RUN.bat
  popd
  exit /b %errorlevel%
)

echo Starting Enjoy Cafe at http://127.0.0.1:4173
call npm run dev
set "RESULT=%errorlevel%"
popd
exit /b %RESULT%

:folder_error
echo ERROR: Could not open the Enjoy Cafe project folder.
pause
exit /b 1
