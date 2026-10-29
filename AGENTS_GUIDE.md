# Guía del Escuadrón de Agentes y Skills Especializados
## RuneScape: Dragonwilds Companion App (`wikiRunescapeDW`)

Este documento define la estructura, responsabilidades, flujos de trabajo y directrices de los agentes y habilidades (*skills*) de Inteligencia Artificial especializados para el **desarrollo, mantenimiento, testeo, compilación y despliegue** de la aplicación complementaria y códice interactivo de **RuneScape: Dragonwilds**.

---

## 1. Resumen Ejecutivo del Escuadrón

El desarrollo y mantenimiento de la aplicación está liderado por un **Orquestador Maestro** capaz de descomponer problemas, coordinar la ejecución del escuadrón y **crear dinámicamente nuevos agentes y skills** cuando se detectan áreas no cubiertas:

| Agente | Nombre en Sistema | Skill Asociada | Rol Principal | Ámbito de Trabajo |
| :--- | :--- | :--- | :--- | :--- |
| 👑 **Orquestador Maestro** | `dw-orchestrator` | `dw-orchestration` | Triage, Despacho, Meta-Creación de Agentes/Skills | Toda la aplicación y entorno de agentes |
| 🏗️ **Arquitecto Frontend** | `dw-architect-dev` | `dw-refactor-component` | Arquitectura React 19 & Componentes Atómicos | `src/components/`, `REFACTOR_PLAN.md` |
| 🧪 **Control de Calidad (QA)** | `dw-tester-qa` | `dw-qa-diagnostics` | Testing, Diagnósticos, Linter y Regresiones | `scripts/diagnostics/`, builds, lints |
| 📜 **Motor de Datos y Lore** | `dw-data-engine` | `dw-data-sync` | Scrapers Wiki, Datasets JSON y Traducciones | `src/data/`, `scripts/scrapers/`, traducciones |
| 📱 **Mobile & PWA** | `dw-mobile-pwa` | `dw-pwa-offline-audit` | Capacitor Android, Offline PWA y Updates OTA | `android/`, `public/sw.js`, Capgo |
| 🎨 **Diseñador Dark Fantasy** | `dw-ui-designer` | `dw-dark-fantasy-styling` | UI/UX Medieval, Vanilla CSS y Componentes SVG | `src/styles/index.css`, mapas SVG, a11y |
| 🚀 **Compilación & Releases** | `dw-android-release` | `dw-publish-android-release`| Compilación APK Android & Publicación en GitHub | `android/`, `dist-apk/`, Releases |

---

## 2. Detalle y Responsabilidades de Cada Agente

### 👑 1. `dw-orchestrator` (Orquestador Maestro y Meta-Arquitecto)
* **Objetivo:** Punto de entrada único para el usuario ante cualquier problema, funcionalidad o consulta compleja. Descompone el problema, determina qué agente interviene, despacha las peticiones y sintetiza los resultados.
* **Capacidades Exclusivas:**
  - **Meta-Creación Dinámica:** Si un requerimiento exige un perfil no existente (ej. motor de audio, internacionalización a otros idiomas, backend sync), crea al vuelo el nuevo agente (`define_subagent` + `.agents/agents/<name>.md`) y su procedimiento (`.agents/skills/<skill>/SKILL.md`).
  - **Planificación Multietapa:** Divide requerimientos en cadenas secuenciales o tareas paralelas.
  - **Supervisión de Calidad:** Exige siempre que `dw-tester-qa` verifique la compilación antes de dar la tarea por concluida.

---

