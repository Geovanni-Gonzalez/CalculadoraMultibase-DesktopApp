// renderer.js - UI Handler & Entry Point
const math = require('./math_core.js');

// Global state
let baseResultado = '';

// --- History Management ---
class HistoryManager {
    constructor() {
        this.historyKey = 'calc_history_v1';
        this.maxItems = 50;
    }

    load() {
        const stored = localStorage.getItem(this.historyKey);
        return stored ? JSON.parse(stored) : [];
    }

    save(item) {
        let history = this.load();
        history.push(item);
        if (history.length > this.maxItems) {
            history.shift(); // Remove oldest
        }
        localStorage.setItem(this.historyKey, JSON.stringify(history));
    }

    clear() {
        localStorage.removeItem(this.historyKey);
        this.render();
    }

    render() {
        const historyContainer = document.getElementById('historialTexto');
        historyContainer.innerHTML = ''; // Clear current
        const history = this.load(); // Load reversed? or as is.

        // Show newest first
        [...history].reverse().forEach(entry => {
            const p = document.createElement('p');
            p.textContent = entry;
            p.style.borderBottom = "1px solid #444";
            p.style.padding = "5px 0";
            historyContainer.appendChild(p);
        });

        // Add clear button if not exists
        if (history.length > 0 && !document.getElementById('btnClearHistory')) {
            const btn = document.createElement('button');
            btn.id = 'btnClearHistory';
            btn.textContent = 'Limpiar Historial';
            btn.className = 'bCerrar';
            btn.style.marginTop = '10px';
            btn.style.width = '100%';
            btn.addEventListener('click', () => this.clear());
            historyContainer.appendChild(btn);
        }
    }
}

const historyManager = new HistoryManager();

// --- UI Functions (Exposed to Window) ---

window.igual = async function () {
    var valorInput = document.getElementById("input").value;

    try {
        math.validaEntrada(valorInput);

        baseResultado = await pResultado();
        document.getElementById("baResultado").value = '';

        var entradaNueva = math.ordenarExpresion(valorInput);
        var valorResultado = math.calcular(entradaNueva);

        var numBase = math.numeroBase(valorResultado);
        var resultadoOp = numBase[0];
        var baseOp = numBase[1];
        var resultado = math.conversion(resultadoOp, baseOp, baseResultado);

        // History
        var resultadoH = valorInput + ' = ' + resultado + '_' + baseResultado;
        historyManager.save(resultadoH);
        historyManager.render(); // Update UI

        document.getElementById("input").value = '';
        document.getElementById("textR").value = resultado + '_' + baseResultado;

    } catch (error) {
        window.mostrarErrores(error.message);
        console.error(error.message);
    }
}

window.pTeclas = function (event) {
    document.getElementById("textR").value = 'Resultado';
    var estado = false;
    var letraStr = String.fromCharCode(event.keyCode);

    if (event.keyCode === 13) { // Enter
        window.igual();
        estado = false;
    }

    // 0-9
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        estado = true;
    }

    // A-F
    if (event.keyCode >= 65 && event.keyCode <= 70) {
        window.mostrarEnInput(letraStr);
    }

    // Arrows
    if (event.keyCode >= 37 && event.keyCode <= 40) {
        estado = true;
    }

    // Special Keys
    const allowedKeys = [8, 106, 107, 109, 111, 187, 189];
    if (allowedKeys.includes(event.keyCode)) {
        estado = true;
    }

    if (estado === false) {
        event.preventDefault();
    }
}

window.mostrarEnInput = function (valor) {
    document.getElementById("textR").value = 'Resultado';
    var valorInput = document.getElementById("input").value;
    var nuevoValor = valorInput + valor;
    document.getElementById("input").value = nuevoValor;
}

window.eliminarDigito = function () {
    var valorInput = document.getElementById("input").value;
    var largoTexto = valorInput.length;
    var nuevoValor = valorInput.slice(0, largoTexto - 1);
    document.getElementById("input").value = nuevoValor;
}

window.actualizarHistorial = function (texto) {
    // Deprecated in favor of HistoryManager but kept for safety
    historyManager.save(texto);
    historyManager.render();
}

window.verHistorial = function () {
    var historial = document.getElementById("historial");
    var cerrar = document.getElementById("cerrar");

    // Ensure listener doesn't stack
    cerrar.onclick = function () {
        historial.close();
    };

    historyManager.render(); // Ensure fresh data
    historial.showModal();
}

window.pResultado = function () {
    return new Promise((resolve, reject) => {
        var dialogResultado = document.getElementById("baseResultado");
        var aceptar = document.getElementById("ok");

        // Use onclick to avoid stacking event listeners
        aceptar.onclick = okR;
        dialogResultado.showModal();

        function okR() {
            var baseResultado = document.getElementById("baResultado").value;
            try {
                if (baseResultado === null || baseResultado.trim() === '') {
                    dialogResultado.close();
                    throw new Error('No se ingresó ningún valor.');
                }

                let baseNumero = Number(baseResultado);
                if (isNaN(baseNumero) || baseNumero < 2 || baseNumero > 16) {
                    dialogResultado.close();
                    document.getElementById("baResultado").value = '';
                    throw new Error('La base ingresada no es válida.');
                }

                dialogResultado.close();
                resolve(baseResultado);
            } catch (error) {
                reject(error);
            }
        }
    });
}

window.mostrarErrores = function (texto) {
    var error = document.getElementById("error");
    document.getElementById("errorTexto").innerHTML = texto;
    var cerrar = document.getElementById("cerrarE");

    cerrar.onclick = function () {
        error.close();
    };

    error.showModal();
}

// Initialize logic
document.addEventListener('DOMContentLoaded', () => {
    historyManager.render();
    console.log("Calculadora Initialized with Modular Architecture");
});
