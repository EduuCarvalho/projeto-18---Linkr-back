import { findTop10 } from "../controllers/trendingControllers.js";
import authValidation from "../middlewares/authValidation.js";

import { Router } from "express";

const router = Router();

router.get("/trending", authValidation, findTop10);

export default router;
