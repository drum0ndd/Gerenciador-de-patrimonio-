const route = require('express').Router();

const UserController = require('../Controllers/user.controller');

route.get("/", UserController.soma);

module.exports = route;