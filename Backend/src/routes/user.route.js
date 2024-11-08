const route = require('express').Router();
const UserController = require('../Controllers/user.controller');
const {validId, validUser} = require("../middlewares/global.middlewares")

route.post("/", UserController.create);
route.get("/", UserController.findAll);
route.get("/:id", validId, validUser, UserController.findById);
route.delete("/:id", UserController.DeleteUserbyId);
route.patch("/:id", validId, validUser, UserController.UpdateUserById)


module.exports = route;