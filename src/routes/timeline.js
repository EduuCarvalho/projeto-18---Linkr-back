import { Router } from "express";
import { timelinePost } from "../controllers/timelineController.js";
import authValidation from "../middlewares/authValidation.js";
import { timelinePostValidation } from "../middlewares/timelineValidation.js";

const timeline = Router();

timeline.post('/timeline', authValidation, timelinePostValidation, timelinePost);

export default timeline;