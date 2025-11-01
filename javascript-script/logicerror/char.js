/**
 * Inverte uma string, respeitando caracteres Unicode (grapheme clusters).
 * Lança TypeError se o argumento não for string.
 * @param {string} str
 * @returns {string}
 */
function reverseString(str) {
    if (typeof str !== 'string') {
        throw new TypeError('O argumento deve ser uma string');
    }

    // Preferência por Intl.Segmenter para respeitar grapheme clusters (families, emojis, combinações)
    if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
        const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        const parts = Array.from(seg.segment(str), s => s.segment);
        return parts.reverse().join('');
    }

    // Fallback: Array.from lida com pares substitutos (surrogate pairs) mas pode falhar em alguns combining clusters.
    return Array.from(str).reverse().join('');
}

// Testes
console.log(reverseString(''));                         // -> ''
console.log(reverseString('a'));                        // -> 'a'
console.log(reverseString('olá'));                      // -> 'álo'
console.log(reverseString('🙂😀'));                     // -> '😀🙂'
console.log(reverseString('e\u0301'));                  // 'e' + combining acute -> correto com Segmenter
console.log(reverseString('👩‍👩‍👧‍👦'));                 // família (ZWJ) -> tratado por Segmenter

module.exports = { reverseString };