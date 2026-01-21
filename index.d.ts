/**
 * Checks if a given value is a plain object and has no own properties.
 * Returns `true` only for empty plain objects (`{}`), and `false` for arrays, null, undefined, or objects with keys.
 *
 * Handles edge cases like objects with enumerable symbols, getters/setters, and prototype properties.
 *
 * @param {unknown} obj - The value to check.
 * @returns {boolean} - `true` if the value is an empty object, otherwise `false`.
 *
 * @example
 * isObjectEmpty2({});           // true
 * isObjectEmpty2({ a: 1 });     // false
 * isObjectEmpty2([]);           // false
 * isObjectEmpty2(null);         // false
 * isObjectEmpty2(undefined);    // false
 */
declare const isObjectEmpty2: (obj: unknown) => boolean;

export = isObjectEmpty2;
