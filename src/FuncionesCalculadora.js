const { dialog } = require("electron");

var baseResultado = '';

//Funcion de resultado
/*****Nombre***************************************
*  igual
*****Descripción**********************************
*  Inicia la calculadora
**************************************************/
async function igual() {
    var valorInput = document.getElementById("input").value;
    
    try {
        //Validaciones
        validaEntrada(valorInput);

        //Pregunta base resultado
        baseResultado = await pResultado();
        document.getElementById("baResultado").value = '';

        //Pasa ela entrada a la base mayor y realiza el calculo
        var entradaNueva = ordenarExpresion(valorInput);
        var valorResultado = calcular(entradaNueva);
        
        //Conversion para el resultado
        var numBase = numeroBase(valorResultado);
        var resultadoOp = numBase[0];
        var baseOp = numBase[1];
        var resultado = conversion(resultadoOp, baseOp, baseResultado);

        //Añadir resultado al historial
        var resultadoH = valorInput + ' = '+ resultado + '_' + baseResultado
        actualizarHistorial(resultadoH);

        //Borrar input operador y añadir el resultado en el segundo input
        document.getElementById("input").value = '';

        document.getElementById("textR").value = resultado + '_' + baseResultado;
    } catch(error) {
        mostrarErrores(error.message);
        console.error(error.message);
    }

}

///////////////////////////////////////////////////////////////////////////////////////////
//Funcion de Conversiones
/*****Nombre***************************************
*  conversion
*****Descripción**********************************
*  Convierte un numero en cualquier base (2-16) a la base deseada (2-16)
*****Entradas************************************* 
* - numero: El numero 
* - baseNum: La base en la esta el numero
* - baseDeseada: La base a la que se quiere llegar
*****Salida************************************* 
* - resultado: El numero en la base elegida
**************************************************/
function conversion(numero, baseNum, baseDeseada) {
    var nuevoNum = cerosAdelante(numero); 
    var numAux = '0';
    var i = 0;
    var resultado = '0';

    //Verifica si el numero es 0
    if(nuevoNum === '0') {
        return '0';
    }

    //Suma hasta que ambos numeros sean iguales
    while(numAux != nuevoNum) { 
        numAux = suma(numAux, '1', baseNum);
        i ++;
    }

    //Si se realiza la cantidad de sumas esppecificada para
    while(i > 0) {
        resultado = suma(resultado, '1', baseDeseada);
        i --;
    }

    return resultado;
}

/////////////////////////////////////////////////////////////////////////////////////////
//Funciones para las operaciones
/*****Nombre***************************************
*  suma
*****Descripción**********************************
*  Realiza la suma de 2 numeros en una misma base
*****Entradas************************************* 
* - operador1: El primer operador de la suma
* - operador2: El segundo operador de la suma
* - base: La base en la que estan ambos numeros
*****Salida************************************* 
* - resultado: Elresultado de la suma
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

    if(len1 > len2) {
        i = len1;
    } else {
        i = len2;
    }

    while(i > 0) {
        var sumaO = 0;
        //Se hagarra el ultimo digito para hacer la suma
        //Si no hay mas digitos se usa el 0 
        if(len1-1 < 0) {
            op1 = '0';
            op2 = operador2[len2-1];
        } else if(len2-1 < 0) {
            op1 = operador1[len1-1];
            op2 = '0';
        } else {
            op1 = operador1[len1-1];
            op2 = operador2[len2-1];
        }

        //Valor entero del digito
        var op1E = Number(letraANum(op1));
        var op2E = Number(letraANum(op2));

        if(flag == true) {
            sumaO = op1E + op2E + cociente;
        } else {
            sumaO = op1E + op2E;
        }

        //Verifica si la suma es menor a la base para realizar la suma
        if(sumaO < base) {
            var reS = numALetra(sumaO.toString());
            resultado = reS + resultado;
            flag = false;
        } else {
            var residuo = numALetra((sumaO % base).toString());
            cociente = Math.floor(sumaO/base);
            resultado = residuo + resultado
            flag = true;
        }

        i -= 1;
        len1 -= 1;
        len2 -= 1;
    }

    //Si todavia tiene un cociente restante lo agrga al resultado
    if(flag == true) {
        resultado = cociente.toString() + resultado;
    }

    return resultado;
}

/*****Nombre***************************************
*  resta
*****Descripción**********************************
*  Realiza la resta de 2 numeros en una misma base
*****Entradas************************************* 
* - operador1: El primer operador de la resta
* - operador2: El segundo operador de la resta
* - base: La base en la que estan ambos numeros
*****Salida************************************* 
* - resultado: El resultado de la resta
**************************************************/
function resta(operador1, operador2, base) {
    var i = 0;
    var op1 = '';
    var op2 = '';
    var resultado = '';

    //Verifica quien es mayor para hacer la operacción
    var flag = esMayor(operador1, operador2);
    var num1 = operador1;
    var num2 = operador2;
    i = operador1.length;

    //Si el segundo es mayor los operadores cambian
    if(flag == false) {
        i = operador2.length;
        num1 = operador2;
        num2 = operador1;
    };

    var len1 = num1.length;
    var len2 = num2.length;

    while(i > 0) {
        var resta = 0;

        //Se hagarra el ultimo digito para hacer la resta
        //Si no hay mas digitos se usa el 0
        if(len1-1 < 0) {
            op1 = '0';
            op2 = num2[len2-1];
        } else if(len2-1 < 0) {
            op1 = num1[len1-1];
            op2 = '0';
        } else {
            op1 = num1[len1-1];
            op2 = num2[len2-1];
        }

        resta = Number(letraANum(op1)) - Number(letraANum(op2));

        //Si el resultado es negativo cambia/actualiza el num1 con sus nuevos valores
        if(resta < 0) {
            num1 = actualizarNum(len1-1, num1, base);
            var suma = Number(letraANum(num1[len1-1])) + base;
            op1 = suma.toString();
            resta = Number(op1) - Number(letraANum(op2));
        }
        
        resultado = numALetra(resta).toString() + resultado;

        i -= 1;
        len1 -= 1;
        len2 -= 1;
    }

    //Si se cambiaron los operadores se pone su signo negativo correspondiente
   if(flag == false) {
        resultado = '-' + resultado;
    }

    return resultado;
}

