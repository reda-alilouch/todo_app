import { Router } from "express";
import {
  getAllTodo,
  createTodo,
  getOneTodo,
  deleteOneTodo,
  updateOneTodo,
} from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get("/", authMiddleware, getAllTodo);
router.post("/", authMiddleware, createTodo);
router.get("/:id", authMiddleware, getOneTodo);
router.delete("/:id", authMiddleware, deleteOneTodo);
router.put("/:id", authMiddleware, updateOneTodo);

export default router;
