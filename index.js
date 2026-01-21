/**
 *  is-object-empty2 - 📦 Tiny utility to check if a value is a plain empty object in JavaScript and TypeScript
 *  @version: v1.0.8
 *  @link: https://github.com/tutyamxx/is-object-empty2
 *  @license: MIT
 **/


/**
 * Checks if a given value is a plain object with no own properties.
 * Returns `true` only for empty objects (`{}`), and `false` for arrays, null, undefined, or objects with keys.
 *
 * Handles edge cases like objects with enumerable symbols, getters/setters, and prototype properties.
 *
 * @param {unknown} obj - The value to check.
 * @returns {boolean} `true` if the value is an empty plain object, otherwise `false`.
 *
 * @example
 * isObjectEmpty2({});           // true
 * isObjectEmpty2({ a: 1 });     // false
 * isObjectEmpty2([]);           // false
 * isObjectEmpty2(null);         // false
 * isObjectEmpty2(undefined);    // false
 */
const isObjectEmpty2 = obj => (!!obj && typeof obj === 'object')
    && !Array.isArray(obj)
    && !(Object.keys(obj)?.length ?? 0)
    && !(Object.getOwnPropertySymbols(obj)?.some(s => Object.getOwnPropertyDescriptor(obj, s)?.enumerable) ?? false);

// --| CommonJS export
module.exports = isObjectEmpty2;

// --| ESM default export for `import` statements
module.exports.default = isObjectEmpty2;
