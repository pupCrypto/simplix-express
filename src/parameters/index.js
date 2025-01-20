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
function query(name, { required, ignoreSwagger } = {}) {
    return request().query[name];
}

/**
 * Returns path parameter value by name
 * @param {string} name Path parameter name
 * @returns {string} Path parameter value
 */
function param(name, { required, ignoreSwagger } = {}) {
    return request().params[name];
}

/**
 * Returns header value by name
 * @param {string} name Header name
 * @returns {string} Header value
 */
function header(name, { required, ignoreSwagger } = {}) {
    return request().headers[name];
}

/**
 * Return validated body of request
 * @param {object} schema
 * @returns {object} Validated body of request
 */
function body(schema, { required, ignoreSwagger } = {}) {
    if (header('content-type') === 'application/json') {
        return (new schema(request().body)).validate();
    } else {
        return (new schema(JSON.parse(request().body))).validate();
    }
}

module.exports = {
    request,
    query,
    param,
    header,
    body,
}