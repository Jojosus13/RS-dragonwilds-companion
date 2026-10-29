---
name: dw-data-sync
description: >
  Pipeline de actualización, saneamiento, traducción y sincronización de datos
  del juego desde la Wiki oficial de RuneScape: Dragonwilds hacia src/data/.
  Descarga imágenes oficiales a public/, limpia wikitext residual y actualiza
  la caché de traducciones. Usar cuando el usuario pida "actualizar datos",
  "scrapear wiki", "traducir ítems", "descargar imágenes", "sincronizar bóvedas"
  o "reparar base de datos de ítems".
---

# Procedimiento de Ingesta, Traducción y Sincronización de Datos

Esta skill describe la ejecución controlada de scripts para extraer, traducir y empaquetar los datos del juego manteniendo la integridad de las bases de datos JSON en `src/data/`.

## 1. Datasets Principales (`src/data/`)

- `items.json`: Objetos, estadísticas ofensivas/defensivas, fuentes y recetas de crafteo.
- `vaults.json`: Información de las 12 Bóvedas Dragonkin, trampas, enemigos y cofres.
- `quests.json`: Misiones principales y secundarias de Ashenfall.
- `spells.json`: Catálogo de magias y costes exactos en runas.
- `mapData.js`: Puntos de teletransporte, nodos de recolección y marcadores cartográficos.
- `skills.json`: Instalaciones de forja y árbol de supervivencia.

---

## 2. Flujo de Sincronización Paso a Paso

### Paso 1: Extracción Automatizada (Scraping)
Para consultar la API oficial de la Wiki y extraer datos actualizados:
```powershell
node scripts/scrapers/fetch-wiki-data.js
node scripts/scrapers/fetch-quests-spells-lore.js
```
- Manejar pausas y evitar bloqueos de red (*rate limiting*).
- Los datos crudos se almacenan en `scripts/data/` para posterior procesamiento.

### Paso 2: Limpieza de Marcado y Wikitext
Eliminar plantillas residuales (`{{sic}}`, dobles llaves, corchetes de enlaces internos):
```powershell
node scripts/translations/clean-all-markup.js
```

### Paso 3: Pipeline de Traducción al Castellano
Ejecutar la traducción incremental aprovechando la caché para evitar llamadas duplicadas:
```powershell
node scripts/translations/translate-all-items.js
```
- Respeta los términos cacheados en `scripts/data/translation-cache.json` y `lore-translation-cache.json`.
- Conserva nombres propios esenciales del universo RuneScape (ciudades, PNJs, deidades y títulos de bóvedas).

### Paso 4: Descarga y Optimización de Imágenes Locales
Garantizar que todos los nuevos objetos o hechizos tengan su recurso gráfico descargado en local para funcionamiento 100% offline:
```powershell
node scripts/images/download-missing-images.js
```
- Iconos de ítems: `public/items/<nombre>.webp` / `.png`.
- Iconos de hechizos y runas: `public/spells/<nombre>.png`.
- Fotografías de bóvedas: `public/vaults/<id>.webp`.

### Paso 5: Auditoría y Verificación de Consistencia
Ejecutar el diagnóstico de traducciones para confirmar que no queden entradas vacías o rotas:
```powershell
node scripts/diagnostics/check-untranslated.js
```
Y compilar el proyecto para verificar que Vite empaqueta los JSONs correctamente:
```powershell
cmd.exe /c "npm run build"
```

