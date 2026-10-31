const assert = require('node:assert/strict')
const caseConverter = require("./index")
assert.strictEqual(
  caseConverter.getUpperCase('hello free code camp!'),
  'HELLO FREE CODE CAMP!'
);

assert.strictEqual(
  caseConverter.getLowerCase('hello free code camp!'),
  'hello free code camp!'
);

assert.strictEqual(caseConverter.getSentenceCase("hello free Code Camp!"), "Hello free code camp!");

assert.strictEqual(caseConverter.getProperCase("hello free Code Camp!"), "Hello Free Code Camp!");
