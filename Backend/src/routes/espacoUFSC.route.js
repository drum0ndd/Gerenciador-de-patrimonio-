const route = require('express').Router();
const EspacoUFSCController = require('../Controllers/EspacoUFSCController');

route.post("/", EspacoUFSCController.Create);


module.exports = route;