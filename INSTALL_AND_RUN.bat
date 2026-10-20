@echo off
setlocal EnableExtensions
pushd "%~dp0" >nul 2>&1
if errorlevel 1 goto :folder_error

echo ==============================================
echo Enjoy Cafe - Install, Validate and Run Locally
echo ==============================================

echo.
echo Checking Node.js and npm...
where node >nul 2>&1
if errorlevel 1 goto :node_error
where npm >nul 2>&1
if errorlevel 1 goto :node_error

node --version
call npm --version
if errorlevel 1 goto :node_error

echo.
echo [1/3] Installing project dependencies...
call npm install
if errorlevel 1 goto :install_fail

echo.
echo [2/3] Running TypeScript, tests and production build...
call npm run check
if errorlevel 1 goto :validation_fail

echo.
echo [3/3] Starting Vite local development server...
start "Enjoy Cafe Local Server" /D "%~dp0" cmd.exe /k "call npm run dev"

echo Waiting for http://127.0.0.1:4173 to become available...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$u='http://127.0.0.1:4173'; for($i=0;$i -lt 40;$i++){ try { $r=Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 2; if($r.StatusCode -ge 200 -and $r.StatusCode -lt 500){ Start-Process $u; exit 0 } } catch {}; Start-Sleep -Milliseconds 500 }; exit 1"
if errorlevel 1 goto :server_fail

echo.
echo ==============================================
echo Enjoy Cafe is running locally.
echo http://127.0.0.1:4173
echo ==============================================
popd
exit /b 0

:node_error
echo.
echo ERROR: Node.js or npm could not be executed.
echo Required: Node.js 22.12 or newer and npm 10 or newer.
echo Your command window showed Node v24.19.0 and npm 11.17.0,
echo which are compatible, so this message should only appear if PATH changes.
goto :fail_end

:install_fail
echo.
echo ERROR: npm install failed.
echo The local server was NOT started.
goto :fail_end

:validation_fail
echo.
echo ERROR: Project validation failed.
echo The local server was NOT started.
goto :fail_end

:server_fail
echo.
echo ERROR: Vite did not become reachable on 127.0.0.1:4173 within 20 seconds.
echo Leave the "Enjoy Cafe Local Server" window open and read the error shown there.
goto :fail_end

:folder_error
echo.
echo ERROR: Could not open the Enjoy Cafe project folder.
pause
exit /b 1

:fail_end
echo.
echo Please copy the full error shown above if you need me to diagnose it.
pause
popd
exit /b 1
