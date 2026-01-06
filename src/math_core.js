// math_core.js - Core logic for Multibase Calculator

/*****Nombre***************************************
*  conversion
*  Convierte un numero en cualquier base (2-16) a la base deseada (2-16)
*  Implementación eficiente (Método de Horner) sin base intermedia.
**************************************************/
function conversion(numero, baseNum, baseDeseada) {
    if (numero === '0' || numero === '') return '0';

    // El número fuente viene como string (ej: "1A")
    // Lo procesaremos dígito por dígito para construirlo en la base deseada
    // Res = Res * BaseFuente + DigitoActual (Todo calculado en BaseDeseada)

    let res = "0";
    let baseFuenteStr = baseNum.toString(); // Multiplicaremos por esto en cada paso

    for (let i = 0; i < numero.length; i++) {
        let digitoVal = letraANum(numero[i]);
        // res = res * baseNum + digito
        let prod = multiplicacion(res, baseFuenteStr, baseDeseada);
        res = suma(prod, digitoVal.toString(), baseDeseada);
    }

    return cerosAdelante(res);
}

/*****Nombre***************************************
*  suma
*  Realiza la suma de 2 numeros en una misma base
**************************************************/
function suma(operador1, operador2, base) {
    var i = 0;
    var len1 = operador1.length;
    var len2 = operador2.length
    var op1 = '';
    var op2 = '';
    var cociente = 0;
    var resultado = '';
    var flag = false;

    if (len1 > len2) {
        i = len1;
    } else {
        i = len2;
    }

    while (i > 0) {
        var sumaO = 0;
        if (len1 - 1 < 0) {
            op1 = '0';
            op2 = operador2[len2 - 1];
        } else if (len2 - 1 < 0) {
            op1 = operador1[len1 - 1];
            op2 = '0';
        } else {
            op1 = operador1[len1 - 1];
            op2 = operador2[len2 - 1];
        }

        var op1E = Number(letraANum(op1));
        var op2E = Number(letraANum(op2));

        if (flag == true) {
            sumaO = op1E + op2E + cociente;
        } else {
            sumaO = op1E + op2E;
        }

        if (sumaO < base) {
            var reS = numALetra(sumaO.toString());
            resultado = reS + resultado;
            flag = false;
        } else {
            var residuo = numALetra((sumaO % base).toString());
            cociente = Math.floor(sumaO / base);
            resultado = residuo + resultado
            flag = true;
        }

        i -= 1;
        len1 -= 1;
        len2 -= 1;
    }

    if (flag == true) {
        resultado = cociente.toString() + resultado;
    }

    return resultado;
}

/*****Nombre***************************************
*  resta
*  Realiza la resta de 2 numeros en una misma base
**************************************************/
function resta(operador1, operador2, base) {
    var i = 0;
    var op1 = '';
    var op2 = '';
    var resultado = '';

    var flag = esMayor(operador1, operador2);
    var num1 = operador1;
    var num2 = operador2;
    i = operador1.length;

    if (flag == false) {
        i = operador2.length;
        num1 = operador2;
        num2 = operador1;
    };

    var len1 = num1.length;
    var len2 = num2.length;

    while (i > 0) {
        var resta = 0;

        if (len1 - 1 < 0) {
            op1 = '0';
            op2 = num2[len2 - 1];
        } else if (len2 - 1 < 0) {
            op1 = num1[len1 - 1];
            op2 = '0';
        } else {
            op1 = num1[len1 - 1];
            op2 = num2[len2 - 1];
        }

        resta = Number(letraANum(op1)) - Number(letraANum(op2));

        if (resta < 0) {
            num1 = actualizarNum(len1 - 1, num1, base);
            var suma = Number(letraANum(num1[len1 - 1])) + base;
            op1 = suma.toString();
            resta = Number(op1) - Number(letraANum(op2));
        }

        resultado = numALetra(resta).toString() + resultado;

        i -= 1;
        len1 -= 1;
        len2 -= 1;
    }

    if (flag == false) {
        resultado = '-' + resultado;
    }

    return resultado;
}

