const { generalContext } = require('./general-context');

function request() {
    return generalContext().request;
}

module.exports = {
    request,
}