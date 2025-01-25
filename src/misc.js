const { generalContext } = require('./general-context');

async function getDocPath(route) {
    const parameters = [];
    const paramCallback = (name, options) => {
        parameters.push({
            name: options.name,
            in: name,
            required: options.required,
            schema: {
                type: 'string',
            }
        });
    }
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
        paths[route.path] = await getDocPath(route);
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

module.exports = {
    getDocs,
}