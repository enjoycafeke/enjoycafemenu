@echo off
setlocal EnableExtensions
pushd "%~dp0" >nul 2>&1
if errorlevel 1 goto :folder_error

echo ==============================================
echo Enjoy Cafe - Production Preview
 echo ==============================================

if not exist dist\index.html (
  echo No production build found. Building first...
  call npm run build
  if errorlevel 1 goto :build_fail
)

start "Enjoy Cafe Production Preview" /D "%~dp0" cmd.exe /k "call npm run preview"
echo Waiting for http://127.0.0.1:4173 to become available...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$u='http://127.0.0.1:4173'; for($i=0;$i -lt 40;$i++){ try { $r=Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 2; if($r.StatusCode -ge 200 -and $r.StatusCode -lt 500){ Start-Process $u; exit 0 } } catch {}; Start-Sleep -Milliseconds 500 }; exit 1"
if errorlevel 1 goto :server_fail

popd
exit /b 0

:build_fail
echo.
echo ERROR: Production build failed.
pause
popd
exit /b 1

:server_fail
echo.
echo ERROR: Production preview did not become reachable on port 4173.
echo Read the "Enjoy Cafe Production Preview" window for the exact error.
pause
popd
exit /b 1

:folder_error
echo ERROR: Could not open the Enjoy Cafe project folder.
pause
exit /b 1
