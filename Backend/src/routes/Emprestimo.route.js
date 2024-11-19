import {Router} from 'express';
import EmprestimoController from '../Controllers/EmprestimoController';
import { validId, validEmprestimo } from '../middlewares/global.middlewares.js';
const router = Router();

router.post("/", EmprestimoController.create);
router.get("/", EmprestimoController.findAll);
router.get("/:id", validId, validEmprestimo, EmprestimoController.findById);
router.delete("/:id", EmprestimoController.DeleteEmprestimobyId);
//não possui atualização no emprestimo

export default router;