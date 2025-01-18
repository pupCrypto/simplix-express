/**
 * Accept express application and return all routes
 * @param {import ('express').Application} app 
 * @returns {import ('express').Route[]}
 */
function getAllRoutes(app) {
    console.log(app._router);
}

module.exports = {
    getAllRoutes,
}