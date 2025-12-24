import { Router } from "express";
import { userValidate, signup, signin } from "../controllers/user.controller";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user", userValidate);

export default router;
