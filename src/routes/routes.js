import { Router } from "express";
import timeline from "./timeline.js";
import trending from "./trending.js";
import users from "./users.js";
import logInRouter from "./Login.js";


const router = Router();

router.use(logInRouter);

router.use(users);

router.use(timeline);

router.use(trending);



export default router;