### 🏗️ 2. `dw-architect-dev` (Arquitectura y Desarrollo Core)
* **Objetivo:** Desarrollar nuevas características y mantener la arquitectura atómica y modular de la aplicación web React 19 + Vite.
* **Responsabilidades Clave:**
  - **Atomización estricta (`REFACTOR_PLAN.md`):** Componentes atómicos de **80 a 150 líneas** con responsabilidad única y contenedor orquestador.
  - **Documentación obligatoria:** Mantenimiento del `README.md` de cada módulo en `src/components/<modulo>/`.
  - **Filosofía Ponytail:** YAGNI estricto, sin librerías externas superfluas ni abstracciones prematuras.
  - **Manejo de estado:** Persistencia en `localStorage` (favoritos, configuración del mapa, listas de crafteo).

---

### 🧪 3. `dw-tester-qa` (Testing, Diagnósticos y Calidad)
* **Objetivo:** Garantizar que cada cambio mantenga la aplicación 100% libre de errores y regresiones.
* **Responsabilidades Clave:**
  - **Validación de Compilación:** Asegurar que `npm run build` (`vite build`) complete con 0 errores.
  - **Inspección Estática:** Auditoría de `oxlint` (`npm run lint`), eliminando código muerto y variables huérfanas.
  - **Diagnósticos de Integridad de Datos:** Ejecutar y crear scripts de validación en `scripts/diagnostics/` (`test-search.js`, `check-untranslated.js`).
  - **Pruebas Mínimas:** Verificaciones ejecutables basadas en `node:assert` nativo sin frameworks pesados.

---

### 📜 4. `dw-data-engine` (Datos del Juego, Scrapers y Traducciones)
* **Objetivo:** Extraer, limpiar, traducir y sincronizar las bases de datos del juego desde la Wiki oficial.
* **Responsabilidades Clave:**
  - **Curación de Datasets (`src/data/`):** `items.json` (+1.300 objetos), `vaults.json`, `quests.json`, `spells.json`, `mapData.js`, `skills.json`.
  - **Scraping Automatizado:** Mantenimiento de extractores en `scripts/scrapers/` y `scripts/vaults/`.
  - **Pipeline de Traducción:** Consistencia y caché de traducción al español (`translation-cache.json`).
  - **Recursos Multimedia:** Descarga y optimización de iconos en `public/items/`, `public/spells/` y `public/vaults/`.

---

### 📱 5. `dw-mobile-pwa` (Capacitor Android y PWA Offline)
* **Objetivo:** Optimizar la experiencia móvil tanto nativa (Android APK) como web progresiva (PWA 100% offline).
* **Responsabilidades Clave:**
  - **Capacitor Sync:** Sincronización con el contenedor nativo (`npm run cap:sync`).
  - **PWA Offline-First:** Auditoría de `public/sw.js` y `public/manifest.webmanifest`.
  - **Actualizaciones OTA:** Gestión de `@capgo/capacitor-updater` y `src/utils/updateChecker.js`.
  - **Ergonomía Táctil:** Respeto de *Safe Areas* y áreas táctiles de mínimo 44-48px.

---

### 🎨 6. `dw-ui-designer` (Diseño Dark Fantasy y Estilos)
* **Objetivo:** Preservar la inmersión e identidad visual de fantasía oscura inspirada en RuneScape.
* **Responsabilidades Clave:**
  - **Identidad Visual Medieval:** Acentos dorados (`var(--gold-400)`), superficies de piedra rúnica y glassmorphism.
  - **Vanilla CSS:** Arquitectura modular en `src/styles/index.css` sin frameworks CSS pesados.
  - **Cartografía SVG:** Mantenimiento de `MapTerrainSvg.jsx`, trazador de distancias y HUD del mapa.
  - **Accesibilidad y Microanimaciones:** Contrastes WCAG (mínimo 4.5:1) y transiciones fluidas.

---

### 🚀 7. `dw-android-release` (Compilación APK Android y Releases en GitHub)
* **Objetivo:** Automatizar la compilación del APK para Android, empaquetado OTA y publicación en GitHub.
* **Responsabilidades Clave:**
  - **Sincronización de Versiones:** Alineación de `APP_VERSION` en `version.js`, `package.json` y `build.gradle`.
  - **Compilación de Android:** Sincronización web y ejecución de Gradle Wrapper (`gradlew assembleDebug`).
  - **Empaquetado OTA:** Compresión de `dist/` en `dist-zip/RS-Dragonwilds-bundle-v<VERSION>.zip`.
  - **Publicación en GitHub:** Ejecución de `node scripts/publish-release.cjs` y subida de ambos assets.

