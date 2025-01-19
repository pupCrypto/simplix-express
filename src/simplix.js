const { generalContext } = require('./general-context');
const express = require('express');

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