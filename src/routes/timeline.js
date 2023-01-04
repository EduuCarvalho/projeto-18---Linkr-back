import { Router } from "express";
import { getTimelinePosts, timelinePost } from "../controllers/timelineController.js";
import authValidation from "../middlewares/authValidation.js";
import { timelinePostValidation } from "../middlewares/timelineValidation.js";

const timeline = Router();

timeline.post('/timeline', authValidation, timelinePostValidation, timelinePost);
timeline.get('/timeline', authValidation, getTimelinePosts);

export default timeline;