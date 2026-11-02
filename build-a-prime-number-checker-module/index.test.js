const assert = require('node:assert/strict');
const{ isPrime } = require('./index');

assert.strictEqual(isPrime(2), true);
assert.strictEqual(isPrime(7), true);
assert.strictEqual(isPrime(11), true);

assert.strictEqual(isPrime(1), false);
assert.strictEqual(isPrime(9), false);
assert.strictEqual(isPrime(0), false);
assert.strictEqual(isPrime(-5), false);

console.log('All test passed')