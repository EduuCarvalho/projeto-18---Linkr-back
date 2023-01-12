import { findPostsByHashtag } from "../controllers/hashtagsControllers.js";
import authValidation from "../middlewares/authValidation.js";

import { Router } from "express";
import { getTimelinePostsValidation } from "../middlewares/timelineValidation.js";

const router = Router();

router.get("/hashtag/:hashtag", authValidation, getTimelinePostsValidation, findPostsByHashtag);

export default router;
