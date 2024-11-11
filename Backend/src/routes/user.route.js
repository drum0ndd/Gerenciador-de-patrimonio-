import express from 'express';
import UserController from '../Controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';
const router = express.Router();


router.post("/", UserController.create);
router.get("/", UserController.findAll);
router.get("/:id", validId, validUser, UserController.findById);
router.delete("/:id", UserController.DeleteUserbyId);
router.patch("/:id", validId, validUser, UserController.UpdateUserById)


export default router;