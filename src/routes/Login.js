import { Router } from "express";
import { postSignIn, postSignUp } from "../controllers/logInControllers.js";
import { signInValidations, signUpValidations } from "../middlewares/logInValidations.js";

const logInRouter = Router();

logInRouter.post("/signup",signUpValidations,postSignUp)
logInRouter.post("/signin",signInValidations,postSignIn)

export default logInRouter;