# Script para configurar la base de datos PostgreSQL en puerto 5433
$psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
$setupScript = "setup_db.sql"

Write-Host "Ejecutando script de configuracion de base de datos..."
Write-Host "Puerto: 5433"
Write-Host "Se te pedira la contrasena del usuario postgres"
Write-Host ""

Start-Process -FilePath $psqlPath -ArgumentList "-U", "postgres", "-p", "5433", "-f", $setupScript -NoNewWindow -Wait

Write-Host ""
Write-Host "Proceso completado. Verifica los mensajes anteriores."
