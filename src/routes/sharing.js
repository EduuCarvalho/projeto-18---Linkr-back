import { Router } from "express";
import { postSharing } from "../controllers/sharingControllers";
import authValidation from "../middlewares/authValidation.js";

const sharing = Router();

sharing.post("/share", authValidation, postSharing);

export default sharing;