/*****Nombre***************************************
*  multiplicacion
*****Descripción**********************************
*  Realiza la multiplicación de 2 numeros en una misma base
*****Entradas************************************* 
* - operador1: El primer operador de la multiplicación
* - operador2: El segundo operador de la multiplicación
* - base: La base en la que estan ambos numeros
*****Salida************************************* 
* - resultado: El resultado de la multiplicación
**************************************************/
function multiplicacion(operador1, operador2, base) {
    var len2 = operador2.length;
    var flag = false;
    var resultado = '0';
    var i = 0;

    //Saca el digito del segundo operador para hacer la multiplicacion con el primer operador
    while(len2 > 0) {
        var op2 = letraANum(operador2[len2-1]);
        var len1 = operador1.length;
        var cociente = 0;
        var resultado1 = '';

        //Realiza la multiplicacion y da el resultado de la primera multiplicacion
        while(len1 > 0) {
            var multiplicacion = 1; 
            var op1 = letraANum(operador1[len1-1]);
            var residuo = 0;

            multiplicacion = Number(op2) * Number(op1);
            
            //Si tiene un acarreo lo suuma a la multiplicación
            if(flag == true){
                multiplicacion = (Number(op2) * Number(op1)) + cociente;
            }
            
            flag = false;

            //Realiza los calculos para el acarreo
            if(multiplicacion >= base) {
                cociente = Math.floor(multiplicacion/base);
                residuo = multiplicacion % base;
                resultado1 = numALetra(residuo.toString()) + resultado1;
                flag = true;
            } else {
                resultado1 = numALetra(multiplicacion.toString()) + resultado1;
            }

            len1-= 1;
        }

        //Si tiene un acarreo lo agrrega
        //Agrega los ceros en el numero para realizar la suma
        if(flag == true) {
            resultado1 = numALetra(cociente.toString()) + agregar0(resultado1, i);
        } else {
            resultado1 = agregar0(resultado1, i);
        }

        resultado = suma(resultado1, resultado, base);

        i+= 1;
        len2-= 1;
        flag = false;

    }

    return resultado;
}

