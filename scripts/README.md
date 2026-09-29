# 🛠️ Scripts y Herramientas de Datos (RuneScape: Dragonwilds Wiki)

Este directorio contiene la suite de herramientas para scraping, extracción, procesamiento de imágenes, traducción al castellano, generación de datos estructurados y pruebas de diagnóstico del proyecto.

---

## 📁 Estructura del Directorio

```
scripts/
├── data/                          # Cachés de traducción y datos crudos de la Wiki
│   ├── all_quests_raw.json        # Datos crudos de misiones descargadas de la API
│   ├── debug_vault_data.json      # Mapeo de imágenes y wikitext de bóvedas
│   ├── lore-translation-cache.json# Caché de traducciones de historia y misiones
│   ├── raw_vaults.json            # Respuestas API de las 12 Bóvedas Dragonkin
│   ├── translation-cache.json     # Diccionario de caché de términos generales
│   └── untranslated_names.json    # Volcado de nombres pendientes
│
├── scrapers/                      # Extracción directa desde dragonwilds.runescape.wiki
│   ├── fetch-wiki-data.js         # Scraper de items, recetas, estadísticas y categorías
│   └── fetch-quests-spells-lore.js# Scraper de misiones, hechizos y códice de historia
│
├── vaults/                        # Pipeline de Bóvedas Dragonkin
│   ├── fetchVaultsData.js         # Descarga las páginas wiki de las bóvedas
│   ├── buildVaultsJson.js         # Parsea wikitext e imágenes crudas de las bóvedas
│   └── generateVaultsJson.js      # Genera src/data/vaults.json con guías, peligros, cofres y jefes
│
├── images/                        # Gestión y descarga de assets locales
│   ├── download-item-images.js    # Descarga masiva de iconos de items en /public/items/
│   ├── download-spell-images.js   # Descarga de iconos de hechizos en /public/spells/
│   └── download-missing-images.js # Identifica items sin imagen y descarga sustitutos oficiales
│
├── diagnostics/                   # Diagnóstico, auditorías y pruebas
│   ├── check-untranslated.js      # Escanea items.json en busca de textos en inglés
│   ├── dump-untranslated.js       # Vuelca elementos sin traducir a scripts/data/untranslated_names.json
│   └── test-search.js             # Prueba la búsqueda con soporte de plurales, tildes y pesos
│
└── translations/                  # Saneamiento y traducción al español
    ├── full-spanish-translator.js # Traductor maestro integral de items, recetas y usos
    ├── translate-all-items.js     # Diccionario de traducción específica de items
    ├── translate-recipe-materials.js # Normalización de nombres de materiales de recetas
    ├── process-and-translate-quest-guides.js # Formateo y traducción de pasos de misiones
    ├── clean-all-markup.js        # Limpia sintaxis wikitext residual ([[enlaces]], plantillas, etc.)
    └── archive/                   # Pases y migraciones históricas previas
```

---

## 🚀 Guía de Comandos Rápidos

### 1. Bóvedas Dragonkin
Para regenerar los datos y guías en `src/data/vaults.json`:
```bash
node ./scripts/vaults/generateVaultsJson.js
```

### 2. Diagnóstico y Pruebas
Para auditar el estado de las traducciones:
```bash
node ./scripts/diagnostics/check-untranslated.js
```

Para probar el motor de búsqueda en español con lematización y tolerancia de tildes:
```bash
node ./scripts/diagnostics/test-search.js
```

### 3. Descarga de Imágenes
Para descargar o reparar imágenes locales en `public/items/`:
```bash
node ./scripts/images/download-missing-images.js
```

### 4. Limpieza y Re-Traducción
Para limpiar markup de MediaWiki residual:
```bash
node ./scripts/translations/clean-all-markup.js
```

Para aplicar el diccionario maestro de traducción:
```bash
node ./scripts/translations/full-spanish-translator.js
```
