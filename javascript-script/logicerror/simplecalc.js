/**
 * Calculadora simples: soma, subtração, multiplicação e divisão.
 * Valida argumentos e trata divisão por zero lançando RangeError.
 */

function _validateNumbers(...args) {
    for (const v of args) {
        if (typeof v !== 'number' || !Number.isFinite(v)) {
            throw new TypeError('Os argumentos devem ser números finitos');
        }
    }
}

function add(a, b) {
    _validateNumbers(a, b);
    return a + b;
}

function subtract(a, b) {
    _validateNumbers(a, b);
    return a - b;
}

function multiply(a, b) {
    _validateNumbers(a, b);
    return a * b;
}

function divide(a, b) {
    _validateNumbers(a, b);
    if (b === 0) {
        throw new RangeError('Divisão por zero não é permitida');
    }
    return a / b;
}

// Testes básicos
console.log('add(2,3) =', add(2, 3));           // -> 5
console.log('subtract(5,2) =', subtract(5, 2)); // -> 3
console.log('multiply(3,4) =', multiply(3, 4)); // -> 12
console.log('divide(10,2) =', divide(10, 2));   // -> 5

try {
    divide(1, 0);
} catch (err) {
    console.error('divide(1,0) ->', err.message); // -> Divisão por zero não é permitida
}

module.exports = { add, subtract, multiply, divide };