import { Router } from "express";
import timeline from "./timeline.js";
import users from "./users.js";

const router = Router();

router.use(users);

router.use(timeline);

export default router;