const isObjectEmpty2 = require('../index.js')

describe('isObjectEmpty2', () => {
    test('Returns true for an empty object', () => expect(isObjectEmpty2({})).toBe(true));

    test('Returns false for a non-empty object', () => {
        expect(isObjectEmpty2({ a: 1 })).toBe(false);
        expect(isObjectEmpty2({ key: 'value' })).toBe(false);
    });

    test('Returns false for arrays', () => {
        expect(isObjectEmpty2([])).toBe(false);
        expect(isObjectEmpty2([1, 2, 3])).toBe(false);
    });

    test('Returns false for null and undefined', () => {
        expect(isObjectEmpty2(null)).toBe(false);
        expect(isObjectEmpty2(undefined)).toBe(false);
    });

    test('Returns false for non-object types', () => {
        expect(isObjectEmpty2('string')).toBe(false);
        expect(isObjectEmpty2(123)).toBe(false);
        expect(isObjectEmpty2(true)).toBe(false);
        expect(isObjectEmpty2(Infinity)).toBe(false);
        expect(isObjectEmpty2(-Infinity)).toBe(false);
        expect(isObjectEmpty2(() => {})).toBe(false);
        expect(isObjectEmpty2(Symbol('sym'))).toBe(false);
        expect(isObjectEmpty2(BigInt(123))).toBe(false);
    });

    test('Returns true for object created with Object.create(null)', () => {
        const obj = Object.create(null);
        expect(isObjectEmpty2(obj)).toBe(true);

        obj.a = 1;

        expect(isObjectEmpty2(obj)).toBe(false);
    });

    test('Nested empty object still counts as non-empty', () => expect(isObjectEmpty2({ nested: {} })).toBe(false));

    test('Deeply nested empty objects still count as non-empty', () => {
        const obj = { a: { b: { c: {} } } };
        expect(isObjectEmpty2(obj)).toBe(false);
    });

    test('Objects with inherited properties are considered non-empty', () => {
        function Parent() {
            this.a = 1;
        }

        const child = new Parent();
        expect(isObjectEmpty2(child)).toBe(false);
    });

    test('Frozen empty objects still return true', () => {
        const obj = Object.freeze({});
        expect(isObjectEmpty2(obj)).toBe(true);
    });

    test('Sealed empty objects still return true', () => {
        const obj = Object.seal({});
        expect(isObjectEmpty2(obj)).toBe(true);
    });

    test('Proxy objects with empty target return true', () => {
        const target = {};
        const proxy = new Proxy(target, {});

        expect(isObjectEmpty2(proxy)).toBe(true);
    });

    test('Proxy objects with keys return false', () => {
        const target = { a: 1 };
        const proxy = new Proxy(target, {});

        expect(isObjectEmpty2(proxy)).toBe(false);
    });

    test('Objects with non-enumerable properties are considered empty', () => {
        const obj = {};

        Object.defineProperty(obj, 'hidden', { value: 123, enumerable: false });
        expect(isObjectEmpty2(obj)).toBe(true);
    });

    test('Object with Symbol property is considered non-empty', () => {
        const obj = {};
        const sym = Symbol('test');

        obj[sym] = 123;
        expect(isObjectEmpty2(obj)).toBe(false);
    });

    test('Object with multiple Symbol properties is considered non-empty', () => {
        const obj = {};

        const sym1 = Symbol('test1');
        const sym2 = Symbol('test2');

        obj[sym1] = 123;
        obj[sym2] = 456;

        expect(isObjectEmpty2(obj)).toBe(false);
    });

    test('Object with mixed enumerable and non-enumerable properties is considered non-empty', () => {
        const obj = { a: 1 };
        const sym = Symbol('test');

        Object.defineProperty(obj, sym, { value: 123, enumerable: false });
        expect(isObjectEmpty2(obj)).toBe(false);
    });

    test('Object with only non-enumerable properties is considered empty', () => {
        const obj = {};

        Object.defineProperty(obj, 'prop1', { value: 1, enumerable: false });
        Object.defineProperty(obj, 'prop2', { value: 2, enumerable: false });

        expect(isObjectEmpty2(obj)).toBe(true);
    });

    test('Objects with prototype properties are considered non-empty', () => {
        function Parent() {
            this.inherited = 'value';
        }

        Parent.prototype.inheritedProp = 'prototype-value';

        const child = new Parent();
        expect(isObjectEmpty2(child)).toBe(false);
    });

    test('Objects with getter/setter properties', () => {
        const obj = {};

        Object.defineProperty(obj, 'computed', {
            get() { return 'value'; },
            set() { /* setter */ },
            enumerable: true
        });

        expect(isObjectEmpty2(obj)).toBe(false);
    });

    test('Object.create(null) with enumerable properties', () => {
        const obj = Object.create(null);

        obj.a = 1;
        expect(isObjectEmpty2(obj)).toBe(false);
    });
});
