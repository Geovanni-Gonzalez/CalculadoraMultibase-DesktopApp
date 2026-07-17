# IMPROVEMENT_ROADMAP — CalculadoraMultibase-DesktopApp

Backlog priorizado. Impacto/Esfuerzo: Alto/Medio/Bajo.

## Quick Wins

| # | Mejora | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|
| 1 | Suite de tests para `math_core.js` (Jest/node:test): acarreos, préstamos, bases 2 y 16, división con resto, expresiones — es core puro, el mejor ROI de testing del portafolio; ejecutarla en CI | Alto | Bajo | P0 |
| 2 | `rm -rf src/node_modules` local (no trackeado; se regenera) y mover `package.json` a la raíz del repo si es viable | Bajo | Bajo | P2 |
| 3 | GitHub Topics: `electron`, `javascript`, `calculator`, `number-systems`, `desktop-app` + descripción | Medio | Bajo | P1 |
| 4 | Captura de la UI con la traza de pasos visible en el README (la traza es el diferenciador) | Medio | Bajo | P1 |

## Mejoras técnicas

| # | Mejora | Impacto | Esfuerzo | Prioridad |
|---|---|---|---|---|
| 5 | Validación de expresiones malformadas con mensajes de error en UI | Medio | Medio | P2 |
| 6 | `contextIsolation`/`preload` según prácticas actuales de seguridad Electron | Medio | Medio | P2 |

## Mejoras de GitHub

Ya presentes: CI, LICENSE, enunciado en docs, `.gitignore` correcto. Faltan: Topics (item 3), captura (item 4), badge CI en README.
