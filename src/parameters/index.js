const { generalContext } = require('../general-context');

/**
 * Current express request object
 * @returns {import('express').Request}
 */
function request() {
    return generalContext().request;
}

/**
 * Returns query parameter value by name
 * @param {string} name Query parameter name
 * @returns {string} Query parameter value
 */
function query(name) {
    return request().query[name];
}

/**
 * Returns path parameter value by name
 * @param {string} name Path parameter name
 * @returns {string} Path parameter value
 */
function param(name) {
    return request().params[name];
}

/**
 * Returns header value by name
 * @param {string} name Header name
 * @returns {string} Header value
 */
function header(name) {
    return request().headers[name];
}

module.exports = {
    request,
    query,
    param,
    header,
}