---

## 3. Catálogo de Habilidades (Skills) Especializadas

Cada agente dispone de un procedimiento estandarizado en formato `SKILL.md`:

### 👑 1. [`dw-orchestration`](file:///.agents/skills/dw-orchestration/SKILL.md)
* **Agente afín:** `dw-orchestrator`
* **Propósito:** Algoritmo de triage, análisis de brechas de capacidades, protocolo de creación de nuevos agentes/skills al vuelo y despacho de peticiones.
* **Triggers:** *"tengo un problema"*, *"orquestar tarea"*, *"coordinar equipo"*, *"analiza y resuelve"*.

### 🧩 2. [`dw-refactor-component`](file:///.agents/skills/dw-refactor-component/SKILL.md)
* **Agente afín:** `dw-architect-dev`
* **Propósito:** Protocolo estricto para descomponer componentes monolíticos en piezas atómicas (80-150 líneas) y generar su `README.md`.
* **Triggers:** *"atomizar componente"*, *"refactorizar vista"*, *"modularizar módulo"*.

### 🔍 3. [`dw-qa-diagnostics`](file:///.agents/skills/dw-qa-diagnostics/SKILL.md)
* **Agente afín:** `dw-tester-qa`
* **Propósito:** Batería de pruebas en 4 niveles: compilación Vite, análisis de linter con `oxlint`, pruebas fonéticas de búsqueda y chequeo de textos no traducidos.
* **Triggers:** *"probar la app"*, *"ejecutar tests"*, *"diagnóstico de calidad"*, *"revisar linter"*.

### 🔄 4. [`dw-data-sync`](file:///.agents/skills/dw-data-sync/SKILL.md)
* **Agente afín:** `dw-data-engine`
* **Propósito:** Pipeline ordenado para extraer datos desde la wiki, sanear wikitext, traducir ítems y descargar imágenes locales.
* **Triggers:** *"actualizar datos"*, *"scrapear wiki"*, *"traducir ítems"*, *"descargar imágenes"*.

### 📶 5. [`dw-pwa-offline-audit`](file:///.agents/skills/dw-pwa-offline-audit/SKILL.md)
* **Agente afín:** `dw-mobile-pwa`
* **Propósito:** Auditoría del Service Worker (`sw.js`), manifiesto PWA, actualizador en caliente Capgo y ergonomía táctil.
* **Triggers:** *"revisar PWA"*, *"comprobar modo offline"*, *"sincronizar capacitor"*, *"optimizar móviles"*.

### 🎨 6. [`dw-dark-fantasy-styling`](file:///.agents/skills/dw-dark-fantasy-styling/SKILL.md)
* **Agente afín:** `dw-ui-designer`
* **Propósito:** Guía de diseño para paletas doradas/oscuras, Vanilla CSS en `index.css`, componentes SVG del mapa y accesibilidad WCAG.
* **Triggers:** *"mejorar diseño"*, *"estilizar componente"*, *"ajustar mapa SVG"*, *"microanimaciones"*.

### 📦 7. [`dw-publish-android-release`](file:///.agents/skills/dw-publish-android-release/SKILL.md)
* **Agente afín:** `dw-android-release`
* **Propósito:** Flujo automatizado para compilar APK con Gradle, comprimir el bundle OTA y subir la Release a GitHub con sus dos assets.
* **Triggers:** *"compilar apk"*, *"publicar release"*, *"subir nueva versión a github"*, *"hacer release android"*.

---

## 4. Flujo de Orquestación y Meta-Creación

