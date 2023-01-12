import { Router } from "express";
import { postSharing } from "../controllers/sharingControllers.js";
import authValidation from "../middlewares/authValidation.js";

const sharing = Router();

sharing.post("/share/:id", authValidation, postSharing);

export default sharing;