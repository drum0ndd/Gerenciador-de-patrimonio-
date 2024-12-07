import {Router} from 'express';
import EmprestimoController from '../Controllers/EmprestimoController.js';
import { validId, validEmprestimo } from '../middlewares/global.middlewares.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = Router();

router.post("/", authMiddleware, EmprestimoController.create);
router.get("/", authMiddleware, EmprestimoController.findAllByEspacoUFSC);
router.get("/:id", validId, validEmprestimo, EmprestimoController.findById);
router.delete("/:id", authMiddleware, EmprestimoController.DeleteEmprestimobyId);
router.get("/byUser", authMiddleware, EmprestimoController.EmprestimoByUserAluno); //pega todos os emprestimos de um usuario
//não possui atualização no emprestimo

export default router;