import {Router} from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

//fazendo o import apenas da função que vou usar
import { login } from '../Controllers/Auth.Controller.js';

router.post("/", authMiddleware, login);

export default router;


