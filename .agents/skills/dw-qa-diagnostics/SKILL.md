---
name: dw-qa-diagnostics
description: >
  Suite de verificación y diagnóstico de calidad integral para Dragonwilds. Ejecuta
  la compilación Vite de producción, el análisis estático con oxlint, los tests de
  búsqueda fonética y los chequeos de integridad de datos JSON y traducción. Usar
  cuando el usuario pida "probar la app", "ejecutar tests", "diagnóstico de calidad",
  "revisar linter", "verificar si hay errores" o antes de preparar una nueva release.
---

# Procedimiento de Diagnóstico y Control de Calidad (QA)

Esta skill define la batería de pruebas y diagnósticos obligatorios para garantizar la estabilidad de la aplicación y prevenir regresiones en código o datos.

## 1. Batería de Pruebas Obligatoria

Toda auditoría de calidad debe ejecutar secuencialmente los siguientes 4 niveles de verificación:

### Nivel 1: Compilación de Producción (Vite Build)
Verifica que todos los módulos JSX, CSS y recursos estáticos compilen limpiamente sin errores de sintaxis, imports rotos o referencias indefinidas.
```powershell
cmd.exe /c "npm run build"
```
- **Criterio de éxito:** Código de salida `0` y generación exitosa del bundle en `dist/`.
- **Criterio de fallo:** Errores de resolución de rutas, syntax errors o problemas de Rollup/Vite.

### Nivel 2: Análisis Estático con Linter (Oxlint)
Detecta variables no utilizadas, variables muertas, efectos `useEffect` sin dependencias declaradas y patrones propensos a memory leaks.
```powershell
cmd.exe /c "npm run lint"
```
- **Criterio de éxito:** Cero errores bloqueantes.
- **Acción ante advertencias:** Priorizar la eliminación de parámetros o imports huérfanos generados en refactorizaciones recientes.

### Nivel 3: Test de Búsqueda Fonética y Stemming
Verifica que el motor de búsqueda en `src/utils/` normalice tildes, plurales y variaciones lingüísticas correctamente sobre más de 1.300 ítems:
```powershell
node scripts/diagnostics/test-search.js
```
- **Criterio de éxito:** Confirmar que términos con y sin tildes (ej. `"carbón"` y `"carbon"`, `"dragón"` y `"dragon"`, `"pociones"` y `"poción"`) devuelvan exactamente el mismo número de resultados esperados.

### Nivel 4: Verificación de Textos No Traducidos
Inspecciona si se han introducido descripciones, títulos o nombres en inglés en los JSON de datos:
```powershell
node scripts/diagnostics/check-untranslated.js
```
- **Criterio de éxito:** Lista de pendientes vacía o justificada bajo términos de nombres propios de RuneScape.

---

## 2. Verificaciones Adicionales de Integridad Referencial

Cuando se hayan modificado datos en `src/data/items.json`, `vaults.json` o `mapData.js`:
1. **Materiales de recetas:** Cada material listado en `item.recipe.materials[].item` debe existir como ítem válido en el catálogo.
2. **Puntos de interés del mapa:** Los marcadores con `vaultId` deben apuntar a un ID existente en `vaults.json`.

---

## 3. Formato del Reporte de Diagnóstico

Al finalizar, emitir un informe estructurado con el siguiente formato:

```markdown
### 📋 Reporte de Calidad QA
- **Build Producción:** [PASS / FAIL] (Tiempo de bundle: Xs)
- **Linter (oxlint):** [X advertencias, Y errores]
- **Búsqueda Fonética:** [PASS / FAIL] (Pruebas de acentos y stemming correctas)
- **Integridad de Datos:** [PASS / FAIL] (Traducciones y referencias validadas)

#### 🔍 Diagnóstico de Causa Raíz (si hay fallos):
- **Fichero:** `src/path/to/file.jsx:L123`
- **Causa:** Explicación técnica de la causa raíz.
- **Corrección recomendada:** Código exacto a modificar.
```

