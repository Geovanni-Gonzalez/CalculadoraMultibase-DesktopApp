

Proyecto PY01 - Calculadora Multibase
## Objetivo
Desarrollar  una  calculadora  multibase  eficiente  y  confiable  que  facilite  la  realización  de  operaciones
aritméticas  básicas  en  diferentes  sistemas  de  numeración.  Esta  herramienta  está  dirigida  a  estudiantes,
ingenieros,  científicos  y  profesionales  que  necesiten  trabajar  con  diversas  bases  numéricas  en  su  entorno
académico o laboral.
Requisitos e Implementación
Se  debe  desarrollar  una  aplicación  de  escritorio  con  interfaz  gráfica,  la  cual  permita  operar  números  en
bases desde 2 hasta 16. La entrada debe ser posible tanto mediante el teclado como mediante botones en
pantalla.  La  calculadora  mostrará  en  tiempo  real  la  operación  en  curso  y  soportará  operaciones  básicas
(suma, resta, multiplicación y división), con soporte para paréntesis anidados y jerarquía de operaciones.
Los  números  se  representarán  en  el  formato  "valor_base",  por  ejemplo:  "1423_5".  Además,  se  permitirá
combinar  números  en  distintas  bases  en  una  misma  operación.  Todos  los  valores  deberán  convertirse
internamente  a  la  base  más  alta  utilizada  antes  de  operar,  y  el  resultado  podrá  mostrarse  en  la  base
seleccionada por el usuario.
Los resultados se mantendrán en memoria hasta el cierre de la aplicación. Toda entrada inválida deberá ser
detectada y respondida con mensajes de error claros y útiles.
Restricciones adicionales:
- No se permiten paréntesis vacíos ni operadores consecutivos.
- Solo se admitirán valores positivos como entrada (el resultado sí puede ser negativo).
- Las conversiones entre bases deberán realizarse directamente, sin utilizar una base intermedia.
Ejemplo de operación
La operación:
## 10_10 + (2_10 * (5_10 - 3_10) + 7_10) * 5_10
## Página 1

Proyecto PY01 - Calculadora Multibase
Deberá interpretarse y resolverse como:
## 1010 + (210 * (510 - 310) + 710) * 510 = 6510
Tecnologías permitidas
- Lenguaje principal: Node.js
- Paquete gráfico sugerido: Electron (se puede usar otro si cumple los requisitos).
-  No  se  permite  el  uso  de  expresiones  regulares  ni  librerías  externas  para  procesar  texto  o  calcular
operaciones multibase.
- Únicamente se permiten paquetes para la interfaz gráfica.
Formación de Grupos
El desarrollo debe realizarse en grupos de 2 o 3 integrantes. Otros tamaños de grupo requerirán justificación
y  aprobación  previa.  Los  integrantes  deben  inscribirse  en  el  foro  del  curso  destinado  a  Proyecto  01.
Estudiantes  no  inscritos  serán  agrupados  aleatoriamente.  Consultas  al  respecto  deben  dirigirse  al  profesor
del curso.
Entrega y Evaluación
- Valor del proyecto: 15%
- Fecha límite: Jueves 31 de agosto, 5:00 PM (hora del servidor).
- Penalización por retraso: 2 puntos porcentuales por día.
- Entrega: Enlace a repositorio compartido (GitHub u otro) dentro del espacio asignado en el sitio del curso.
El repositorio debe ser accesible al profesor y asistente (Hansol Antay @hros).
-  Solo  se  evaluarán  confirmaciones  previas  a  la  fecha  límite,  a  menos  que  se  solicite  revisión  de  entrega
tardía.
## Consultas
Todas las preguntas relacionadas con este proyecto deben canalizarse por medio del foro del Proyecto 01,
donde también se podrán discutir y responder dudas comunes entre los equipos.
Criterios de Evaluación
## Página 2

Proyecto PY01 - Calculadora Multibase
Se aplicará la rúbrica oficial del curso. El proyecto será evaluado como producto final sin citas individuales.
Tanto  el  código  como  la  documentación  deberán  ser  claros,  coherentes  y  suficientes  para  defender  el
funcionamiento del proyecto sin requerir la presencia del equipo desarrollador.
## Mensaje Final
¡Mucho éxito con el proyecto!
Empiecen  con  tiempo.  Analicen  y  comprendan  el  problema  antes  de  comenzar  a  programar.  Esto  les
permitirá  producir  un  código  más  claro,  efectivo  y  alineado  con  los  objetivos  propuestos  desde  la  primera
línea.
## Página 3