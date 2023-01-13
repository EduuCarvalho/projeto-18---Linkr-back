import { create, findById } from "../controllers/commentsControllers.js";
import { commentsPostValidation } from "../middlewares/commentsValidation.js";
import authValidation from "../middlewares/authValidation.js";

import { Router } from "express";

const router = Router();

router.get("/comments/:id", authValidation, findById);
router.post("/comment", authValidation, commentsPostValidation, create);

export default router;
