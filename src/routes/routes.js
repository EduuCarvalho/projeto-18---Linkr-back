import { Router } from "express";
import timeline from "./timeline.js";

const router = Router();

router.use(timeline);

export default router;