/*****Nombre***************************************
*  division
*****Descripción**********************************
*  Realiza la division de 2 numeros en una misma base
*****Entradas************************************* 
* - operador1: El primer operador de la division
* - operador2: El segundo operador de la division
* - base: La base en la que estan ambos numeros
*****Salida************************************* 
* - resultado: El resultado de la división
**************************************************/
function division(operador1, operador2, base) {
    var resultado = '0';
    var flag = esMayor(operador1, operador2);

    if(cerosAdelante(operador1) === '0' && cerosAdelante(operador2) === '0') {
        throw new Error('Division invalida');
    }

    if(cerosAdelante(operador1) === '0' && cerosAdelante(operador2) != '0') {
        return '0';
    }

    if(cerosAdelante(operador1) != '0' && cerosAdelante(operador2) === '0') {
        throw new Error('Division entre 0');
    }

    //Todo numero dividido en si mismo es 1
    if(cerosAdelante(operador1) == cerosAdelante(operador2)) {
        return '1';
    }

    //Si el operador1 es mayor va a ir restando y contando la cantidad de restas, dando el resultado
    while(flag == true) {
        operador1 = resta(operador1, operador2, base);
        resultado = suma(resultado, '1', base);
        flag = esMayor(operador1, operador2);
    }

    return resultado;
}

/*****Nombre***************************************
*  ordenarExpresion
*****Descripción**********************************
*  Ordena la operacion convirtiendo todos los numeros a la base mayor
*****Entradas************************************* 
*  - expresion: La operacion que se quiere ordenar
*****Salida************************************* 
* - operacionOrdenada: La operacion ordenada
**************************************************/
function ordenarExpresion(expresion) {

    const pilaLetras = ["A","B","C","D","E","F"];
    const pilaBases=[]
    const operadores = ['+', '-', '*', '/'];
    var baseMayor=0;
    //Saca la base mayor de la operacion
    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        if (caracter === '_'){
            let base = '';
            let j = i + 1;
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                base = base + expresion[j];
                j++;
            }
            baseActual=Number(base);
            if (baseActual>baseMayor){
                baseMayor=baseActual;
            }
            i = j - 1;
        }
    }

    //Almacena las bases en una pila 
    for (let i=0; i<expresion.length;i++){
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

    //Convierte los numeros a la base mayor
    var operacionOrdenada="";
    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        if (caracter === '(' || caracter === ')') {//Si es un parentesis
            operacionOrdenada+=caracter;
        } else if (operadores.includes(caracter)) {//Si es un operador
            operacionOrdenada+=caracter;
        } else if (!isNaN(parseInt(caracter))) {//Si es un numero
            let numero = parseInt(caracter);
            let j = i + 1;
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {//Saca el numero completo
                numero = numero * 10 + parseInt(expresion[j]);
                j++;
            }
            //Convierte el numero a la base mayor y lo añade a la operacionOrdenada
            operacionOrdenada+=conversion(numero,pilaBases[0],baseMayor)+"_"+baseMayor.toString();
            pilaBases.shift();//Elimina la base de la pila
            i = j - 1;
        }else if (caracter === '_'){//omite la base de la expresion original
            //omite la base
            let j = i + 1;
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                j++;
            }
            i = j - 1;
        }else if (pilaLetras.includes(caracter)){//Si es una letra
            let letra = caracter;
            let j = i + 1;
            while (j < expresion.length && pilaLetras.includes(expresion[j])) {
                letra = letra + expresion[j];
                j++;
            }
            //Convierte la letra a la base mayor y lo añade a la operacionOrdenada
            operacionOrdenada+=conversion(letra,pilaBases[0],baseMayor)+"_"+baseMayor.toString();
            pilaBases.shift();//Elimina la base de la pila
            i = j - 1;
        }
    }
    //Devuelve la operacion ordenada
    return operacionOrdenada;
}

