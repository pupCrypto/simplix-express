const epxress = require('express');
const assert = require('node:assert');
const { describe, it } = require('node:test');

describe('Express', () => {
    it('should handle get request', async () => {
        const app = epxress();
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        const server = app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000');
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Hello World!');
        server.close();
    });
    it('should handld get request with query parameter', async () => {
        const app = epxress();
        app.get('/', (req, res) => {
            res.send(`Hello World! ${req.query.name}`);
        });
        const server = app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000?name=John');
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Hello World! John');
        server.close();
    });
    it('should handle get request with path parameter', async () => {
        const app = epxress();
        app.get('/param/:name', (req, res) => {
            res.send(`Hello World! ${req.params.name}`);
        });
        const server = app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        const resp = await fetch('http://localhost:3000/param/John');
        assert.strictEqual(resp.status, 200);
        assert.strictEqual(await resp.text(), 'Hello World! John');
        server.close();
    });
});