import { Router } from "express";
import {
  deleteTimelinePost,
  getTimelinePosts,
  timelinePost,
  updateTimelinePost,
} from "../controllers/timelineController.js";
import authValidation from "../middlewares/authValidation.js";
import { timelinePostValidation } from "../middlewares/timelineValidation.js";

const timeline = Router();

timeline.post(
  "/timeline",
  authValidation,
  timelinePostValidation,
  timelinePost
);
timeline.get("/timeline", authValidation, getTimelinePosts);

timeline.patch("/timeline/:id", authValidation, updateTimelinePost);
timeline.delete("/timeline/:id", authValidation, deleteTimelinePost);

export default timeline;
