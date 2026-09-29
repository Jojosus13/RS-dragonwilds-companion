# RuneScape: Dragonwilds - Companion App y Códice Interactivo

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25_Offline-0052CC?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Idioma](https://img.shields.io/badge/Idioma-Espa%C3%B1ol_Castellano-gold)](https://github.com/Jojosus13/RS-dragonwilds-companion)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Compendio no oficial, base de datos interactiva y asistente de supervivencia para **RuneScape: Dragonwilds**. Diseñado con una interfaz *Dark Fantasy* inspirada en el universo de RuneScape, totalmente responsiva y optimizada para dispositivos móviles, tablets y ordenadores de escritorio.

---

## Características Principales

### 1. Mapa Interactivo de Ashenfall
- **Trazador de Rutas Dinámico:** Planifica y mide circuitos de farmeo y exploración con cálculo automático de distancias en kilómetros.
- **Puntos de Interés Calibrados:** Marcadores geolocalizados de Piedras Guía (*Lodestones*), Bóvedas Dragonkin, Jefes Mundiales y Misiones.
- **Tarjetas Emergentes con Imágenes Oficiales:** Vista previa con imágenes en local de las mazmorras, botín destacado, materiales y enlace directo a la Wiki oficial.
- **HUD y Coordenadas:** Sistema de coordenadas cartográficas en tiempo real (escala 1024x1024).

### 2. Cámaras y Bóvedas Dragonkin
- **Guías Completas de las 12 Bóvedas:** Desglose detallado de *Crasorak Kara*, *Thishepen Kara*, *Vertentis Kara*, *Takla Kara*, *Skeklac Kara*, *Chaktan Kara*, *Kletterbuja Kara*, *Kalistrakthen Kara*, *Vekchenven Kara*, *Skekven Kara*, *Uzzer Kara* y *Manafem Kara*.
- **Peligros y Trampas Mecánicas:** Explicación y resolución de chorros de fuego, trampas de espinas, miasma marchito y golpes de calor (*Sunscorch*).
- **Tablas de Enemigos y Jefes:** Cantidades, niveles de combate y estrategias recomendadas.
- **Guía de Cofres Secretos:** Localización y botines legendarios de cada cofre del tesoro.

### 3. Catálogo de Ítems y Base de Datos
- **Más de 1,300 objetos:** Armas de combate, armaduras, vestigios y patrones, materiales y minerales, herramientas, runas y consumibles.
- **Árbol de Crafteo y Recetas:** Visualización de materiales requeridos, estaciones de trabajo y usos de cada ingrediente.
- **Filtros Avanzados:** Búsqueda rápida fonética/stemming, filtro por categorías y ordenación por Tier/Poder, durabilidad o peso.
- **Favoritos Persistentes:** Guarda tus ítems clave en almacenamiento local (*localStorage*).

### 4. Guía de Hechizos y Runas
- Catálogo de magias categorizadas por **Combate y Daño**, **Encantamiento de Armas**, **Transmutación y Alquimia**, **Teletransporte y Movilidad**, **Defensa y Protección** y **Utilidad y Recolección**.
- Desglose de requisitos de nivel y coste exacto en runas elementales.

### 5. Gestor de Misiones y Códice de Lore
- Walkthroughs completos paso a paso de las misiones principales y secundarias de Ashenfall.
- Códice histórico con capítulos traducidos para sumergirse en el trasfondo de las tierras salvajes.

### 6. Planificador de Crafteo y Simulador de Personaje
- **Calculadora de Materiales:** Agrega múltiples objetos a tu lista y calcula automáticamente el total de recursos necesarios.
- **Simulador de Equipamiento (*Loadout*):** Equipa armas, cascos, petos, capas y amuletos para calcular las estadísticas defensivas y ofensivas totales de tu personaje.

### 7. Aplicación Web Progresiva (PWA)
- **100% Instalable y Offline:** Funciona sin conexión a internet mediante Service Worker.
- Botón de instalación integrado para Android, iOS (Safari) y escritorio.

---

## Tecnologías Utilizadas

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Estilos:** Vanilla CSS con variables de diseño, glassmorphism, paleta dorada/oscura y microanimaciones
- **Almacenamiento Local:** Web Storage API (`localStorage`)
- **PWA:** Service Worker nativo + Web App Manifest

---

## Estructura del Proyecto

```text
├── public/
│   ├── map/                # Mapa oficial de Ashenfall en alta resolución
│   ├── vaults/             # Imágenes locales de las 12 Bóvedas Dragonkin
│   ├── items/              # Iconos oficiales de ítems
│   ├── spells/             # Iconos de hechizos y runas
│   └── manifest.webmanifest# Manifiesto PWA
├── scripts/
│   ├── data/               # Archivos JSON crudos y cachés de traducción
│   ├── diagnostics/        # Scripts de validación y testeo de búsqueda
│   ├── images/             # Descarga y optimización de recursos gráficos
│   ├── scrapers/           # Extracción automatizada de datos desde la Wiki
│   ├── translations/       # Pipelines de traducción y limpieza de textos
│   └── vaults/             # Generación y procesamiento de datos de bóvedas
├── src/
│   ├── assets/             # Recursos estáticos de la aplicación
│   ├── components/         # Componentes de la interfaz de usuario
│   │   ├── crafting/       # Planificador y calculadora de crafteo
│   │   ├── items/          # Catálogo, modales y tarjetas de objetos
│   │   ├── loadout/        # Simulador de equipamiento
│   │   ├── lore/           # Lector de crónicas y códice
│   │   ├── mainMenu/       # Menú principal y explorador rápido
│   │   ├── map/            # Mapa interactivo y HUD de navegación
│   │   ├── navigation/     # Sidebar de escritorio y dock móvil
│   │   ├── quests/         # Visor y guías de misiones
│   │   ├── skills/         # Guía de supervivencia y habilidades
│   │   ├── spells/         # Catálogo de magia y runas
│   │   └── vaults/         # Guías de Bóvedas Dragonkin y lightbox
│   ├── data/               # Conjuntos de datos JSON sincronizados
│   │   ├── items.json
│   │   ├── mapData.js
│   │   ├── quests.json
│   │   ├── skills.json
│   │   ├── spells.json
│   │   └── vaults.json
│   ├── styles/             # Hoja de estilos principal (index.css)
│   ├── utils/              # Algoritmos de búsqueda y normalización de texto
│   ├── App.jsx             # Componente raíz y enrutador de vistas
│   └── main.jsx            # Punto de entrada de React
├── package.json
└── vite.config.js
```

---

## Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Jojosus13/RS-dragonwilds-companion.git
cd RS-dragonwilds-companion
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador la URL que se muestra en la terminal (por defecto `http://localhost:5173`).

### 4. Compilar para producción
```bash
npm run build
```
Los archivos optimizados se generarán en la carpeta `dist/`.

---

## Licencia

Este proyecto es de código abierto bajo la licencia [MIT](LICENSE). Todos los derechos de imágenes, nombres y marcas registradas de **RuneScape** y **Dragonwilds** pertenecen a **Jagex Ltd.**