```text
               ┌───────────────────────────────────────┐
               │         dw-orchestrator               │
               │   (Recibe problema del usuario)       │
               └───────────────────────────────────────┘
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
      ¿Existe el perfil?                       ¿Falta especialidad?
              │                                         │
              │                          ┌──────────────────────────────┐
              │                          │   CREACIÓN DINÁMICA:         │
              │                          │ 1. define_subagent           │
              │                          │ 2. .agents/agents/<name>.md  │
              │                          │ 3. .agents/skills/<name>.md  │
              │                          └──────────────────────────────┘
              │                                         │
              └────────────────────┬────────────────────┘
                                   │
                                   ▼
             ┌───────────────────────────────────────────┐
             │            Despacho y Coordinación        │
             │   (invoke_subagent en orden de valor)     │
             └───────────────────────────────────────────┘
                                   │
         ┌─────────────────┬───────┴─────────┬─────────────────┐
         ▼                 ▼                 ▼                 ▼
   dw-data-engine   dw-architect-dev   dw-ui-designer    dw-mobile-pwa ...
         │                 │                 │                 │
         └─────────────────┴───────┬─────────┴─────────────────┘
                                   │
                                   ▼
             ┌───────────────────────────────────────────┐
             │               dw-tester-qa                │
             │   (Valida build, linter y diagnósticos)   │
             └───────────────────────────────────────────┘
                                   │
                                   ▼ (Pruebas aprobadas)
             ┌───────────────────────────────────────────┐
             │            dw-android-release             │
             │   (Si la tarea requiere release / APK)    │
             └───────────────────────────────────────────┘
                                   │
                                   ▼
                       [Informe Final al Usuario]
```

---

## 5. Cómo Usar al Orquestador

Para resolver cualquier problema o requerimiento complejo, simplemente dirígete a **`dw-orchestrator`**:

- *"dw-orchestrator, tenemos un bug en el cálculo de distancias del mapa interactivo cuando se seleccionan más de 4 nodos."*
- *"dw-orchestrator, necesitamos añadir un nuevo sistema de efectos de sonido ambientales de las Bóvedas Dragonkin."* ➔ *(Detectará que falta un especialista en audio, creará `dw-audio-engine` y su skill, e implementará la función).*
- *"dw-orchestrator, prepara y publica una nueva versión v1.0.8 con las últimas traducciones."*

---

## 6. Ubicación de Archivos en el Repositorio

### Agentes (`.agents/agents/`):
- [dw-orchestrator.md](file:///.agents/agents/dw-orchestrator.md)
- [dw-architect-dev.md](file:///.agents/agents/dw-architect-dev.md)
- [dw-tester-qa.md](file:///.agents/agents/dw-tester-qa.md)
- [dw-data-engine.md](file:///.agents/agents/dw-data-engine.md)
- [dw-mobile-pwa.md](file:///.agents/agents/dw-mobile-pwa.md)
- [dw-ui-designer.md](file:///.agents/agents/dw-ui-designer.md)
- [dw-android-release.md](file:///.agents/agents/dw-android-release.md)

### Skills (`.agents/skills/`):
- [dw-orchestration/SKILL.md](file:///.agents/skills/dw-orchestration/SKILL.md)
- [dw-refactor-component/SKILL.md](file:///.agents/skills/dw-refactor-component/SKILL.md)
- [dw-qa-diagnostics/SKILL.md](file:///.agents/skills/dw-qa-diagnostics/SKILL.md)
- [dw-data-sync/SKILL.md](file:///.agents/skills/dw-data-sync/SKILL.md)
- [dw-pwa-offline-audit/SKILL.md](file:///.agents/skills/dw-pwa-offline-audit/SKILL.md)
- [dw-dark-fantasy-styling/SKILL.md](file:///.agents/skills/dw-dark-fantasy-styling/SKILL.md)
- [dw-publish-android-release/SKILL.md](file:///.agents/skills/dw-publish-android-release/SKILL.md)
