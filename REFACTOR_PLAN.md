# Plan de Refactorización y Atomización de Componentes

Este documento define la hoja de ruta para descomponer los componentes monolíticos de la aplicación en submódulos atómicos, facilitando el mantenimiento, la legibilidad y garantizando que la aplicación continúe funcionando exactamente igual.

---

## 1. Principios y Reglas de Atomización

1. **Límite de tamaño**: Ningún subcomponente debe superar idealmente las **80 - 150 líneas de código**.
2. **Estructura por módulos**:
   ```text
   src/components/<modulo>/
   ├── <Modulo>.jsx         # Contenedor / orquestador principal
   ├── <SubComponenteA>.jsx  # Componente atómico con responsabilidad única
   ├── <SubComponenteB>.jsx
   └── README.md            # Documentación exhaustiva de la carpeta y sus piezas
   ```
3. **Documentación obligatoria (`README.md`)**: Cada carpeta contendrá un `.md` que explique:
   - Propósito general del módulo.
   - Detalle de cada subcomponente, sus `props` y responsabilidades.
   - Flujo de datos y dependencias.
4. **Cero regresiones**: 
   - Las interfaces públicas (`props`) de cada vista principal se mantienen 100% compatibles.
   - Cada fase se valida ejecutando `npm run build` sin errores.

---

## 2. Matriz de Complejidad de Componentes

| Fase | Componente | Líneas Originales | Nivel de Complejidad | Estado | Factores Clave |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **1** | `SkillsGuide` | 117 | ⭐ (Muy baja) | ✅ Completado | Modularizado en `src/components/skills/` (Hero, Skills, Facilities, Regions, README.md). |
| **2** | `LoreViewer` | 129 | ⭐ (Muy baja) | ✅ Completado | Modularizado en `src/components/lore/` (Hero, ChapterSelector, ChapterReader, README.md). |
| **3** | `ItemCard` / `Header` | 104 - 128 | ⭐ (Baja) | ✅ Completado | Modularizado en `src/components/header/` y `src/components/itemCard/` con sus respectivos README.md. |
| **4** | `SpellsViewer` | 325 | ⭐⭐ (Baja-Media) | ✅ Completado | Modularizado en `src/components/spells/` (FilterBar, Banner, Card, DetailModal, README.md). |
| **5** | `Navigation` | 357 | ⭐⭐ (Media) | ✅ Completado | Modularizado en `src/components/navigation/` (DesktopNav, CategorySubmenu, MobileBottomNav, MobileMoreDrawer, README.md). |
| **6** | `ItemModal` | 379 | ⭐⭐⭐ (Media) | ✅ Completado | Modularizado en `src/components/itemModal/` (Header, Tabs, StatsTab, RecipeTab, UsedInTab, UpgradesTab, JournalTab, Footer, README.md). |
| **7** | `UpdateModal` | 457 | ⭐⭐⭐ (Media) | ✅ Completado | Modularizado en `src/components/update/` (Header, VersionBanner, Changelog, Progress, Footer, README.md). |
| **8** | `LoadoutBuilder` | 503 | ⭐⭐⭐ (Media-Alta) | ✅ Completado | Modularizado en `src/components/loadout/` (EquipmentDoll, EquipmentSlot, LoadoutStatsPanel, SlotItemPickerModal, CandidateItemRow, slotsConfig, README.md). |
| **9** | `ItemCatalog` | 616 | ⭐⭐⭐⭐ (Alta) | ✅ Completado | Modularizado en `src/components/items/` (CategoryHub, CatalogNavBar, CatalogFilters, CatalogResultsHeader, ItemGrid, categoryConfig, README.md). |
| **10** | `VaultsViewer` | 757 | ⭐⭐⭐⭐ (Alta) | ✅ Completado | Modularizado en `src/components/vaults/` (VaultsHeroBanner, VaultFilterBar, VaultCard, VaultDetailTopBar, VaultHeroCard, VaultHazards, VaultEnemies, VaultLoot, VaultChests, VaultResources, VaultLightbox, vaultsConstants, README.md). |
| **11** | `MainMenu` | 765 | ⭐⭐⭐⭐ (Alta) | ✅ Completado | Modularizado en `src/components/mainMenu/` (HeroBanner, OmniSearch, SearchDropdownResults, MetricsBar, PersonalHub, PortalsGrid, portalsConfig, CategoryExplorer, SurvivalTips, MenuFooter, README.md). |
| **12** | `QuestViewer` | 817 | ⭐⭐⭐⭐ (Alta) | ✅ Completado | Modularizado en `src/components/quests/` (QuestFilterBar, QuestProgressBanner, QuestCard, QuestDetailModal, QuestGuideTab, QuestRequirementsTab, QuestEnemiesTab, QuestRewardsTab, questConstants, README.md). |
| **13** | `CraftingPlanner` | 840 | ⭐⭐⭐⭐⭐ (Muy Alta) | ✅ Completado | Modularizado en `src/components/crafting/` (craftingUtils, EmptyState, Header, StatCards, TargetItemRow, RecipeTreeNode, MaterialsTabs, RawMaterialsView, DirectMaterialsView, WorkstationsView, README.md). |
| **14** | `InteractiveMap` | 1.171 | ⭐⭐⭐⭐⭐ (Máxima) | ✅ Completado | Modularizado en `src/components/map/` (mapConstants, mapUtils, MapTopBar, MapCategoryBar, MapHudControls, MapTerrainSvg, MapPoiDetailCard, MapRouteDrawer, README.md). |

