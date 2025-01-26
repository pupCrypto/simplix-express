const assert = require('node:assert');
const { describe, it } = require('node:test');
const { swaggify } = require('../src/misc');

describe('misc tests', () => {
    it('should swaggify path', () => {
        assert.strictEqual(swaggify('/test/:test'), '/test/{test}');
    });
});