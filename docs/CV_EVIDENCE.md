# CV_EVIDENCE — CalculadoraMultibase-DesktopApp

Unique evidence: Electron desktop development + positional-arithmetic algorithmics.

## Resume bullets (pick & adapt)

- Built a multi-base calculator desktop app (Electron) implementing arbitrary-base arithmetic digit by digit — addition, subtraction, multiplication, and division with carries/borrows over bases 2-16 — without decimal shortcuts, including step-by-step operation traces rendered in the UI.
- Offloaded computation to a worker to keep the renderer responsive, with a clean main/renderer/worker/pure-core separation.

## Skills matrix

| Skill | Evidence | Depth | Confidence |
|---|---|---|---|
| Numeric algorithmics (positional arithmetic, base conversion) | `src/math_core.js` (712 LOC: suma/resta/multiplicacion/division per base, `esMayor`, carry/borrow handling) | Medium | High |
| Electron architecture (main/renderer/worker) | `main.js`, `renderer.js`, `calc_worker.js` | Basic-Medium | High |
| Expression evaluation | `ordenarExpresion`, `calcular` | Basic-Medium | High |

## What this project proves

- First appearance of: Electron, worker-based UI offloading, numeral-systems algorithmics.
- Reinforces: JavaScript, CI.

## ATS keywords (incremental)

Electron, desktop applications, number systems, base conversion, positional arithmetic, web workers, JavaScript.