---

## 3. Registro de Ejecución y Validaciones
- **Fase 1 (`SkillsGuide`)** [✅ Completado]:
  - `src/components/skills/SkillsGuide.jsx` (~26 líneas): Contenedor orquestador.
  - `src/components/skills/SkillsHero.jsx` (~18 líneas): Banner hero explicativo.
  - `src/components/skills/SkillsSection.jsx` (~55 líneas): Listado de habilidades.
  - `src/components/skills/FacilitiesSection.jsx` (~42 líneas): Listado de estaciones de forja.
  - `src/components/skills/RegionsSection.jsx` (~42 líneas): Listado de regiones y peligro.
  - `src/components/skills/README.md`: Documentación completa de la carpeta, responsabilidades y diagrama de flujo.
  - Re-export de retrocompatibilidad en `src/components/SkillsGuide.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores.
- **Fase 2 (`LoreViewer`)** [✅ Completado]:
  - `src/components/lore/LoreViewer.jsx` (~28 líneas): Contenedor orquestador.
  - `src/components/lore/LoreHero.jsx` (~32 líneas): Banner con título y presentación de crónicas.
  - `src/components/lore/ChapterSelector.jsx` (~56 líneas): Selector lateral de capítulos con estado visual activo e iconos.
  - `src/components/lore/ChapterReader.jsx` (~54 líneas): Renderizado en pergamino del capítulo seleccionado y citas.
  - `src/components/lore/README.md`: Documentación completa de la carpeta, responsabilidades y diagrama de flujo.
  - Re-export de retrocompatibilidad en `src/components/LoreViewer.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores.
- **Fase 3 (`Header` y `ItemCard`)** [✅ Completado]:
  - `src/components/header/Header.jsx` (~75 líneas): Contenedor orquestador con detección de PWA/Capacitor.
  - `src/components/header/HeaderBrand.jsx` (~20 líneas): Logotipo, título y navegación rápida al inicio.
  - `src/components/header/HeaderActions.jsx` (~45 líneas): Botones de Crafteo, Favoritos (con contadores) e instalación PWA.
  - `src/components/header/README.md`: Documentación completa de props y flujo de eventos del Header.
  - `src/components/itemCard/ItemCard.jsx` (~35 líneas): Contenedor orquestador con click handler.
  - `src/components/itemCard/ItemCardTop.jsx` (~45 líneas): Cabecera con imagen, fallback, nombre, cresta de poder y tipo.
  - `src/components/itemCard/ItemCardStats.jsx` (~35 líneas): Píldoras de daño, armadura, bloqueo, durabilidad y recetas.
  - `src/components/itemCard/ItemCardActions.jsx` (~40 líneas): Botones de crafteo, favoritos con icono RPG `flat-star` y "Ver Ficha".
  - `src/components/itemCard/README.md`: Documentación completa de props y flujo de eventos de ItemCard.
  - Re-exports de compatibilidad en `src/components/Header.jsx`, `src/components/ItemCard.jsx` y subcarpeta `common/`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.54s).
