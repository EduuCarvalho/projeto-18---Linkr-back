import { create } from "../controllers/commentsControllers.js";
import { commentsPostValidation } from "../middlewares/commentsValidation.js";
import authValidation from "../middlewares/authValidation.js";

import { Router } from "express";

const router = Router();

router.post("/comments", authValidation, commentsPostValidation, create);

export default router;
