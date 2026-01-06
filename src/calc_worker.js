// calc_worker.js - Worker for background calculations
const math = require('./math_core.js');

self.onmessage = function (e) {
    const { type, payload } = e.data;

    try {
        if (type === 'CALC') {
            const { valorInput, baseResultado } = payload;

            // 1. Validate
            math.validaEntrada(valorInput);

            // 2. Parse & Calculate
            var entradaNueva = math.ordenarExpresion(valorInput);
            var valorResultado = math.calcular(entradaNueva);

            var numBase = math.numeroBase(valorResultado);
            var resultadoOp = numBase[0];
            var baseOp = numBase[1];

            // 3. Convert with tracking
            var resultado = math.conversion(resultadoOp, baseOp, baseResultado, true);
            const conversionSteps = math.getSteps();
            const calculationSteps = math.getCalcSteps();

            // Unified procedure steps: Expressing tracing first, then final conversion
            const allSteps = [
                "<strong>Evaluación de Expresión:</strong>",
                ...calculationSteps,
                "<br/><strong>Conversión Final:</strong>",
                ...conversionSteps
            ];

            self.postMessage({
                type: 'SUCCESS',
                payload: {
                    resultado,
                    steps: allSteps,
                    valorInput,
                    baseResultado
                }
            });
        }
    } catch (error) {
        self.postMessage({
            type: 'ERROR',
            payload: error.message
        });
    }
};
