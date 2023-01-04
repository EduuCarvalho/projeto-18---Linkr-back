import { Router } from "express";
import likes from "./likes.js";
import timeline from "./timeline.js";
import trending from "./trending.js";
import users from "./users.js";

const router = Router();

router.use(users);

router.use(timeline);

router.use(likes);

router.use(trending);

export default router;