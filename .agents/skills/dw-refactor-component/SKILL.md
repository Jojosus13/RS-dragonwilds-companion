---
name: dw-refactor-component
description: >
  Procedimiento estructurado para refactorizar y atomizar componentes en Dragonwilds
  siguiendo REFACTOR_PLAN.md. Divide vistas monolíticas en subcomponentes atómicos de
  80 a 150 líneas, crea el orquestador principal, genera el README.md del módulo y
  mantiene retrocompatibilidad. Usar cuando el usuario pida "atomizar componente",
  "refactorizar vista", "modularizar módulo" o al ejecutar fases de REFACTOR_PLAN.md.
---

# Procedimiento de Refactorización y Atomización de Componentes

Esta skill implementa la metodología de atomización modular establecida en `REFACTOR_PLAN.md` para React 19 y Vite en Dragonwilds.

## 1. Reglas Fundamentales de Atomización

1. **Límite de Tamaño:** Ningún subcomponente debe superar idealmente las **80 - 150 líneas de código**.
2. **Estructura Modular Obligatoria:**
   ```text
   src/components/<modulo>/
   ├── <Modulo>.jsx          # Contenedor / orquestador principal (estado y eventos)
   ├── <SubComponenteA>.jsx   # Componente atómico con responsabilidad única
   ├── <SubComponenteB>.jsx
   ├── <modulo>Constants.js  # Constantes, configuraciones o tabs del módulo
   └── README.md             # Documentación técnica completa
   ```
3. **Retrocompatibilidad:** Mantener un archivo re-export en la raíz de `src/components/<Modulo>.jsx` para que las importaciones existentes de `App.jsx` u otros módulos continúen funcionando sin romperse:
   ```javascript
   export { default } from './<modulo>/<Modulo>';
   ```
4. **Cero Regresiones:** El módulo refactorizado debe conservar al 100% sus props públicas y comportamiento visual/interactivo.

---

## 2. Flujo de Ejecución Paso a Paso

### Paso 1: Análisis del Componente Original
- Leer el componente monolítico completo.
- Identificar responsabilidades:
  - ¿Qué parte es cabecera/banner?
  - ¿Qué parte es barra de filtros/búsqueda?
  - ¿Qué parte es la lista/rejilla de elementos o tarjetas?
  - ¿Qué parte son modales de detalle o pestañas?
  - ¿Qué funciones de utilidad o constantes pueden desacoplarse?

### Paso 2: Creación de la Carpeta y Subcomponentes Atómicos
- Crear el directorio `src/components/<modulo>/`.
- Extraer las constantes a `<modulo>Constants.js` si superan 15-20 líneas.
- Crear cada subcomponente atómico (`<SubComponente>.jsx`) asegurando:
  - Declaración limpia de `props`.
  - Responsabilidad única de renderizado o interacción aislada.
  - Límite estricto de 80 a 150 líneas.

### Paso 3: Creación del Contenedor Orquestador (`<Modulo>.jsx`)
- Enlazar el estado local (`useState`, `useMemo`, `useCallback`).
- Manejar la persistencia (`localStorage`) si corresponde.
- Importar y orquestar los subcomponentes atómicos.

### Paso 4: Redacción Obligatoria del `README.md`
Cada carpeta modular **debe** incluir un archivo `README.md` con:
1. Propósito general del módulo.
2. Tabla de subcomponentes, sus `props` y responsabilidades.
3. Flujo de datos y diagrama de eventos.
4. Historial de atomización y dependencias externas.

### Paso 5: Validación Técnica Pre-Commit
Ejecutar la compilación para certificar cero errores de tipado o imports:
```powershell
cmd.exe /c "npm run build"
```
Si el build falla, corregir imports o props faltantes inmediatamente antes de reportar la tarea como completada.

