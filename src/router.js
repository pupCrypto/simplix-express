const express = require('express');
const { SimplixExpress } = require('./simplix');

class Router {
    _wrap = SimplixExpress.prototype._wrap;
}

module.exports = {
    Router,
}