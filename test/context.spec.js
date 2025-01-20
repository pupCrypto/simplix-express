const assert = require('node:assert');
const { describe, it } = require('node:test');
const { generalContext } = require('../src/general-context');
const { query } = require('../src/parameters');

describe('General Context', () => {
    it('should call back context paramCallback', () => {
        let cbArgs = {};
        generalContext.attach({ callback: (type, args) => {
            cbArgs.args = args;
            cbArgs.type = type;
        } });
        query('name', { required: true });
        assert.strictEqual(cbArgs.type, 'query');
        assert.strictEqual(cbArgs.args.name, 'name');
        assert.strictEqual(cbArgs.args.required, true);
        generalContext.clear();
        assert.strictEqual(generalContext(), undefined);
    });
});