/*****Nombre***************************************
* calcular  
*****Descripción**********************************
*  Calcula el resultado de una operacion 
*****Entradas************************************* 
*  - expresion: La operacion que se quiere calcular
*****Salida************************************* 
* -  resultado: El resultado de la operacion realizada
**************************************************/
function calcular(expresion) {
    //Pilas
    const pilaNum = [];
    const pilaOps = [];
    const pilaBases= [];
    const pilaLetras = ["A","B","C","D","E","F"];
    //Operadores
    const operadores = {
        '+': (a, b,base) => suma(a, b, base),
        '-': (a, b,base) => resta(a, b, base),
        '*': (a, b,base) => multiplicacion(a, b, base),
        '/': (a, b,base) => division(a, b, base)
    };
    //Prioridad de los operadores
    const prioridad = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    //Funcion para procesar las operaciones
    const procesarOperacion = () => {
        const num2 = pilaNum.pop();
        const num1 = pilaNum.pop();
        const op = pilaOps.pop();
        const base = pilaBases.pop();
        pilaNum.push(Number(operadores[op](num1.toString(), num2.toString(),base)));
    };
    //Recorre la expresion
    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        //Si es un parentesis izquierdo lo añade a la pila
        if (caracter === '(') {
            pilaOps.push(caracter);
            //Si es un parentesis derecho procesa las operacion del parentesis
        } else if (caracter === ')') {
            while (pilaOps[pilaOps.length - 1] !== '(') {
                procesarOperacion();
            }
            pilaOps.pop(); // Quita el paréntesis izquierdo
        } else if (operadores.hasOwnProperty(caracter)) {// Si es un operador
            while (pilaOps.length > 0 && prioridad[pilaOps[pilaOps.length - 1]] >= prioridad[caracter]) {
                procesarOperacion();//Procesa las operaciones
            }
            pilaOps.push(caracter);//Añade el operador a la pila
        }else if (!isNaN(parseInt(caracter))) {//Si es un numero
            let numero = parseInt(caracter);
            let j = i + 1;
            //Saca el numero completo
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                numero = numero * 10 + parseInt(expresion[j]);
                j++;
            }
            //Añade el numero a la pila
            pilaNum.push(numero);
            i = j - 1;//Actualiza el indice
        }else if (caracter === '_'){//Si es una base
            let base = '';
            let j = i + 1;
            //Saca la base completa
            while (j < expresion.length && !isNaN(parseInt(expresion[j]))) {
                base = base + expresion[j];
                j++;
            }
            //Añade la base a la pila
            pilaBases.push(Number(base));
            i = j - 1;//Actualiza el indice
        }else if (pilaLetras.includes(caracter)){//Si es una letra
            let letra = caracter;
            let j = i + 1;
            while (j < expresion.length && pilaLetras.includes(expresion[j])) {
                letra = letra + expresion[j];
                j++;
            }
            //Añade la letra a la pila
            pilaNum.push(letra);
            i = j - 1;
        }
        //Procesa las operaciones restantes
        while (pilaNum.length > 1) {
         
                procesarOperacion();
            
        }
    
    }
    //Devuelve el resultado
    var resultado= pilaNum[0].toString() + '_' + pilaBases[0].toString();
    return resultado;
}

/////////////////////////////////////////////////////////////////////////////////////////
//Funciones auxiliares
/*****Nombre***************************************
*  letraANum
*****Descripción**********************************
*  Devuelve la representación numerica de la letra
* Si un digito no es una letra devuelve el mismo numero
*****Entradas************************************* 
* - digito: El digito del que se quiere encontrar su representacion nuemrica
*****Salida************************************* 
* - resultado: El numero que representa la letra o el mismo número 
**************************************************/
function letraANum(digito) {
    if (digito == 'A') {
        return '10';
    } else  if (digito == 'B') {
        return '11';
    } else  if (digito == 'C') {
        return '12';
    } else  if (digito == 'D') {
        return '13';
    } else  if (digito == 'E') {
        return '14';
    } else  if (digito == 'F') {
        return '15';
    } else {
        return digito;
    }
}

/*****Nombre***************************************
*  numALetra
*****Descripción**********************************
*  Devuelve la representación en letras de un numero
* Si un digito no tiene una represetanción en letras devuelve el mismo numero
*****Entradas************************************* 
* - digito: El digito del que se quiere encontrar su representacion en letras
*****Salida************************************* 
* - resultado: La letra que representa el número o el mismo número 
**************************************************/
function numALetra(digito) {
    if (digito == '10') {
        return 'A';
    } else  if (digito == '11') {
        return 'B';
    } else  if (digito == '12') {
        return 'C';
    } else  if (digito == '13') {
        return 'D';
    } else  if (digito == '14') {
        return 'E';
    } else  if (digito == '15') {
        return 'F';
    } else {
        return digito;
    }
}

/*****Nombre***************************************
*  numeroBase
*****Descripción**********************************
*  Searas el numero de la base
*****Entradas************************************* 
* - operando: El oprando 'numero_base'
*****Salida************************************* 
* - Una lista en donde el primero elemento es el numero y el segundo es la base 
**************************************************/
function numeroBase(operando) { 
    var numero = '';
    var base = '';
    var esBase = false;

    for (let i = 0; i < operando.length; i++) {
        var digito = operando[i];

        //Si aparece el _ activa la flag de la base
        if (digito == '_') {
            esBase = true;
            continue;
        }

        // Añade los digitos al numero o la base dependiendo del estado de esBase
        if (esBase == false) {
            numero += digito;
        } else {
            base += digito;
        }
    }

    // Convierte la base a Number para futuras operaciones
    base = Number(base);

    return [numero, base];
}

