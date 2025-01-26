const { generalContext } = require('./general-context');

function getParam(name, options) {
    switch (name) {
        case 'query':
            return {
                name: options.name,
                in: 'query',
                required: options.required,
                schema: {
                    type: 'string',
                }
            };
        case 'param': {
            return {
                name: options.name,
                in: 'path',
                required: options.required,
                schema: {
                    type: 'string',
                }
            };
        }
        case 'body': {
            return {
                name: options.name,
            }
        }
    }
}

async function getDocPath(route) {
    const parameters = [];
    const paramCallback = (name, options) => parameters.push(getParam(name, options));
    generalContext.attach({ request: null, response: null, callback:  paramCallback });
    await route.callback();
    generalContext.clear();
    return {
        [route.method]: {
            parameters,
        }
    }
}

async function getDocsPaths(routes) {
    const paths = {};
    for (const route of routes) {
        paths[swaggify(route.path)] = await getDocPath(route);
    }
    return paths;
}

async function getDocs(routes) {
    return {
        openapi: '3.0.0',
        info: {
            title: 'Simplix API',
            version: '1.0.0',
        },
        paths: await getDocsPaths(routes),
    }
}

function swaggify(path) {
    return path.replace(/\/:([^\/]+)/g, '/{$1}');
}

module.exports = {
    getDocs,
    swaggify,
}