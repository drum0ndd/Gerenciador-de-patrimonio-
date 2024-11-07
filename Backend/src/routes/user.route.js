const route = require('express').Router();
const UserController = require('../Controllers/user.controller');

route.post("/", UserController.create),
route.get("/", UserController.findAll),
route.get("/:id", UserController.findById),
route.delete("/:id", UserController.DeleteUserbyId)


module.exports = route;