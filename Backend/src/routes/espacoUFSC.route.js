import {Router} from 'express';
import EspacoUFSCController from '../Controllers/EspacoUFSCController.js';
import { validId, validEspacoUFSC } from '../middlewares/global.middlewares.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = Router();

router.post("/", authMiddleware, EspacoUFSCController.Create);
router.get("/", authMiddleware, EspacoUFSCController.findAll);
router.get("/:id", authMiddleware, validId, validEspacoUFSC, EspacoUFSCController.findById); //puxa isso aqui na verificação do login para ver se o estudante tem espacoufsc
router.delete("/:id", authMiddleware, EspacoUFSCController.DeleteEspacoUFSCbyId);
router.patch("/:id", authMiddleware, validId, validEspacoUFSC, EspacoUFSCController.UpdateEspacoUFSCById)


export default router;