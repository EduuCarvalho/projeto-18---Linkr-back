import { Router } from "express";
import { postLike } from "../controllers/likesController.js";
import authValidation from "../middlewares/authValidation.js";
import { postLikeValidation } from "../middlewares/likesValidation.js";
const likes = Router();

likes.post("/like", authValidation, postLikeValidation, postLike);

export default likes;