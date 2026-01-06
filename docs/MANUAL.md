# User Manual: Multibase Calculator (PY01)

## Introduction

This calculator allows you to perform basic arithmetic operations (+, -, *, /) using numbers in different bases (from 2 to 16) within the same expression.

## Input Format

Numbers must be entered in the format: `value_base`.

- **Decimal**: `10_10`
- **Binary**: `1010_2`
- **Hexadecimal**: `FF_16`
- **Octal**: `17_8`

## How to use

1. **Entering Expressions**: Use the on-screen buttons or your physical keyboard to type the expression.
   - Example: `10_10 + (2_10 * (5_10 - 3_10) + 7_10) * 5_10`
2. **Executing**: Click the **"="** button or press **Enter**.
3. **Choosing Base**: A dialog will appear. Enter the base for the result (2-16) and click **OK**.
4. **Viewing History**: Click **"Ver historial"** to see previous calculations.

## Important Rules

- **Positives Only**: You can only input positive numbers.
- **Valid Digits**: Ensure digits match the base (e.g., `2_2` is invalid).
- **No Consecutive Operators**: Avoid sequences like `++` or `*/`.
- **No Empty Parentheses**: `()` will trigger an error.

## Error Messages

The calculator will provide specific messages if an invalid input is detected, such as "La base es inválida", "Dígitos inválidos", or "Operadores consecutivos".
