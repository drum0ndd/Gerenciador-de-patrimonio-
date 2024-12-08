import {Router} from 'express';
import PatrimonioController from '../Controllers/PatrimonioController.js';
import { validId, validPatrimonio } from '../middlewares/global.middlewares.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = Router();

router.post("/", authMiddleware, PatrimonioController.create); //cria patrimonio: http://localhost:3000/patrimonio
router.get("/", authMiddleware, PatrimonioController.findAll); //lista todos os patrimonios
router.get("/:id", authMiddleware, validId, validPatrimonio, PatrimonioController.FindById); //lista patrimonio por id
router.delete("/:id", authMiddleware, PatrimonioController.DeletePatrimonio); //deleta patrimonio por id
router.patch("/:id", authMiddleware, validId, validPatrimonio, PatrimonioController.UpdatePatrimoniobyId)


export default router;

