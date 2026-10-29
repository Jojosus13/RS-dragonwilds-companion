---
name: dw-orchestration
description: >
  Metodología y protocolo de orquestación para resolver problemas complejos en
  Dragonwilds. Analiza los requerimientos, evalúa lagunas de capacidades, crea
  nuevos agentes y skills dinámicamente si es necesario, delega en paralelo o
  secuencia a los agentes especialistas (dw-*) y valida el resultado final. Usar
  cuando el usuario plantee un "problema general", pida "orquestar una tarea",
  "coordinar al equipo" o requiera múltiples áreas de la aplicación a la vez.
---

# Protocolo de Orquestación y Meta-Creación de Agentes

Esta skill describe el procedimiento estándar para analizar problemas transversales, gestionar el escuadrón de agentes y expandir sus capacidades en caliente.

## 1. Algoritmo de Triage y Descomposición

Al recibir un problema del usuario:

1. **Identificar Dominios Involucrados:**
   - ¿Requiere cambios en la interfaz o nuevos componentes? ➔ Frontend
   - ¿Requiere nuevos datos, recetas o traducciones? ➔ Data Engine
   - ¿Afecta al renderizado visual o estilo temático? ➔ UI/UX Designer
   - ¿Afecta al modo offline o navegación móvil? ➔ Mobile/PWA
   - ¿Requiere nueva compilación o release pública? ➔ Android/Release
   - ¿Requiere verificación de integridad y regresiones? ➔ QA Tester

2. **Detección de Brechas de Capacidad (Gap Analysis):**
   - Preguntarse: *¿Existe un agente con las herramientas y el rol adecuado para resolver esta necesidad específica?*
   - **Si SÍ:** Planificar la delegación a los agentes existentes.
   - **Si NO:** Activar el protocolo de **Creación Dinámica de Agentes y Skills** (Sección 2).

---

## 2. Protocolo de Creación Dinámica de Agentes y Skills

Cuando una tarea exige una disciplina no cubierta por el escuadrón base:

### Paso 1: Definición del Nuevo Agente
1. Invocar la herramienta `define_subagent`:
   - `Name`: `dw-<especialidad>` (ej. `dw-audio-engine`, `dw-i18n-lead`, etc.)
   - `Description`: Resumen claro de su función y cuándo usarlo.
   - `SystemPrompt`: Directrices detalladas, archivos que toca y normas Ponytail.
   - Habilitar `EnableWriteTools: true` y `EnableMCPTools: true`.
2. Guardar el archivo permanente en `.agents/agents/dw-<especialidad>.md`.

### Paso 2: Creación de la Skill Asociada
1. Crear el directorio `.agents/skills/dw-<procedimiento>/`.
2. Redactar el archivo `SKILL.md` con:
   - Frontmatter (`name`, `description` con triggers).
   - Pasos detallados reproducibles.
   - Comandos de terminal exactos y validación.

### Paso 3: Documentación en `AGENTS_GUIDE.md`
Actualizar la tabla resumen y el catálogo de habilidades en [AGENTS_GUIDE.md](file:///c:/Users/Jojosus/Documents/Antigravity%20Projects/wikiRunescapeDW/AGENTS_GUIDE.md).

---

## 3. Matriz de Despacho y Cadena de Ejecución

```text
               ┌───────────────────────┐
               │    dw-orchestrator    │
               └───────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
¿Falta algún rol?                     ¿Roles cubiertos?
       │                                       │
[Crear Agente/Skill]                           │
       │                                       │
       └───────────────────┬───────────────────┘
                           │
                           ▼
           ┌───────────────────────────────┐
           │     Despacho a Agentes        │
           │  (invoke_subagent en orden)   │
           └───────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
  dw-data-engine   dw-architect-dev    dw-ui-designer ...
         │                 │                 │
         └─────────────────┬─────────────────┘
                           │
                           ▼
           ┌───────────────────────────────┐
           │         dw-tester-qa          │ ──▶ (Build, linter y tests)
           └───────────────────────────────┘
                           │
                           ▼
           ┌───────────────────────────────┐
           │      dw-android-release       │ ──▶ (Si requiere release APK)
           └───────────────────────────────┘
                           │
                           ▼
               [Informe Final al Usuario]
```

---

## 4. Criterios de Entrega del Orquestador

El orquestador no finaliza su labor hasta que:
1. Todas las subtareas delegadas hayan finalizado con éxito.
2. `dw-tester-qa` confirme que `cmd.exe /c "npm run build"` y `cmd.exe /c "npm run lint"` pasan sin errores bloqueantes.
3. Se presente al usuario un informe ejecutivo consolidado indicando qué agente hizo cada parte y el estado final verificado.