- **Fase 4 (`SpellsViewer`)** [✅ Completado]:
  - `src/components/spells/SpellsViewer.jsx` (~110 líneas): Contenedor orquestador con filtrado de texto y categoría.
  - `src/components/spells/SpellFilterBar.jsx` (~48 líneas): Barra de búsqueda y chips de categorías mágicas con iconos.
  - `src/components/spells/SpellsBanner.jsx` (~32 líneas): Banner temático del grimorio con contador de hechizos.
  - `src/components/spells/SpellCard.jsx` (~120 líneas): Tarjeta de hechizo con nivel, descripción y fichas de runas.
  - `src/components/spells/SpellDetailModal.jsx` (~104 líneas): Modal detallado con unidades de runas y enlace a la wiki.
  - `src/components/spells/README.md`: Documentación completa de props y flujo de datos del Grimorio Arcano.
  - Re-export de retrocompatibilidad en `src/components/SpellsViewer.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.53s).
- **Fase 5 (`Navigation`)** [✅ Completado]:
  - `src/components/navigation/Navigation.jsx` (~36 líneas): Contenedor orquestador adaptable responsive.
  - `src/components/navigation/DesktopNav.jsx` (~145 líneas): Sidebar de escritorio con badges numéricos y secciones.
  - `src/components/navigation/CategorySubmenu.jsx` (~35 líneas): Submenú desplegable interactivo de categorías de ítems.
  - `src/components/navigation/MobileBottomNav.jsx` (~75 líneas): Barra inferior fija táctil de 5 pestañas con botón central elevado de Inicio.
  - `src/components/navigation/MobileMoreDrawer.jsx` (~95 líneas): Menú modal deslizante con el resto de secciones secundarias.
  - `src/components/navigation/README.md`: Documentación completa de props, responsabilidades y diagrama de navegación.
  - Re-export de retrocompatibilidad en `src/components/Navigation.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.56s).
- **Fase 6 (`ItemModal`)** [✅ Completado]:
  - `src/components/itemModal/ItemModal.jsx` (~75 líneas): Contenedor orquestador del modal con gestión de pestañas y overlay.
  - `src/components/itemModal/ItemModalHeader.jsx` (~45 líneas): Cabecera con imagen, fallback, nombre, poder y cierre.
  - `src/components/itemModal/ItemModalTabs.jsx` (~55 líneas): Barra de pestañas condicionales (Estadísticas, Receta, Usos, Mejoras, Diario).
  - `src/components/itemModal/ItemStatsTab.jsx` (~90 líneas): Grid de propiedades de combate, durabilidad, peso y efectos especiales.
  - `src/components/itemModal/ItemRecipeTab.jsx` (~40 líneas): Estación de forja, habilidad/XP y chips de materiales navegables.
  - `src/components/itemModal/ItemUsedInTab.jsx` (~35 líneas): Listado de recetas en las que este objeto sirve de ingrediente.
  - `src/components/itemModal/ItemUpgradesTab.jsx` (~45 líneas): Tabla de progresión y núcleos de la Fragua Mística.
  - `src/components/itemModal/ItemJournalTab.jsx` (~20 líneas): Pergamino con la crónica y diario de trasfondo.
  - `src/components/itemModal/ItemModalFooter.jsx` (~65 líneas): Acciones para equipar, añadir a crafteo, favoritos, ver en mapa y wiki.
  - `src/components/itemModal/README.md`: Documentación completa de arquitectura, props y diagrama de flujo.
  - Re-exports de compatibilidad en `src/components/ItemModal.jsx` y `src/components/items/ItemModal.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.54s).
- **Fase 7 (`UpdateModal`)** [✅ Completado]:
  - `src/components/update/UpdateModal.jsx` (~140 líneas): Contenedor orquestador de actualización con máquina de estados y listener OTA de Capacitor.
  - `src/components/update/UpdateHeader.jsx` (~35 líneas): Cabecera con icono, título y cierre condicional.
  - `src/components/update/UpdateVersionBanner.jsx` (~55 líneas): Comparativa visual de versión actual vs disponible, fecha y pesos.
  - `src/components/update/UpdateChangelog.jsx` (~55 líneas): Desglose estructurado de notas de lanzamiento Markdown con viñetas.
  - `src/components/update/UpdateProgress.jsx` (~90 líneas): Barra de progreso de descarga, aviso de reinicio y manejo de errores.
  - `src/components/update/UpdateFooter.jsx` (~65 líneas): Botones de actualización en caliente (OTA), descarga de APK y enlace GitHub.
  - `src/components/update/README.md`: Documentación completa de ciclo de vida OTA, props y diagrama de estados.
  - Re-export de retrocompatibilidad en `src/components/UpdateModal.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.57s).