/*****Nombre***************************************
*  esMayor
*****Descripción**********************************
*  Verifica si el operador 1 es mayor que el operador 2
*****Entradas************************************* 
* - operador1: El primero operador de la operacion
* - operador2: El segundo operador de la operacion
*****Salida************************************* 
* - true: Si el operador 1 es mayor que el operador 2
* - false: Si el operador 2 es mayor que el operador 1
**************************************************/
function esMayor(operador1, operador2) {
    operador1 = cerosAdelante(operador1); 
    operador2 = cerosAdelante(operador2);

    var largo1 = operador1.length;
    var largo2 = operador2.length;

    if(largo1 > largo2) {
        return true;
    } else if(largo2 > largo1) {
        return false;
    } else {
        for(var i = 0; i < operador1.length; i++) {
            var n1 = Number(letraANum(operador1[i]));
            var n2 = Number(letraANum(operador2[i]));

            if(n1 > n2) {
                return true; 
            } else if(n2 > n1) {
                return false;
            } 

        }
        
        return true;
    }
}

/*****Nombre***************************************
*  cerosAdelante
*****Descripción**********************************
*  Si un número tiene ceros insignificantes los elimina
* '000123' = '123'
*****Entradas************************************* 
* - numero: El numero que se le quiere eliminar los ceros
*****Salida************************************* 
* - numero: El número sin ceros insignificantes
**************************************************/
function cerosAdelante(numero) {
    //var nuevoN = numero;
    var digito = numero[0];

    while(digito == '0') {
        numero =  numero.slice(1);
        digito = numero[0];
    }

    if(numero === '') {
        numero = '0'
    }

    return numero;
}

/*****Nombre***************************************
*  actualizarNum
*****Descripción**********************************
*  Actualiza el operador 1 de una resta cuando "hay que pedir prestado"
*****Entradas************************************* 
* - indiceA: El indice del digito que no se pudo restar
* - num: La cadena de texto del número
* - base: La base en la que esta el número
*****Salida************************************* 
* - num: Número actualizado 
**************************************************/
function actualizarNum(indiceA, num, base) {
    var arregloNum = num.split('');
    var n1 = num[indiceA-1];
    var n2 = '';
    var res = Number(letraANum(n1)) -1;
    var indice = indiceA;

    //Si el numero no es suficiente busca le pedi al siguiente
    while(res < 0) {
        indice = indice-1;
        n1 = arregloNum[indice-1];
        res = Number(letraANum(n1)) -1;
    }

    //Actualiza los numeros a las que se les pidio
    while(indice < indiceA) {
        n1 = letraANum(arregloNum[indice-1]);
        n2 = letraANum(arregloNum[indice]);
        arregloNum[indice-1] = numALetra((Number(n1) -1).toString());
        arregloNum[indice] = numALetra((Number(n2) + base).toString());
        indice+=1;
    }

    //Actualiza al 1  numero que se le pidio
    n1 = letraANum(arregloNum[indiceA-1]);
    arregloNum[indiceA-1] = numALetra((Number(n1) - 1).toString());

    num = arregloNum.join('');
    return num;
}

/*****Nombre***************************************
*  agregar0
*****Descripción**********************************
*  Agrega un 0 al número dependiendo de la cantidad de multiplicaciones hechas
*****Entradas************************************* 
* - num: El numero que se le desea agregar un 0
* - i: Contador de multiplicaciones hechas
*****Salida************************************* 
* - num: Número con los ceros correspondientes
**************************************************/
function agregar0(num, i) {
    while(i > 0) {
        num = num + '0';
        i-=1;
    }

    return num;
}

