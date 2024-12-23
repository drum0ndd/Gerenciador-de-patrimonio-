import {Router} from 'express';
import UserController from '../Controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middlewares.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

//user routes
router.post("/", UserController.create); //cria user: http://localhost:3000/user
router.get("/", authMiddleware, UserController.findAll);
router.get("/:id", authMiddleware, validId, validUser, UserController.findById);
router.delete("/:id", authMiddleware, UserController.DeleteUserbyId);
router.patch("/:id", authMiddleware, validId, validUser, UserController.UpdateUserById)


export default router;