/*****Nombre***************************************
*  multiplicacion
*  Realiza la multiplicación de 2 numeros en una misma base
**************************************************/
function multiplicacion(operador1, operador2, base) {
    var len2 = operador2.length;
    var flag = false;
    var resultado = '0';
    var i = 0;

    while (len2 > 0) {
        var op2 = letraANum(operador2[len2 - 1]);
        var len1 = operador1.length;
        var cociente = 0;
        var resultado1 = '';

        while (len1 > 0) {
            var multiplicacion = 1;
            var op1 = letraANum(operador1[len1 - 1]);
            var residuo = 0;

            multiplicacion = Number(op2) * Number(op1);

            if (flag == true) {
                multiplicacion = (Number(op2) * Number(op1)) + cociente;
            }

            flag = false;

            if (multiplicacion >= base) {
                cociente = Math.floor(multiplicacion / base);
                residuo = multiplicacion % base;
                resultado1 = numALetra(residuo.toString()) + resultado1;
                flag = true;
            } else {
                resultado1 = numALetra(multiplicacion.toString()) + resultado1;
            }

            len1 -= 1;
        }

        if (flag == true) {
            resultado1 = numALetra(cociente.toString()) + agregar0(resultado1, i);
        } else {
            resultado1 = agregar0(resultado1, i);
        }

        resultado = suma(resultado1, resultado, base);

        i += 1;
        len2 -= 1;
        flag = false;

    }

    return resultado;
}

/*****Nombre***************************************
*  division
*  Realiza la division de 2 numeros en una misma base
**************************************************/
function division(operador1, operador2, base) {
    var resultado = '0';
    var flag = esMayor(operador1, operador2);

    if (cerosAdelante(operador1) === '0' && cerosAdelante(operador2) === '0') {
        throw new Error('Division invalida');
    }

    if (cerosAdelante(operador1) === '0' && cerosAdelante(operador2) != '0') {
        return '0';
    }

    if (cerosAdelante(operador1) != '0' && cerosAdelante(operador2) === '0') {
        throw new Error('Division entre 0');
    }

    if (cerosAdelante(operador1) == cerosAdelante(operador2)) {
        return '1';
    }

    while (flag == true) {
        operador1 = resta(operador1, operador2, base);
        resultado = suma(resultado, '1', base);
        flag = esMayor(operador1, operador2);
    }

    return resultado;
}

/*****Nombre***************************************
*  ordenarExpresion
*  Ordena la operacion convirtiendo todos los numeros a la base mayor
**************************************************/
function ordenarExpresion(expresion) {
    const pilaLetras = ["A", "B", "C", "D", "E", "F"];
    const pilaBases = []
    const operadores = ['+', '-', '*', '/'];
    var baseMayor = 0;

    //Saca la base mayor
    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        if (caracter === '_') {
            let base = '';
            let j = i + 1;
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                base = base + expresion[j];
                j++;
            }
            baseActual = Number(base);
            if (baseActual > baseMayor) {
                baseMayor = baseActual;
            }
            i = j - 1;
        }
    }

    //Almacena las bases
    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        if (caracter === '_') {
            let base = '';
            let j = i + 1;
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                base = base + expresion[j];
                j++;
            }
            pilaBases.push(Number(base));
            i = j - 1;
        }
    }

    var operacionOrdenada = "";
    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        if (caracter === '(' || caracter === ')') {
            operacionOrdenada += caracter;
        } else if (operadores.includes(caracter)) {
            operacionOrdenada += caracter;
        } else if (!isNaN(parseInt(caracter))) {
            let numero = parseInt(caracter);
            let j = i + 1;
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                numero = numero * 10 + parseInt(expresion[j]);
                j++;
            }
            operacionOrdenada += conversion(numero, pilaBases[0], baseMayor) + "_" + baseMayor.toString();
            pilaBases.shift();
            i = j - 1;
        } else if (caracter === '_') {
            let j = i + 1;
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                j++;
            }
            i = j - 1;
        } else if (pilaLetras.includes(caracter)) {
            let letra = caracter;
            let j = i + 1;
            while (j < expresion.length && pilaLetras.includes(expresion[j])) {
                letra = letra + expresion[j];
                j++;
            }
            operacionOrdenada += conversion(letra, pilaBases[0], baseMayor) + "_" + baseMayor.toString();
            pilaBases.shift();
            i = j - 1;
        }
    }
    return operacionOrdenada;
}

