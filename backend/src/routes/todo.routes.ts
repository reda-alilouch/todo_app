import { Router } from "express";
import {
  getAllTodo,
  createTodo,
  getOneTodo,
  deleteOneTodo,
  updateOneTodo,
} from "../controllers/todo.controller";
import { auth } from "../middleware/auth";
const router = Router();

router.get("/", auth, getAllTodo);
router.post("/", auth, createTodo);
router.get("/:id", auth, getOneTodo);
router.delete("/:id", auth, deleteOneTodo);
router.put("/:id", auth, updateOneTodo);

export default router;
