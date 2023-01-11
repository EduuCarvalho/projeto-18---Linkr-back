import { Router } from "express";
import { deleteTimelinePost, getCountTimelinePosts, getTimelinePosts, timelinePost, updateTimelinePost} from "../controllers/timelineController.js";
import authValidation from "../middlewares/authValidation.js";
import { countTimelinePostsValidation, getTimelinePostsValidation, timelinePostValidation } from "../middlewares/timelineValidation.js";

const timeline = Router();

timeline.post("/timeline", authValidation, timelinePostValidation, timelinePost);
timeline.get("/timeline", authValidation, getTimelinePostsValidation, getTimelinePosts);
timeline.get("/timeline/:postId", authValidation, countTimelinePostsValidation, getCountTimelinePosts);

timeline.patch("/timeline/:id", authValidation, updateTimelinePost);
timeline.delete("/timeline/:id", authValidation, deleteTimelinePost);

export default timeline;