/*****Nombre***************************************
* calcular  
**************************************************/
function calcular(expresion) {
    const pilaNum = [];
    const pilaOps = [];
    const pilaBases = [];
    const pilaLetras = ["A", "B", "C", "D", "E", "F"];
    const operadores = {
        '+': (a, b, base) => suma(a, b, base),
        '-': (a, b, base) => resta(a, b, base),
        '*': (a, b, base) => multiplicacion(a, b, base),
        '/': (a, b, base) => division(a, b, base)
    };
    const prioridad = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    const procesarOperacion = () => {
        const num2 = pilaNum.pop();
        const num1 = pilaNum.pop();
        const op = pilaOps.pop();
        const base = pilaBases.pop();
        // Operadores return strings, which is correct for our stack
        pilaNum.push(operadores[op](num1.toString(), num2.toString(), base));
    };

    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        if (caracter === '(') {
            pilaOps.push(caracter);
        } else if (caracter === ')') {
            while (pilaOps.length > 0 && pilaOps[pilaOps.length - 1] !== '(') {
                procesarOperacion();
            }
            pilaOps.pop();
        } else if (operadores.hasOwnProperty(caracter)) {
            while (pilaOps.length > 0 && prioridad[pilaOps[pilaOps.length - 1]] >= prioridad[caracter]) {
                procesarOperacion();
            }
            pilaOps.push(caracter);
        } else if ((caracter.charCodeAt(0) >= 48 && caracter.charCodeAt(0) <= 57) || pilaLetras.includes(caracter)) {
            let valor = "";
            let j = i;
            // Extract the full number/word (e.g. "123" or "AB")
            while (j < expresion.length && ((expresion[j].charCodeAt(0) >= 48 && expresion[j].charCodeAt(0) <= 57) ||
                pilaLetras.includes(expresion[j]))) {
                valor += expresion[j];
                j++;
            }
            pilaNum.push(valor);
            i = j - 1;
        } else if (caracter === '_') {
            let baseStr = '';
            let j = i + 1;
            while (j < expresion.length && (expresion[j].charCodeAt(0) >= 48 && expresion[j].charCodeAt(0) <= 57)) {
                baseStr += expresion[j];
                j++;
            }
            pilaBases.push(Number(baseStr));
            i = j - 1;
        }

        // Potential logic issue: while(pilaNum.length > 1) in the main loop might process 
        // operators prematurely without respecting precedence. 
        // Standard Shunting-yard processes operators based on priority when pushed.
    }

    // Final processing
    while (pilaOps.length > 0) {
        procesarOperacion();
    }

    var finalResult = pilaNum[0].toString();
    var finalBase = pilaBases[0] || 10; // Fallback to 10 if somehow empty
    return finalResult + '_' + finalBase.toString();
}

/*****Nombre***************************************
*  letraANum
**************************************************/
function letraANum(digito) {
    if (digito == 'A') return '10';
    if (digito == 'B') return '11';
    if (digito == 'C') return '12';
    if (digito == 'D') return '13';
    if (digito == 'E') return '14';
    if (digito == 'F') return '15';
    return digito;
}

/*****Nombre***************************************
*  numALetra
**************************************************/
function numALetra(digito) {
    if (digito == '10') return 'A';
    if (digito == '11') return 'B';
    if (digito == '12') return 'C';
    if (digito == '13') return 'D';
    if (digito == '14') return 'E';
    if (digito == '15') return 'F';
    return digito;
}

/*****Nombre***************************************
*  numeroBase
**************************************************/
function numeroBase(operando) {
    var numero = '';
    var base = '';
    var esBase = false;

    for (let i = 0; i < operando.length; i++) {
        var digito = operando[i];
        if (digito == '_') {
            esBase = true;
            continue;
        }
        if (esBase == false) {
            numero += digito;
        } else {
            base += digito;
        }
    }
    base = Number(base);
    return [numero, base];
}

/*****Nombre***************************************
*  esMayor
**************************************************/
function esMayor(operador1, operador2) {
    operador1 = cerosAdelante(operador1);
    operador2 = cerosAdelante(operador2);

    var largo1 = operador1.length;
    var largo2 = operador2.length;

    if (largo1 > largo2) {
        return true;
    } else if (largo2 > largo1) {
        return false;
    } else {
        for (var i = 0; i < operador1.length; i++) {
            var n1 = Number(letraANum(operador1[i]));
            var n2 = Number(letraANum(operador2[i]));
            if (n1 > n2) return true;
            if (n2 > n1) return false;
        }
        return true;
    }
}

/*****Nombre***************************************
*  cerosAdelante
**************************************************/
function cerosAdelante(numero) {
    var digito = numero[0];
    while (digito == '0') {
        numero = numero.slice(1);
        digito = numero[0];
    }
    if (numero === '') numero = '0';
    return numero;
}

/*****Nombre***************************************
*  actualizarNum
**************************************************/
function actualizarNum(indiceA, num, base) {
    var arregloNum = num.split('');
    var n1 = num[indiceA - 1];
    var n2 = '';
    var res = Number(letraANum(n1)) - 1;
    var indice = indiceA;

    while (res < 0) {
        indice = indice - 1;
        n1 = arregloNum[indice - 1];
        res = Number(letraANum(n1)) - 1;
    }

    while (indice < indiceA) {
        n1 = letraANum(arregloNum[indice - 1]);
        n2 = letraANum(arregloNum[indice]);
        arregloNum[indice - 1] = numALetra((Number(n1) - 1).toString());
        arregloNum[indice] = numALetra((Number(n2) + base).toString());
        indice += 1;
    }

    n1 = letraANum(arregloNum[indiceA - 1]);
    arregloNum[indiceA - 1] = numALetra((Number(n1) - 1).toString());

    num = arregloNum.join('');
    return num;
}

