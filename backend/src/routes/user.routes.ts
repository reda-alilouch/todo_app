import { Router } from "express";
import { signup, singin } from "../controllers/user.controller";

const router = Router();
router.post("/signup", signup);
router.post("/signin", singin);

export default router 