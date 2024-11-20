import {Router} from 'express';
import EspacoUFSCController from '../Controllers/EspacoUFSCController.js';
import { validId, validEspacoUFSC } from '../middlewares/global.middlewares.js';
const router = Router();

router.post("/", EspacoUFSCController.Create);
router.get("/", EspacoUFSCController.findAll);
router.get("/:id", validId, validEspacoUFSC, EspacoUFSCController.findById);
router.delete("/:id", EspacoUFSCController.DeleteEspacoUFSCbyId);
router.patch("/:id", validId, validEspacoUFSC, EspacoUFSCController.UpdateEspacoUFSCById)


export default router;