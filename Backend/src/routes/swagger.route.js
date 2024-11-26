import { Router } from "express";
const router = Router();

import swaggerui from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

router.use ("/", swaggerui.serve, swaggerui.setup(swaggerDocument));
router.get ("/", swaggerui.setup(swaggerDocument));


export default router;



