# Calculadora MultiBase (Proyecto PY01)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v16+-green.svg)
![Electron](https://img.shields.io/badge/Electron-Latest-blue.svg)

## 📌 Objetivo del Proyecto

Desarrollar una herramienta de escritorio eficiente y confiable para realizar operaciones aritméticas básicas entre diferentes sistemas de numeración (bases 2 a 16). Diseñada para estudiantes y profesionales que requieren flexibilidad en el manejo de bases mixtas con jerarquía de operaciones.

---

## 🚀 Características Principales

- **Soporte Multibase**: Realiza cálculos con números en bases desde la 2 hasta la 16 en una misma expresión.
- **Formato Estándar**: Uso del formato `valor_base` (ej: `1010_2`, `FF_16`, `17_8`).
- **Jerarquía de Operaciones**: Soporte completo para paréntesis anidados y precedencia matemática (multiplicación/división antes que suma/resta).
- **Conversión Eficiente**: Implementación del **Método de Horner** para conversiones directas entre bases sin pasar por base 10 intermedia, garantizando rendimiento $O(N)$.
- **Arquitectura Modular**: Separación clara entre el núcleo matemático (`math_core.js`) y el controlador de interfaz (`renderer.js`).
- **Historial Persistente**: Registro de operaciones que se mantiene guardado incluso después de reiniciar la aplicación.

---

## 🛠️ Tecnologías Utilizadas

- **Lenguaje**: JavaScript (Node.js)
- **Framework**: Electron.js
- **Estilo**: CSS3 con diseño "Midnight Glass" (Glassmorphism).
- **Sin Dependencias Externas**: El motor de cálculo y parsing ha sido desarrollado desde cero sin bibliotecas externas ni expresiones regulares, cumpliendo estrictamente con las restricciones académicas.

---

## 📖 Manual de Usuario

### 1. Inserción de Datos

- **Formato**: Cada número debe seguir el patrón `valor_base`. Por ejemplo, para sumar 10 en base 10 y 2 en base 2: `10_10 + 10_2`.
- **Valores Permitidos**: Solo se aceptan números **positivos** como entrada.
- **Interacción**: Puede usar el teclado físico o los botones de la interfaz gráfica.

### 2. Realización de Operaciones

1. Escriba su expresión en el área superior (ej: `10_10 + (F_16 * 2_2)`).
2. Presione el botón **"="** o la tecla **Enter**.
3. Se abrirá una ventana emergente preguntando por la **Base de Destino**. Ingrese un valor entre 2 y 16.
4. El resultado aparecerá en la parte inferior derecha con su respectiva base.

### 3. Restricciones y Validación

La calculadora detectará e informará errores en los siguientes casos:

- Paréntesis vacíos: `()` -> **Error**.
- Operadores consecutivos: `++`, `*-` -> **Error**.
- Dígitos inválidos para la base: `2_2` (2 no existe en base 2) -> **Error**.
- Entradas negativas: `-5_10` -> **Error**.

### 4. Gestión del Historial

- Presione el botón **"Ver historial"** para revisar cálculos previos.
- El historial se guarda en su equipo y puede ser limpiado con el botón **"Limpiar Historial"** dentro del modal.

---

## 💻 Instalación y Ejecución

### Requisitos Previos

- [Node.js](https://nodejs.org/) instalado.

### Pasos

1. Clone el repositorio:

   ```bash
   git clone https://github.com/usuario/CalculadoraMultibase-DesktopApp.git
   ```

2. Navegue a la carpeta del proyecto:

   ```bash
   cd CalculadoraMultibase-DesktopApp/src
   ```

3. Instale las dependencias (Electron):

   ```bash
   npm install
   ```

4. Inicie la aplicación:

   ```bash
   npm start
   ```

---

## 📂 Estructura del Proyecto

- **/src/main.js**: Configuración de la ventana de Electron y Node Integration.
- **/src/math_core.js**: Motor de lógica matemática, conversiones Horner y validaciones.
- **/src/renderer.js**: Manejo del DOM, eventos de usuario y persistencia de historial.
- **/src/Calculadora.html**: Estructura de la interfaz.
- **/src/Calculadora.css**: Estilos modernos y animaciones.
- **/docs/REQUIREMENTS.md**: Especificaciones técnicas del proyecto PY01.

---

## 👥 Créditos

Desarrollado como parte del Proyecto PY01 - Calculadora Multibase.

- **Integrantes**: [Lista de integrantes]
- **Curso**: [Nombre del Curso]
- **Institución**: [Nombre de la Institución]
- **Fecha**: Agosto, 2026
