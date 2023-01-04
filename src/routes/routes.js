import { Router } from "express";
import likes from "./likes.js";
import timeline from "./timeline.js";
import users from "./users.js";

const router = Router();

router.use(users);

router.use(timeline);

router.use(likes);

export default router;