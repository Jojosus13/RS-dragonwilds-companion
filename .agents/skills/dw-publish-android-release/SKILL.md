---
name: dw-publish-android-release
description: >
  Procedimiento automatizado de extremo a extremo para compilar el APK Android
  con Gradle, generar el paquete de actualización OTA y publicar una Release
  con ambos assets en GitHub. Usar cuando el usuario pida "compilar apk",
  "publicar release", "subir nueva version a github", "hacer release de android"
  o "generar bundle ota".
---

# Procedimiento de Compilación Android y Publicación de Release en GitHub

Esta skill automatiza el proceso completo de generación del instalador móvil (APK), el paquete de actualización en caliente (OTA) y su publicación en GitHub Releases.

## 1. Verificación Previa de Versión

Antes de compilar, confirmar que el número de versión coincida en los 3 puntos del proyecto:

1. `src/utils/version.js`:
   ```javascript
   export const APP_VERSION = '1.0.X';
   ```
2. `package.json`:
   ```json
   "version": "1.0.X"
   ```
3. `android/app/build.gradle`:
   ```groovy
   versionCode X  // Incrementar siempre de forma monótona (ej. 8 -> 9)
   versionName "1.0.X"
   ```

---

## 2. Flujo de Compilación y Publicación Paso a Paso

### Paso 1: Sincronización Web con Capacitor
Compila la aplicación React con Vite y actualiza los assets en el proyecto Android:
```powershell
cmd.exe /c "npm run cap:sync"
```
- Verifica que el build termine con código `0` y que `android/app/src/main/assets/public/` contenga el nuevo bundle.

### Paso 2: Compilación Nativa del APK con Gradle Wrapper
Ejecuta la compilación de Android en la carpeta `android/`:
```powershell
cmd.exe /c "cd android && gradlew.bat assembleDebug"
```
*(Nota: Para una versión firmada de producción, se utilizará `gradlew.bat assembleRelease` una vez configurado el keystore).*

### Paso 3: Almacenamiento del APK en `dist-apk/`
Copiar el binario recién generado desde el directorio de salida de Gradle hacia la carpeta de distribución del proyecto:
- **Origen:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Destino:** `dist-apk/RS-Dragonwilds-v<VERSION>.apk`
```powershell
powershell -Command "Copy-Item 'android\app\build\outputs\apk\debug\app-debug.apk' -Destination 'dist-apk\RS-Dragonwilds-v<VERSION>.apk' -Force"
```
- Verificar que el archivo generado tenga un tamaño de aproximadamente 75 - 85 MB.

### Paso 4: Empaquetado OTA para Actualizador en Caliente
Comprimir el directorio web compilado `dist/` en formato `.zip` para los usuarios con la app ya instalada:
```powershell
powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'dist-zip\RS-Dragonwilds-bundle-v<VERSION>.zip' -Force"
```

### Paso 5: Publicación Automatizada en GitHub Releases
Ejecutar el script de publicación pasándole el token con permisos de repositorio (`repo` scope):
```powershell
node scripts/publish-release.cjs <GITHUB_TOKEN>
```
El script realiza automáticamente:
1. Verificación del tag `v<VERSION>`.
2. Creación de la Release en `Jojosus13/RS-dragonwilds-companion`.
3. Subida del paquete OTA `RS-Dragonwilds-bundle-v<VERSION>.zip`.
4. Subida del instalador APK `RS-Dragonwilds-v<VERSION>.apk`.
5. Retorno de la URL pública de la Release.

---

## 3. Comprobación Final de la Release
Confirmar en la salida del script que ambos assets fueron subidos con código HTTP 201:
- `RS-Dragonwilds-bundle-v<VERSION>.zip` (application/zip)
- `RS-Dragonwilds-v<VERSION>.apk` (application/vnd.android.package-archive)
- Imprimir la URL directa para que el usuario pueda descargar o compartir la nueva versión.