/*****Nombre***************************************
*  agregar0
**************************************************/
function agregar0(num, i) {
    while (i > 0) {
        num = num + '0';
        i -= 1;
    }
    return num;
}

/*****Nombre***************************************
*  esBaseValida
**************************************************/
function esBaseValida(operando) {
    var dato = numeroBase(operando);
    var numero = dato[0];
    var base = dato[1];

    if (base < 2 || base > 16) return false;

    for (let i = 0; i < numero.length; i++) {
        var num = letraANum(numero[i]);
        var intNum = Number(num);
        if (intNum >= base) return false;
    }
    return true;
}

/*****Nombre***************************************
*  validaEntrada
*  Funcion que verifica la entrada de la calculadora
*  Alineada con requisitos PY01 (sin parens vacíos, ni ops consecutivos, ni negativos).
**************************************************/
function validaEntrada(entrada) {
    var listaOperadores = ["+", "-", "*", "/"];
    var listaBases = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
    var listaLetras = ["A", "B", "C", "D", "E", "F"];

    var tamanno = entrada.length;
    if (tamanno == 0) throw new Error("Debe ingresar una operacion");

    // Check for negative input at start
    if (entrada[0] === '-') {
        throw new Error("Solo se admiten valores positivos como entrada.");
    }

    var operadorAnterior = "";

    for (let index = 0; index < tamanno; index++) {
        const element = entrada[index];
        operadorAnterior = (index > 0) ? entrada[index - 1] : "";

        // Check for empty parentheses ()
        if (element === ')' && operadorAnterior === '(') {
            throw new Error("No se permiten paréntesis vacíos.");
        }

        // Check for consecutive operators
        if (listaOperadores.includes(element) && listaOperadores.includes(operadorAnterior)) {
            throw new Error("No se permiten operadores consecutivos.");
        }

        var codA = element.charCodeAt(0);

        // If it's an operator
        if (listaOperadores.includes(element)) {
            // Already handled in consecutive check above
        } else if (element === '(' || element === ')') {
            // Valid characters
        } else if ((codA >= 48 && codA <= 57) || listaLetras.includes(element)) {
            // If it's a number/digit, it must eventually have a base
            var poseeBase = false;
            var indiceBase = 0;

            for (let index2 = index; index2 < tamanno; index2++) {
                const charInterno = entrada[index2];
                if (charInterno == "_") {
                    if (index2 + 1 < tamanno) {
                        let baseStr = "";
                        let k = index2 + 1;
                        while (k < tamanno && (entrada[k].charCodeAt(0) >= 48 && entrada[k].charCodeAt(0) <= 57)) {
                            baseStr += entrada[k];
                            k++;
                        }
                        if (listaBases.includes(baseStr)) {
                            poseeBase = true;
                            indiceBase = k - 1;
                            index2 = tamanno; // Exit inner loop
                        } else {
                            // Base digits are not valid or not in listaBases
                            index2 = tamanno; // Exit inner loop
                        }
                    } else {
                        // '_' at the end of the string
                        index2 = tamanno; // Exit inner loop
                    }
                } else if (!((entrada[index2].charCodeAt(0) >= 48 && entrada[index2].charCodeAt(0) <= 57) ||
                    listaLetras.includes(entrada[index2]))) {
                    // Broke the number/base sequence (reached operator or paren or other invalid char)
                    index2 = tamanno; // Exit inner loop
                }
            }

            if (!poseeBase) {
                throw new Error("La base es inválida o inexistente para el operando.");
            }

            if (!esBaseValida(entrada.slice(index, indiceBase + 1))) {
                throw new Error("El numero tiene digitos invalidos en la base");
            }
            index = indiceBase; // Move main loop index past the validated number and its base
        } else if (element === '_') {
            // This should only be reachable if '_' is not part of a number_base sequence
            throw new Error("Formato de base '_' inesperado.");
        } else {
            // Invalid character?
            // Allow spaces, carriage returns, and newlines for flexibility in input, but throw for others.
            if (element !== ' ' && element.charCodeAt(0) !== 13 && element.charCodeAt(0) !== 10) {
                throw new Error("Carácter inválido detectado.");
            }
        }
    }
}

module.exports = {
    conversion,
    suma,
    resta,
    multiplicacion,
    division,
    ordenarExpresion,
    calcular,
    letraANum,
    numALetra,
    numeroBase,
    esMayor,
    cerosAdelante,
    actualizarNum,
    agregar0,
    esBaseValida,
    validaEntrada
};
