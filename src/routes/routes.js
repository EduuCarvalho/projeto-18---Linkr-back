import { Router } from "express";
import likes from "./likes.js";
import timeline from "./timeline.js";
import trending from "./trending.js";
import users from "./users.js";
import logInRouter from "./Login.js";
import hashtags from "./hashtags.js";
import sharing from "./sharing.js";


const router = Router();

router.use(logInRouter);

router.use(users);

router.use(timeline);

router.use(likes);

router.use(trending);

router.use(hashtags);

router.use(sharing);

export default router;