---
name: dw-dark-fantasy-styling
description: >
  Directrices de diseño visual, Vanilla CSS y componentes SVG interactivos con
  estética Dark Fantasy de RuneScape. Define el uso de variables de diseño en
  src/styles/index.css, la calibración cartográfica de Ashenfall en SVG, modales
  pergamino y accesibilidad WCAG. Usar cuando el usuario pida "mejorar diseño",
  "estilizar componente", "ajustar mapa SVG", "cambiar colores", "microanimaciones"
  o "revisar contraste y accesibilidad".
---

# Directrices de Diseño y Estilo Dark Fantasy de RuneScape

Esta skill define los estándares visuales, la arquitectura de CSS nativo y los patrones de componentes gráficos interactivos de la aplicación.

## 1. Paleta de Color e Identidad Visual RPG

La interfaz se inspira en la estética medieval y de fantasía oscura de RuneScape:

- **Acentos Dorados:**
  - `var(--gold-300)`: Iluminaciones y hover states.
  - `var(--gold-400)` (`#e5c07b` / `#ffd700`): Color primario de acento, bordes ornamentados y títulos.
  - `var(--gold-500)`: Estados activos, botones primarios y divisores.
- **Superficies y Fondos de Piedra Rúnica:**
  - Fondo base: `#090d13` a `#0d1117`.
  - Tarjetas y contenedores: `#161b22` con bordes sutiles `rgba(255, 215, 0, 0.15)`.
  - Superficies elevadas (*Glassmorphism*): `rgba(22, 27, 34, 0.85)` con `backdrop-filter: blur(12px)`.
- **Tipografía y Legibilidad:**
  - Jerarquía clara con remates elegantes para encabezados temáticos y fuentes sin serifa de alta legibilidad para números de daño/defensa y descripciones.

---

## 2. Reglas de Estilizado en Vanilla CSS (`src/styles/index.css`)

1. **Sin Frameworks Utilitarios Pesados:**
   - Todo el diseño utiliza CSS nativo con variables CSS y selectores semánticos. No introducir Tailwind, Bootstrap ni MUI.
2. **Modularidad de Clases:**
   - Emplear prefijos de módulo coherentes (ej. `.map-hud-*`, `.item-card-*`, `.vault-detail-*`).
3. **Microanimaciones y Transiciones Fluidas:**
   - Transiciones rápidas y sutiles: `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`.
   - Efectos de brillo o *glow* dorado en hovers de tarjetas legendarias.

---

## 3. Cartografía SVG Interactiva (`src/components/map/`)

- **Capas Vectoriales (`MapTerrainSvg.jsx`):**
  - Mantener la escala base de coordenadas (1024x1024).
  - Trazado de rutas y waypoints con cálculo visual dinámico en tiempo real (`MapRouteDrawer.jsx`).
  - Marcadores de Puntos de Interés (Piedras Guía, Bóvedas, Jefes y Recursos) con iconos Iconify vectoriales escalables.
- **HUD Flotante:**
  - Botones de zoom, centrado, coordenadas y capas con estética de brújula o artefacto rúnico.

---

## 4. Accesibilidad y Responsividad

- **Contraste de Color (WCAG):** Mínimo 4.5:1 para texto estándar y 3:1 para texto de gran tamaño sobre fondos oscuros.
- **Indicadores No Exclusivos por Color:** Los estados de rareza, peligro o tipo de daño deben combinarse siempre con texto o iconos (no solo color).
- **Adaptabilidad Multiplataforma:**
  - Pantallas móviles compactas: 320px a 480px.
  - Tablets y dispositivos táctiles: 768px a 1024px.
  - Monitores de escritorio y ultra-panorámicos: hasta 4K.

