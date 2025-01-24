const { generalContext } = require('./general-context');
const express = require('express');
const swaggerUi = require('swagger-ui-express');


class SimplixExpress {
    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    get(path, callback) {
        this.app.get(path, this._wrap(callback));
    }
    post(path, callback) {
        this.app.post(path, this._wrap(callback));
    }

    listen(port, callback) {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(this._genDocs()));
        return this.app.listen(port, callback);
    }

    _genDocs() {
        // paramCallback = (type, params) => {
        //     console.log(type, params);
        // };
        // generalContext.attach({ callback: paramCallback });
        return {
            openapi: '3.0.0',
            info: {
                title: 'Simplix API',
                version: '1.0.0',
            }
        };
    }

    _wrap(callback) {
        return async (req, res, next) => {
            generalContext.attach({ request: req, response: res });
            try {
                var result = await callback();
            } catch(e) {
                return res.status(500).send('Internal Server Error');
            }
            generalContext.clear();
            return res.send(result.toString());
        }
    }
}


module.exports = {
    SimplixExpress,
}