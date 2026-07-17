// Suite de regresión para math_core.js (node:test, sin dependencias).
// Ejecutar: node --test tests/
const { test } = require('node:test');
const assert = require('node:assert');
const m = require('../src/math_core.js');

test('conversion: verificación cruzada contra referencia en bases 2/8/10/16', () => {
    for (const val of [0, 1, 2, 7, 10, 15, 26, 100, 255, 1000, 4095]) {
        for (const from of [2, 8, 10, 16]) {
            for (const to of [2, 8, 10, 16]) {
                const input = val.toString(from).toUpperCase();
                const expected = val.toString(to).toUpperCase();
                assert.strictEqual(m.conversion(input, from, to), expected,
                    `conversion(${input}, ${from}, ${to})`);
            }
        }
    }
});

test('conversion: casos con letras y ceros', () => {
    assert.strictEqual(m.conversion('1A', 16, 10), '26');
    assert.strictEqual(m.conversion('FF', 16, 2), '11111111');
    assert.strictEqual(m.conversion('0', 2, 16), '0');
    assert.strictEqual(m.conversion('', 10, 2), '0');
});

test('suma con acarreo en varias bases', () => {
    assert.strictEqual(m.suma('7', '6', 8), '15');      // 13 dec = 15 oct
    assert.strictEqual(m.suma('1', '1', 2), '10');
    assert.strictEqual(m.suma('F', '1', 16), '10');
    assert.strictEqual(m.suma('FF', 'FF', 16), '1FE');
});

test('resta con préstamo', () => {
    assert.strictEqual(m.cerosAdelante(m.resta('10', '1', 2)), '1');
    assert.strictEqual(m.cerosAdelante(m.resta('10', '1', 16)), 'F');
    assert.strictEqual(m.cerosAdelante(m.resta('100', '1', 8)), '77');
});

test('multiplicacion en varias bases', () => {
    assert.strictEqual(m.multiplicacion('F', 'F', 16), 'E1');   // 225
    assert.strictEqual(m.multiplicacion('11', '11', 2), '1001'); // 3*3=9
    assert.strictEqual(m.multiplicacion('7', '7', 8), '61');     // 49 dec = 61 oct
});

test('division entera', () => {
    assert.strictEqual(m.division('1010', '10', 2), '101');  // 10/2=5
    assert.strictEqual(m.division('FF', '10', 16), 'F');     // 255/16=15
});

test('comparación de magnitudes (esMayor = mayor o igual)', () => {
    assert.strictEqual(m.esMayor('1F', '20'), false);
    assert.strictEqual(m.esMayor('20', '1F'), true);
    assert.strictEqual(m.esMayor('5', '5'), true); // semántica >= (requerida por resta)
});

test('esBaseValida: dígitos válidos para la base declarada', () => {
    assert.strictEqual(m.esBaseValida('1A_16'), true);
    assert.strictEqual(m.esBaseValida('12_2', ), false);  // dígito 2 inválido en base 2
    assert.strictEqual(m.esBaseValida('777_8'), true);
    assert.strictEqual(m.esBaseValida('8_8'), false);
});

test('validaEntrada rechaza operandos malformados', () => {
    assert.throws(() => m.validaEntrada('12G'));
});

test('evaluación de expresiones con precedencia', () => {
    assert.strictEqual(m.calcular(m.ordenarExpresion('2_10+3_10*4_10')), '14_10');
    assert.strictEqual(m.calcular(m.ordenarExpresion('10_2*11_2')), '110_2');
});

test('expresiones de bases mixtas se normalizan a la base mayor (regresión del bug de conversión)', () => {
    // 1A(16)=26 dec, 10(2)=2 dec → 28 dec = 1C hex
    assert.strictEqual(m.calcular(m.ordenarExpresion('1A_16+10_2')), '1C_16');
});
