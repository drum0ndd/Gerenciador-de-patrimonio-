import {Router} from 'express';
import PatrimonioController from '../Controllers/PatrimonioController.js';
import { validId, validPatrimonio } from '../middlewares/global.middlewares.js';
const router = Router();

router.post("/", PatrimonioController.create);
router.get("/", PatrimonioController.findAll);
router.get("/:id", validId, validPatrimonio, PatrimonioController.findById);
router.delete("/:id", PatrimonioController.DeletePatrimonioById);
router.patch("/:id", validId, validPatrimonio, PatrimonioController.UpdatePatrimonioById)


export default router;

