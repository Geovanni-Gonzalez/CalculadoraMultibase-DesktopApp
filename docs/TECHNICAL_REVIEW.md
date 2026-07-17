# TECHNICAL_REVIEW — CalculadoraMultibase-DesktopApp

Fecha de revisión: 2026-07-16
Método: análisis estático, enunciado (`docs/Enunciado_CalculadoraMultibase_PY01.md`), CI y git. Sin ejecución (app Electron interactiva).

## 1. Comprensión del proyecto

Calculadora de escritorio **Electron** (~1,060 LOC JS propios) que opera y convierte entre bases numéricas arbitrarias implementando la **aritmética dígito a dígito** (sin convertir a decimal con `parseInt`): `suma`, `resta`, `multiplicacion`, `division` por base, conversión entre bases con seguimiento de pasos (`getSteps`) para mostrarlos en la UI, y evaluación de expresiones (`ordenarExpresion`/`calcular`). El cálculo corre en un **worker** (`calc_worker.js`) para no bloquear el renderer.

## 2. Fortalezas

1. `math_core.js` (712 LOC) implementa la aritmética multibase a mano — comparación de magnitudes (`esMayor`), acarreos, préstamos, dígitos A-F — que es exactamente lo que el enunciado evalúa; con **traza de pasos** como extra didáctico.
2. Separación Electron correcta: `main.js` (29 LOC, solo bootstrap) / `renderer.js` (UI) / worker (cálculo) / core puro (testeable).
3. `node_modules` correctamente ignorado (verificado: 0 archivos trackeados) pese a existir en disco.

## 3. Debilidades y riesgos

| Hallazgo | Severidad | Nota |
|---|---|---|
| Sin tests — `math_core.js` es puro y el candidato ideal del portafolio para unit tests exhaustivos (casos de acarreo, bases límite 2 y 16, división con resto) | Media | |
| `node_modules/` completo en disco dentro de `src/` (incluye `electron.exe`, DLLs) — no trackeado pero infla la carpeta local | Baja | `rm -rf` local; se regenera con `npm install` |
| Sin capturas de la UI en README | Baja | |

## 4. Evaluación profesional

- Nivel demostrado: **Junior+/Mid en algorítmica aplicada**. La aritmética posicional a mano con traza de pasos es evidencia sólida de fundamentos; la ausencia de tests en un core 100% puro es la carencia más notoria.
- Rol en el portafolio: única pieza **Electron**; refuerza JS y algoritmos numéricos.

## 5. Recomendaciones

Ver `IMPROVEMENT_ROADMAP.md`. P1: suite de tests del core (el mejor ROI de test del portafolio).
