import { Router } from "express";
import { getUserPosts, getUsersBySearch } from "../controllers/usersController.js";
import authValidation from "../middlewares/authValidation.js";
import { getTimelinePostsValidation } from "../middlewares/timelineValidation.js";

const users = Router();

users.get('/users', authValidation, getUsersBySearch);
users.get('/users/:id', authValidation, getTimelinePostsValidation, getUserPosts);

export default users;