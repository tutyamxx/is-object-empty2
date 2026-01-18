# is-object-empty2

<p align="center"><a href="https://nodei.co/npm/is-object-empty2/"><img src="https://nodei.co/npm/is-object-empty2.png"></a></a></p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
</p>

# Simple yet robust NPM package that checks if a value is a plain empty object in `JavaScript` and `TypeScript`.

- Returns `true` **only** for plain objects with no own enumerable properties (`{}` or `Object.create(null)`).
- Returns `false` for arrays, `null`, `undefined`, functions, symbols, BigInt, or objects with keys.
- Correctly handles:
  - Objects created with `Object.create(null)`
  - Frozen or sealed objects
  - Proxy objects (both empty and with keys)
  - Objects with inherited properties
  - Objects with non-enumerable properties
  - Nested or deeply nested objects


# 📦 Install via [NPM](https://www.npmjs.com/package/is-object-empty2)

```bash
$ npm i is-object-empty2
```

# 💻 Usage

- Returns `true` only for empty objects (`{}`), and `false` for arrays, null, undefined, or objects with keys.
- See examples below

# JavaScript
```javascript
const isObjectEmpty2 = require('is-object-empty');

console.log(isObjectEmpty2({}));           // true
console.log(isObjectEmpty2({ a: 1 }));     // false
console.log(isObjectEmpty2([]));           // false
console.log(isObjectEmpty2(null));         // false
console.log(isObjectEmpty2(undefined));    // false
```

# TypeScript
```javascript
import isObjectEmpty2 = require('is-object-empty');

const testValues: unknown[] = [
    {},
    { a: 1 },
    [],
    null,
    undefined,
    Object.create(null),
    { nested: {} }
];

for (const value of testValues) {
    const result: boolean = isObjectEmpty2(value);
    console.log(`${JSON.stringify(value)} → ${result}`);
}

/*
--| Expected values:

{} → true
{"a":1} → false
[] → false
null → false
undefined → false
{} → true
{"nested":{}} → false
*/
```
