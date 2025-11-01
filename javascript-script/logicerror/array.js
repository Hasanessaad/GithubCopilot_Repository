/**
 * Remove duplicatas de um array sem usar Set(), preservando a ordem.
 * Retorna um novo array.
 */
function removeDuplicates(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('O argumento deve ser um array');
    }
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];
        if (result.indexOf(value) === -1) {
            result.push(value);
        }
    }
    return result;
}

// Testes
console.log(removeDuplicates([]));         // -> []
console.log(removeDuplicates([42]));       // -> [42]
console.log(removeDuplicates([1,2,2,3,1])); // -> [1,2,3]

module.exports = { removeDuplicates };