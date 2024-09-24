// para crear/configurar los enrutadores principales de la aplicación de backend
// el mas importante es el de la api (todos los enrutadores de los recursos, para gestión de recursos)
// otro que suele estar aca es el enrutador de vistas

import { Router } from "express";
import apiRouter from "./api/index.api.js";

const router = Router();

router.use("/api", apiRouter);

export default router;
