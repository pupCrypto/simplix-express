const { generalContext } = require('./general-context');
const express = require('express');

class SimplixExpress {
    constructor() {
        this.app = express();
    }

    get(path, callback) {
        this.app.get(path, this._wrap(callback));
    }

    listen(port, callback) {
        return this.app.listen(port, callback);
    }

    _wrap(callback) {
        return (req, res, next) => {
            generalContext.attach({ request: req, response: res });
            const result = callback();
            generalContext.clear();
            return res.send(result.toString());
        }
    }
}


module.exports = {
    SimplixExpress,
}