- **Fase 8 (`LoadoutBuilder`)** [✅ Completado]:
  - `src/components/loadout/LoadoutBuilder.jsx` (~175 líneas): Contenedor orquestador del simulador y cálculo de totales acumulados.
  - `src/components/loadout/slotsConfig.js` (~125 líneas): Archivo de configuración modular de las 10 ranuras, filtros y palabras clave.
  - `src/components/loadout/EquipmentDoll.jsx` (~40 líneas): Muñeco de equipamiento con cuadrícula visual de ranuras.
  - `src/components/loadout/EquipmentSlot.jsx` (~50 líneas): Ranura individual con icono o imagen equipada y botón para desequipar.
  - `src/components/loadout/LoadoutStatsPanel.jsx` (~80 líneas): Panel de estadísticas totales (Poder promedio, Daño, Armadura, Bloqueo, Peso).
  - `src/components/loadout/SlotItemPickerModal.jsx` (~150 líneas): Modal de selección con buscador, subtipos y filtro por tiers de poder.
  - `src/components/loadout/CandidateItemRow.jsx` (~42 líneas): Fila interactiva de objeto candidato para equipar en el slot.
  - `src/components/loadout/README.md`: Documentación completa de arquitectura, props y diagrama de flujo.
  - Re-export de retrocompatibilidad en `src/components/LoadoutBuilder.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (2.51s).
- **Fase 9 (`ItemCatalog`)** [✅ Completado]:
  - `src/components/items/categoryConfig.js` (~135 líneas): Diccionarios estáticos de categorías (`CATEGORY_DEFINITIONS`) y subcategorías (`SUBCATEGORIES_CONFIG`).
  - `src/components/items/CategoryHub.jsx` (~114 líneas): Cuadrícula de tipos de objetos, buscador general con desplegable flotante y tarjetas interactivas.
  - `src/components/items/CatalogNavBar.jsx` (~49 líneas): Barra de retorno al Hub, icono de categoría, título y contador de ítems disponibles.
  - `src/components/items/CatalogFilters.jsx` (~144 líneas): Buscador de filtrado directo, selector de subcategorías, selector de Tiers de Poder (T1-9) y ordenamiento.
  - `src/components/items/CatalogResultsHeader.jsx` (~28 líneas): Conteo de objetos visibles vs totales y botón condicional de "Limpiar Filtros".
  - `src/components/items/ItemGrid.jsx` (~56 líneas): Cuadrícula con `ItemCard`, estado vacío con icono `Flame` y paginación con "Cargar Más Objetos (+48)".
  - `src/components/items/ItemCatalog.jsx` (~238 líneas): Contenedor orquestador principal con memoización de búsqueda, categorías y ordenación.
  - `src/components/items/README.md`: Documentación completa de arquitectura, props y diagrama de flujo Mermaid.
  - Re-export de retrocompatibilidad en `src/components/ItemCatalog.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (2.12s).
