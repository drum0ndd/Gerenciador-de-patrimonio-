import {Router} from 'express';
const router = Router();

//fazendo o import apenas da função que vou usar
import { login } from '../Controllers/Auth.Controller.js';

router.post("/", login);

export default router;


