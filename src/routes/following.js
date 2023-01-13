import { Router } from "express";
import { postFollow } from "../controllers/followingControllers.js";
import authValidation from "../middlewares/authValidation.js";

const following = Router();

following.post("/follow/:id", authValidation, postFollow);

export default following;