- **Fase 10 (`VaultsViewer`)** [✅ Completado]:
  - `src/components/vaults/vaultsConstants.js` (~10 líneas): Mapeo de paleta visual y bordes por nivel de poder (`POWER_LEVEL_COLORS`).
  - `src/components/vaults/VaultsHeroBanner.jsx` (~40 líneas): Banner de cabecera con contador dinámico de 12 bóvedas, cofres, núcleos y recetas.
  - `src/components/vaults/VaultFilterBar.jsx` (~75 líneas): Barra de búsqueda reactiva con normalización y filtros select por región geográfica y nivel.
  - `src/components/vaults/VaultCard.jsx` (~105 líneas): Tarjeta del catálogo con tags de nivel/cofres, resumen, chips de botín y enlaces directos a la guía y al mapa.
  - `src/components/vaults/VaultDetailTopBar.jsx` (~45 líneas): Barra sticky de retorno al índice con botones para enfocar en mapa interactivo y abrir wiki oficial.
  - `src/components/vaults/VaultHeroCard.jsx` (~70 líneas): Infobox visual con portada, nivel de peligro, fecha de lanzamiento y núcleos requeridos.
  - `src/components/vaults/VaultHazards.jsx` (~40 líneas): Sección de trampas y peligros de la bóveda con explicación de mecánicas.
  - `src/components/vaults/VaultEnemies.jsx` (~105 líneas): Tablas de enemigos estándar, espectrales (Soulrifted) y tarjeta de jefe de cámara.
  - `src/components/vaults/VaultLoot.jsx` (~65 líneas): Cuadrícula de botín notable y recetas de forja desbloqueables en efigies.
  - `src/components/vaults/VaultChests.jsx` (~75 líneas): Guía ilustrada de cofres secretos con miniaturas interactivas para zoom.
  - `src/components/vaults/VaultResources.jsx` (~65 líneas): Desglose de yacimientos de minería, plantas y objetos recolectables.
  - `src/components/vaults/VaultLightbox.jsx` (~35 líneas): Modal de pantalla completa para inspeccionar capturas de cofres en alta resolución.
  - `src/components/vaults/VaultsViewer.jsx` (~190 líneas): Orquestador principal de estado, sincronización de props y cambio entre catálogo y detalle.
  - `src/components/vaults/README.md`: Documentación completa de arquitectura, tabla de props y diagrama de flujo Mermaid.
  - Re-export de retrocompatibilidad en `src/components/VaultsViewer.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.88s).
- **Fase 11 (`MainMenu`)** [✅ Completado]:
  - `src/components/mainMenu/portalsConfig.js` (~110 líneas): Diccionario de configuración y metadatos de los 9 portales interactivos del juego.
  - `src/components/mainMenu/SearchDropdownResults.jsx` (~130 líneas): Desplegable estructurado de resultados en vivo (Ítems, Bóvedas, Quests, Hechizos y POIs).
  - `src/components/mainMenu/OmniSearch.jsx` (~90 líneas): Barra de búsqueda global con filtrado multientidad simultáneo y gestión de foco.
  - `src/components/mainMenu/HeroBanner.jsx` (~40 líneas): Sección Hero con orbe de brillo, títulos principales e integración de OmniSearch.
  - `src/components/mainMenu/MetricsBar.jsx` (~55 líneas): Barra de contadores rápidos y accesos directos al Códice, Misiones, Hechizos y Mapa.
  - `src/components/mainMenu/PersonalHub.jsx` (~100 líneas): Panel de seguimiento de favoritos guardados, materiales en crafteo y ranuras equipadas.
  - `src/components/mainMenu/PortalsGrid.jsx` (~65 líneas): Cuadrícula responsiva de los 9 portales principales con efectos luminosos perimetrales.
  - `src/components/mainMenu/CategoryExplorer.jsx` (~45 líneas): Accesos rápidos para explorar el catálogo por categorías clave de objetos.
  - `src/components/mainMenu/SurvivalTips.jsx` (~48 líneas): Fichas informativas con consejos de viaje rápido, crafteo y build de combate.
  - `src/components/mainMenu/MenuFooter.jsx` (~80 líneas): Pie de página con copyright, versión nativa y comprobador de actualizaciones OTA para Android.
  - `src/components/mainMenu/MainMenu.jsx` (~85 líneas): Contenedor orquestador modular limpio.
  - `src/components/mainMenu/README.md`: Documentación completa de arquitectura, tabla de props y diagrama de flujo Mermaid.
  - Re-export de retrocompatibilidad en `src/components/MainMenu.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.49s).
