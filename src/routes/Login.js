import { Router } from "express";
import { postSignIn } from "../controllers/logInControllers.js";
import { signInValidations } from "../middlewares/logInValidations.js";

const logInRouter = Router();

logInRouter.post("/signin",signInValidations,postSignIn)

export default logInRouter;