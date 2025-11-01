/**
 * Retorna o n-ésimo número de Fibonacci (F(0)=0, F(1)=1).
 * Lança erro para entradas inválidas (não inteiro, NaN, infinito, negativo).
 * Usa memoização internamente para desempenho, mantendo a recursão.
 */
function fibonacci(n, _memo = {}) {
    if (typeof n !== 'number' || !Number.isFinite(n) || !Number.isInteger(n)) {
        throw new TypeError('n deve ser um número inteiro válido');
    }
    if (n < 0) {
        throw new RangeError('n deve ser um inteiro não-negativo');
    }
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (_memo[n] !== undefined) return _memo[n];
    _memo[n] = fibonacci(n - 1, _memo) + fibonacci(n - 2, _memo);
    return _memo[n];
}

// Exemplo de uso:
// console.log(fibonacci(0)); // 0
// console.log(fibonacci(1)); // 1
// console.log(fibonacci(10)); // 55

module.exports = { fibonacci };