- **Fase 12 (`QuestViewer`)** [✅ Completado]:
  - `src/components/quests/questConstants.js` (~8 líneas): Mapeo de paleta visual y bordes por nivel de dificultad (`DIFFICULTY_COLORS`).
  - `src/components/quests/QuestFilterBar.jsx` (~100 líneas): Buscador con lemas españoles, selector de dificultad, tipo (Principal/Secundaria) y chips de estado con contadores.
  - `src/components/quests/QuestProgressBanner.jsx` (~45 líneas): Banner de cabecera con contador de 39 misiones traducidas y barra de porcentaje de progreso total.
  - `src/components/quests/QuestCard.jsx` (~130 líneas): Tarjeta interactiva con botón de alternancia cíclica de estado, punto de inicio, objetos requeridos y accesos a guía y mapa.
  - `src/components/quests/QuestGuideTab.jsx` (~85 líneas): Pestaña de walkthrough con sinopsis y checklist interactivo por paso persistido en `localStorage`.
  - `src/components/quests/QuestRequirementsTab.jsx` (~65 líneas): Desglose de requisitos previos, objetos obligatorios y objetos recomendados.
  - `src/components/quests/QuestEnemiesTab.jsx` (~25 líneas): Pestaña condicional de amenazas, criaturas y jefes a enfrentar.
  - `src/components/quests/QuestRewardsTab.jsx` (~25 líneas): Listado de recompensas en experiencia, oro y objetos.
  - `src/components/quests/QuestDetailModal.jsx` (~135 líneas): Modal estructurado con navegación por 4 pestañas, callout de punto de inicio fijo y acciones de cierre/mapa/wiki.
  - `src/components/quests/QuestViewer.jsx` (~140 líneas): Orquestador principal de estado, persistencia dual en `localStorage` y renderizado de tarjetas.
  - `src/components/quests/README.md`: Documentación completa de arquitectura, tabla de props y diagrama de flujo Mermaid.
  - Re-export de retrocompatibilidad en `src/components/QuestViewer.jsx` y actualización de importación en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.48s).
- **Fase 13 (`CraftingPlanner`)** [✅ Completado]:
  - `src/components/crafting/craftingUtils.js` (~190 líneas): Funciones puras de cálculo matemático, resolución recursiva de árboles de recetas (`buildItemTree`), materias primas base con propósitos de transformación (`calculateRawBaseMaterials`), materiales directos (`calculateDirectMaterials`), ordenación por estaciones de trabajo (`calculateWorkstationSteps`) y suma de XP (`calculateTotalCraftingXp`).
  - `src/components/crafting/CraftingEmptyState.jsx` (~20 líneas): Estado visual y llamada a la acción amigable cuando el taller no contiene objetivos seleccionados.
  - `src/components/crafting/CraftingPlannerHeader.jsx` (~35 líneas): Cabecera con título decorativo, badge 'Multi-Nivel', contador dinámico y botón para vaciar la lista.
  - `src/components/crafting/CraftingStatCards.jsx` (~35 líneas): Tres tarjetas métricas de resumen rápido (recursos base puros, estaciones de trabajo requeridas y experiencia total acumulada).
  - `src/components/crafting/RecipeTreeNode.jsx` (~100 líneas): Componente recursivo para dibujar las ramas genealógicas de la receta con badges de estaciones, recursos base y navegación al ítem.
  - `src/components/crafting/CraftingTargetItemRow.jsx` (~140 líneas): Fila de cada objetivo a fabricar con controles de incremento/decremento numérico, botón de eliminación y conmutador colapsable para inspeccionar su desglose jerárquico.
  - `src/components/crafting/CraftingMaterialsTabs.jsx` (~85 líneas): Selector de modos de visualización (Materia Prima Base, Materiales Directos, Guía por Estaciones), porcentaje de cumplimiento y barra animada de progreso.
  - `src/components/crafting/CraftingRawMaterialsView.jsx` (~95 líneas): Vista 1 con checklist interactivo de recursos recolectables en minas/mundo con propósitos de transformación y disparo de confeti al completar el 100%.
  - `src/components/crafting/CraftingDirectMaterialsView.jsx` (~75 líneas): Vista 2 con checklist de ingredientes directos para el ensamblaje en el banco de trabajo.
  - `src/components/crafting/CraftingWorkstationsView.jsx` (~105 líneas): Vista 3 con la ruta recomendada numerada paso a paso a través de las diferentes estaciones de trabajo con XP e ingredientes de entrada.
  - `src/components/crafting/CraftingPlanner.jsx` (~175 líneas): Contenedor orquestador modular limpio que coordina los estados reactivos, llamadas con confeti y montaje de subcomponentes.
  - `src/components/crafting/README.md`: Documentación completa de arquitectura, tabla de props y diagrama de flujo Mermaid.
  - Re-export de retrocompatibilidad en `src/components/CraftingPlanner.jsx` y actualización de importación directa en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.51s).
