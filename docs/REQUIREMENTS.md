# Proyecto PY01 - Calculadora Multibase

## Objetivo

Desarrollar una calculadora multibase eficiente y confiable que facilite la realización de operaciones aritméticas básicas en diferentes sistemas de numeración.

## Requisitos

- **Plataforma**: Escritorio (Node.js + Electron).
- **Entrada**: Teclado y Botones.
- **Formato**: `valor_base` (ej: `1423_5`).
- **Operaciones**: `+`, `-`, `*`, `/`.
- **Jerarquía**: Paréntesis anidados y precedencia estándar.
- **Logica**:
  - Convertir internamente a la **base más alta** utilizada antes de operar.
  - Resultado en base seleccionada por usuario.
  - **Conversión Directa**: Sin base intermedia (no pasar a base 10).
  - **Memoria**: Historial persistente hasta cierre.
- **Validaciones**:
  - No paréntesis vacíos.
  - No operadores consecutivos.
  - Solo valores positivos de entrada.
  - Detección de errores clara.
- **Restricciones Técnicas**:
  - **Eficiente** (Critical).
  - **No Regex**.
  - **No librerías externas** para math/parsing.

## Ejemplo

`10_10 + (2_10 * (5_10 - 3_10) + 7_10) * 5_10 = 65_10`
