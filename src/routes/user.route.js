const route = require('express').Router();

const UserController = require('../Controllers/user.controller');

route.post("/", UserController.create);

module.exports = route;