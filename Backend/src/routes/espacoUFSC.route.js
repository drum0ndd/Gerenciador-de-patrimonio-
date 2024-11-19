const router = require('express')
import EspacoUFSCController from '../Controllers/EspacoUFSCController';
import { validId, validEspacoUFSC } from '../middlewares/global.middlewares.js';

const router = Router();

router.post("/", EspacoUFSCController.create);
router.get("/", EspacoUFSCController.findAll);
router.get("/:id", validId, validEspacoUFSC, EspacoUFSCController.findById);
router.delete("/:id", EspacoUFSCController.DeleteEspacoUFSCbyId);
router.patch("/:id", validId, validEspacoUFSC, EspacoUFSCController.UpdateEspacoUFSCById)


export default router;