import { create } from "../controllers/commentsControllers.js";
import authValidation from "../middlewares/authValidation.js";

import { Router } from "express";

const router = Router();

router.post("/comments", authValidation, create);

export default router;
