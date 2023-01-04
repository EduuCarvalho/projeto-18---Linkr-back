import { Router } from "express";
import { deleteLike, postLike } from "../controllers/likesController.js";
import authValidation from "../middlewares/authValidation.js";
import { deleteLikeValidation, postLikeValidation } from "../middlewares/likesValidation.js";
const likes = Router();

likes.post("/like", authValidation, postLikeValidation, postLike);
likes.delete("/like", authValidation, deleteLikeValidation, deleteLike);

export default likes;