///////////////////////////////////////////////////////////////////////////////////////////
//Funciones de validación
/*****Nombre***************************************
*  esBaseValida
*****Descripción**********************************
*  Verifica si el numero es valido segun la base puesta
*****Entradas************************************* 
* - operando: El operando de la operación
*****Salida************************************* 
* - true: Si es valida
* - false: Si no es valida
**************************************************/
function esBaseValida(operando) {
    var dato = numeroBase(operando);
    var numero = dato[0];
    var base = dato[1];

    //Verifica si esta dentro de ls bases permitidas
    if (base < 2 || base > 16) {
        return false;
    }

    // Recorre el número para ver si pertenece a su base
    for (let i = 0; i < numero.length; i++) {
        var num = letraANum(numero[i]);
        var intNum = Number(num);

        //Si algun número es mayor o igual a la base, no pertence a esa base
        if (intNum >= base) {
            return false;
        }

    }

    return true;

}

/*****Nombre***************************************
*  validaEntrada
*****Descripción**********************************
*  Funcion que verifica la entrada de la calculadora
*****Entradas************************************* 
* - entrada:una cadena de texto que recibira las operaciones
**************************************************/
function validaEntrada(entrada){
    var listaOperadores=["+","-","*","/"];
    var listaBases=["2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
    var listaLetras=["A","B","C","D","E","F"];

    var tamanno=entrada.length;
    if (tamanno==0){
        throw new Error("Debe ingresar una operacion");
    }
    var operadorAnterior="";

    for (let index = 0; index < tamanno; index++) {//Recorre toda la entrada
        const element = entrada[index];// Va a ser la variable con un caracter de la cadena
        operadorAnterior=entrada[index-1];

        var codA = entrada[index].charCodeAt(0);
        if ((element.charCodeAt(0)<48||element.charCodeAt(0)>58)&&!listaLetras.includes(element)){//Si no es un numero en codigo ASCII
            if (listaOperadores.includes(element)){
                if (operadorAnterior==element){
                    throw new Error("Repeticion de operador");;
                } else if (listaOperadores.includes(operadorAnterior)){
                    throw new Error("Error de operadores");
                }
            }
        }else{//Si es un numero, debe verificar que tenga una base y que este correcta
            var poseeBase=false;
            var indiceBase=0;

            for (let index2 = index; index2 < tamanno; index2++) {
                const element = entrada[index2];
                
                if (element=="_"){
                    if (index2+1<tamanno){
                        if (entrada[index2+1].charCodeAt(0)>47&&entrada[index2+1].charCodeAt(0)<58){
                            if (index2+2<tamanno){
                                if (entrada[index2+2].charCodeAt(0)>47 && entrada[index2+2].charCodeAt(0)<58){
                                    if(listaBases.includes(entrada[index2+1]+entrada[index2+2])){
                                        poseeBase=true;
                                        indiceBase=index2+2;
                                        index2=tamanno;
                                    }
                                }else if(listaBases.includes(entrada[index2+1])){
                                    poseeBase=true;
                                    indiceBase=index2+1;
                                    index2=tamanno;
                                } 
                            }else if(listaBases.includes(entrada[index2+1])){
                                poseeBase=true;
                                indiceBase=index2+1;
                                index2=tamanno;
                            }
                        }else{
                            index2=tamanno;
                        }
                    }
                } else if((element.charCodeAt(0)<48||element.charCodeAt(0)>58)&&!listaLetras.includes(element)){
                    index2=tamanno
                }
            }
            
            if (!esBaseValida(entrada.slice(index,indiceBase+1))){
                throw new Error("El numero tiene digitos invalidos en la base");
            }
            
            index=indiceBase;
            if(!poseeBase){
                throw new Error("La base es invalida")
            }
            
        }
        operadorAnterior=element;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//Funciones HTML
/*****Nombre***************************************
*  pTeclas
*****Descripción**********************************
*  Detecta que tecla se presiona
* Si no es una tecla permitida no realiza la acción
*****Entradas************************************* 
* - event: La acción que se realiza en el input
**************************************************/
function pTeclas(event) {
    //borrar resultado input
    document.getElementById("textR").value = 'Resultado';
    
    var estado = false;
    var letraStr = String.fromCharCode(event.keyCode);//Mantiene las letaras en mayuscula

    //Enter que representa =
    if(event.keyCode === 13) {
        igual();
        estado = false;
    } 

    //Teclas de 0-9
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
       estado = true;
    }

    //Teclas A-F
    if(event.keyCode >= 65 && event.keyCode <= 70) {
        mostrarEnInput(letraStr);
    }

    //Teclas direccionales
    if(event.keyCode >= 37 && event.keyCode <= 40) {
        estado = true;
    }

    //Teclas ( ) + - _ / *
    if(event.keyCode == 8) {
        estado = true;
    } else if(event.keyCode === 106) {
        estado = true;
    } else if(event.keyCode === 107) {
        estado = true;
    } else if(event.keyCode === 109) {
        estado = true;
    } else if(event.keyCode === 111) {
        estado = true;
    } else if(event.keyCode === 187) {
        estado = true;
    } else if(event.keyCode === 189) {
        estado = true;
    } 
    
    //No hace la accion si se presiona cualquier otra tecla
    if(estado === false) {
        event.preventDefault();
    }

}

/*****Nombre***************************************
*  mostrarEnInput
*****Descripción**********************************
* Muestra el valor del boton que se presione en el input
*****Entradas************************************* 
* - valor: El valor del botón que se presionó con el mouse
**************************************************/
function mostrarEnInput(valor) {
    //borar input resultado
    document.getElementById("textR").value = 'Resultado';

    var valorInput = document.getElementById("input").value;
    var nuevoValor = valorInput + valor;
    document.getElementById("input").value = nuevoValor;
}

/*****Nombre***************************************
*  eliminarDigito
*****Descripción**********************************
* Elimina el ultimo caracter del input
**************************************************/
function eliminarDigito() {
    var valorInput = document.getElementById("input").value;
    var largoTexto = valorInput.length;

    var nuevoValor = valorInput.slice(0,largoTexto -1);
    
    document.getElementById("input").value = nuevoValor;
}

/*****Nombre***************************************
*  actualizarHistorial
*****Descripción**********************************
* Actauliza el historial con la operacion y su resultado
*****Entradas************************************* 
* - texto: El texto del resultado
**************************************************/
function actualizarHistorial(texto) {
    var elemento = document.createElement('p');
    elemento.textContent = texto;
    document.getElementById('historialTexto').appendChild(elemento);
}

/*****Nombre***************************************
*  verHistorial
*****Descripción**********************************
* Abre una ventana para ver el historial
**************************************************/
function verHistorial() {
    var historial = document.getElementById("historial");
    var cerrar = document.getElementById("cerrar");
    cerrar.addEventListener("click", cerrarH);
    
    historial.showModal();
    
    function cerrarH() {
        historial.close();
    }
}

/*****Nombre***************************************
*  pResultado
*****Descripción**********************************
*  Muestra una ventana al usuario para preguntarle en que base deseada
* Guarda el valor ingresado despues de haber presionada ok
*****Salidas************************************* 
* - Si la promesa se cumplio, devuelve la base que el usuario ingreso
* - si no se cumplio, devuelve un error con su respectivo mensaje
**************************************************/
function pResultado() {
    //Se crea un Promise para que se guarde el valor del input solo despues de haber presionado ok
    return new Promise((resolve, reject) => {
        var dialogResultado = document.getElementById("baseResultado");
        var aceptar = document.getElementById("ok");

        aceptar.addEventListener("click", okR);
        dialogResultado.showModal();
        
        // Guarda la base y cierra la ventana
        function okR() {
            var baseResultado = document.getElementById("baResultado").value;

            //Verifica que no existan errores
            try {
                //Verifica si el input esta vació
                if (baseResultado === null || baseResultado.trim() === '') {
                    dialogResultado.close();
                    throw new Error('No se ingresó ningún valor.');
                } 
                
                //Verifica si se escribe un numero o una base permitida (2-16)
                let baseNumero = Number(baseResultado);
                if (isNaN(baseNumero) || baseNumero < 2 || baseNumero > 16) {
                    dialogResultado.close();
                    document.getElementById("baResultado").value = '';
                    throw new Error('La base ingresada no es válida.');
                } 

                //Si todo sale bien cierra la ventana y resuelve la promesa
                dialogResultado.close();
                resolve(baseResultado);
            } catch (error) {
                //Si hay errores rechaza la promesa
                reject(error);
            }

        }

    });

}

/*****Nombre***************************************
*  mostrarErrores
*****Descripción**********************************
* Habre una ventana con un mensaje de error
*****Entradas************************************* 
* - texto: El mensaje de error que e quiera mostrar
**************************************************/
function mostrarErrores(texto) {
    var error = document.getElementById("error");

    document.getElementById("errorTexto").innerHTML = texto;

    var cerrar = document.getElementById("cerrarE");
    cerrar.addEventListener("click", cerrarE);
    
    error.showModal();
    
    function cerrarE() {
        error.close();
    }
}