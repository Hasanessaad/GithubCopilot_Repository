/**
 * Retorna o maior número do array ou null se o array estiver vazio.
 * Lança TypeError se o argumento não for um array ou se algum elemento não for número.
 * @param {Array<number>} arr
 * @returns {number|null}
 */
function findMax(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('O argumento deve ser um array');
    }
    if (arr.length === 0) return null;
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        if (typeof v !== 'number' || !Number.isFinite(v)) {
            throw new TypeError('Todos os elementos do array devem ser números finitos');
        }
        if (v > max) max = v;
    }
    return max;
}

// Testes
console.log(findMax([]));            // -> null
console.log(findMax([42]));          // -> 42
console.log(findMax([1, 7, 3, 7]));  // -> 7
console.log(findMax([-5, -2, -9]));  // -> -2

module.exports = { findMax };