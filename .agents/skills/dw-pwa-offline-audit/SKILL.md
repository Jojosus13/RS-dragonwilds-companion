---
name: dw-pwa-offline-audit
description: >
  Auditoría y optimización de la experiencia móvil y PWA 100% offline para
  Dragonwilds. Inspecciona el Service Worker, el manifiesto de la aplicación,
  la integración con Capacitor Android, las actualizaciones OTA (Capgo) y la
  ergonomía táctil de la interfaz. Usar cuando el usuario pida "revisar PWA",
  "comprobar modo offline", "sincronizar capacitor", "optimizar para móviles",
  "verificar actualización OTA" o al realizar cambios en la navegación móvil.
---

# Procedimiento de Auditoría Móvil y PWA Offline-First

Esta skill establece los criterios de verificación para que la aplicación funcione de manera óptima tanto como Progressive Web App (PWA) instalable como aplicación nativa en Android a través de Capacitor.

## 1. Puntos de Verificación Críticos

### 1. Auditoría del Manifiesto PWA (`public/manifest.webmanifest`)
- Comprobar que los campos requeridos estén completos:
  - `name`: "RuneScape: Dragonwilds Companion"
  - `short_name`: "Dragonwilds"
  - `start_url`: "/"
  - `display`: "standalone"
  - `background_color`: `#0d1117`
  - `theme_color`: `#161b22`
  - Iconos en resoluciones adecuadas (192x192, 512x512 y máscara adaptativa).

### 2. Service Worker y Caché Offline (`public/sw.js`)
- Verificar que el Service Worker intercepte y guarde en caché:
  - `index.html` y assets versionados de Vite (`/assets/*`).
  - Imágenes del mapa en alta resolución (`/map/*`).
  - Iconos de ítems, hechizos y fotografías de bóvedas (`/items/*`, `/spells/*`, `/vaults/*`).
- Comprobar la estrategia de *Cache-First* para recursos inmutables con *Network-First* o *Stale-While-Revalidate* para metadatos dinámicos.

### 3. Actualizador en Caliente OTA con Capgo (`src/utils/updateChecker.js`)
- Validar el flujo de comprobación de versión contra el repositorio de GitHub:
  - No debe bloquear el inicio de la app si no hay conexión a internet.
  - La descarga de paquetes OTA debe validar el checksum y no entrar en bucles infinitos de reinicio.
  - El modal de actualización (`src/components/update/`) debe informar la versión disponible y el changelog.

### 4. Ergonomía Táctil y Safe Areas
- **Barra de navegación móvil (`MobileBottomNav.jsx`):** Verificar que respete la zona de gestos del sistema en Android e iOS (`padding-bottom: env(safe-area-inset-bottom)`).
- **Hit targets:** Todo botón o enlace táctil debe medir al menos **44x44px** o **48x48dp**.
- **Cajón deslizable (`MobileMoreDrawer.jsx`):** Verificar que el cierre por toque en el backdrop funcione de manera inmediata y sin retardos.

### 5. Sincronización con Capacitor
Cuando se modifiquen vistas o assets web, sincronizar con el contenedor Android:
```powershell
cmd.exe /c "npm run cap:sync"
```
Asegurar que los plugins de Capacitor (@capacitor/core, @capacitor/android, @capgo/capacitor-updater) estén vinculados correctamente en `android/capacitor.settings.gradle`.

