import { Router } from "express";
import { postFollow, removeFollow } from "../controllers/followingControllers.js";
import authValidation from "../middlewares/authValidation.js";

const following = Router();

following.post("/follow/:id", authValidation, postFollow);

following.delete("/follow/:id", authValidation, removeFollow);

export default following;