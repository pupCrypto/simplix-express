const { Router: RouterExpress } = require('express');

class Router {
    constructor() {
        this._router = RouterExpress();
        this._routes = [];
    }

    get(path, callback) {
        this._routes.push({ method: 'get', path, callback });
        this._router.get(path, this._wrap(callback));
    }
    post(path, callback) {
        this._routes.push({ method: 'post', path, callback });
        this._router.post(path, this._wrap(callback));
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
    Router,
}