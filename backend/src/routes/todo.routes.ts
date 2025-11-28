import { Router } from "express";
import { getAllTodo, createTodo } from "../controllers/todo.controller";
const router = Router();

router.get("/", getAllTodo);
router.post("/", createTodo);

export default router;
