const { generalContext } = require('../general-context');

function attachGeneralContextMiddleware(request, response, next) {
    generalContext.attach({ request, response });
    next();
}

function clearGeneralContextMiddleware(req, res, next) {
    generalContext.clear();
    next();
}

module.exports = {
    attachGeneralContextMiddleware,
};