- **Fase 14 (`InteractiveMap`)** [✅ Completado]:
  - `src/components/map/mapConstants.js` (~30 líneas): Metadatos de categorías (`CATEGORY_META`), constantes de escala métrica y claves centralizadas de almacenamiento en `localStorage`.
  - `src/components/map/mapUtils.js` (~70 líneas): Funciones puras de cálculo geométrico de distancias de ruta ($1\text{ px} \approx 4.2\text{ m}$), velocidad de viaje ($4.5\text{ m/s}$), estimación de tiempo y filtrado optimizado con normalización de caracteres.
  - `src/components/map/MapTopBar.jsx` (~60 líneas): Barra superior de herramientas con título, subtítulo decorativo, buscador interactivo con borrado rápido y botón desplegable de planificador de rutas con badge métrico en km.
  - `src/components/map/MapCategoryBar.jsx` (~35 líneas): Barra de desplazamiento horizontal con chips de filtrado por categoría (Piedras Guía, Bóvedas, Misiones, Jefes, Marcadores Propios) y contadores dinámicos.
  - `src/components/map/MapHudControls.jsx` (~85 líneas): HUD flotante superpuesto con monitor de coordenadas $X/Y$, indicador de colocación de pines, zoom, reinicio de cámara, cambio de capa satélite/pergamino y rosa de los vientos de Ashenfall.
  - `src/components/map/MapTerrainSvg.jsx` (~260 líneas): Lienzo vectorial SVG completo de 1024x1024 px con capa satelital de alta resolución, capa cartográfica de biomas, etiquetas multilínea de regiones con Tiers, polilíneas de ruta animadas (`animated-route-line`) y pines interactivos con auras de pulso.
  - `src/components/map/MapPoiDetailCard.jsx` (~120 líneas): Tarjeta modal flotante de inspección de puntos de interés con banner, badge externo a Wiki, chips de botín y materiales, botón de enlace directo a la guía de Bóveda y acciones de ruta y centrado.
  - `src/components/map/MapRouteDrawer.jsx` (~160 líneas): Panel deslizante de gestión de ruta activa con métricas de distancia y tiempo estimado, lista de waypoints con checkboxes de completado persistidos, reordenación, rutas predefinidas y biblioteca de guardado.
  - `src/components/map/InteractiveMap.jsx` (~260 líneas): Contenedor orquestador modular limpio que administra transformaciones de vista, eventos táctiles con pinch-to-zoom, arrastre de ratón y enfoque desde módulos externos.
  - `src/components/map/README.md`: Documentación completa de arquitectura, tabla de props y diagrama de flujo Mermaid.
  - Re-export de retrocompatibilidad en `src/components/InteractiveMap.jsx` y actualización de importación directa en `src/App.jsx`.
  - Validación de compilación: `npm run build` ejecutado exitosamente con 0 errores (1.48s).

---

## 4. Conclusión del Plan Maestro de Refactorización

🎉 **¡14 de 14 Fases Completadas con Éxito (100%)!**
- Toda la base de código de componentes de la aplicación ha sido modularizada, atomizada y desacoplada de archivos monolíticos gigantescos a submódulos limpios, con responsabilidades únicas y separación estricta de lógica de negocio y presentación.
- Cada módulo cuenta con su propio archivo `README.md` exhaustivo con tabla de props y diagramas Mermaid.
- Se mantiene el 100% de retrocompatibilidad mediante re-exports transparentes.
- Cero regresiones en la interfaz pública y compilación validada con 0 errores en todos los módulos.


