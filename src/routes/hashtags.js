import { findPostsByHashtag } from "../controllers/hashtagsControllers.js";
import authValidation from "../middlewares/authValidation.js";

import { Router } from "express";

const router = Router();

router.get("/hashtag/:hashtag", authValidation, findPostsByHashtag);

export default router;
