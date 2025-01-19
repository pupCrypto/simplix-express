const assert = require('node:assert');
const { describe, it } = require('node:test');
const { SimplixExpress } = require('../src/simplix');
const { query, param, header } = require('../src/parameters');

describe('Simplix', () => {
    it('should handle get request', async () => {
        const simplix = new SimplixExpress();
        simplix.get('/', () => {
            return 'Hello World!';
        });
        const server = simplix.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000/');
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Hello World!');
        server.close();
    });
    it('should handle get request with query parameter', async () => {
        const simplix = new SimplixExpress();
        simplix.get('/', (name = query('name')) => {
            return `Hello World! ${name}`;
        });
        const server = simplix.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000/?name=John');
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Hello World! John');
        server.close();
    });
    it('should handle get request with path parameter', async () => {
        const simplix = new SimplixExpress();
        simplix.get('/param/:name', (name = param('name')) => {
            return `Hello World! ${name}`;
        });
        const server = simplix.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000/param/John');
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Hello World! John');
        server.close();
    });
    it('should handle get request with header parameter', async () => {
        const simplix = new SimplixExpress();
        simplix.get('/', (name = header('name')) => {
            return `Hello World! ${name}`;
        });
        const server = simplix.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000/', {
            headers: {
                name: 'John',
            },
        });
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Hello World! John');
        server.close();
    });
    it('should handle get request with error', async () => {
        function errorDep() {
            throw new Error('Error');
        }

        const simplix = new SimplixExpress();
        simplix.get('/', (param = errorDep()) => {
            return `Hello World! ${param}`;
        });

        const server = simplix.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000/');
        assert.strictEqual(resp.status, 500);
        assert.strictEqual(await resp.text(), 'Internal Server Error');
        server.close();
    });
    it('should handle get request with async dependency', async () => {
        async function asyncDep() {
            return 'Hello World!';
        }

        const simplix = new SimplixExpress();
        simplix.get('/', async (param = asyncDep()) => {
            return `Test ${await param}`;
        });

        const server = simplix.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000/');
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Test Hello World!');
        server.close();
    });
});