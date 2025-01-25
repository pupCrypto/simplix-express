const { generalContext } = require('./general-context');
const { getDocs } = require('./misc');
const express = require('express');
const swaggerUi = require('swagger-ui-express');


class SimplixExpress {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this._allRoutes = [];
    }

    get(path, callback) {
        this._allRoutes.push({ method: 'get', path, callback });
        this.app.get(path, this._wrap(callback));
    }
    post(path, callback) {
        this._allRoutes.push({ method: 'post', path, callback });
        this.app.post(path, this._wrap(callback));
    }

    async listen(port, callback) {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(await getDocs(this._allRoutes)));
        return this.app.listen(port, callback);
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