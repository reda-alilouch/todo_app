import { Router } from "express";
import {
  getAllTodo,
  createTodo,
  getOneTodo,
  deleteOneTodo,
  updateOneTodo,
} from "../controllers/todo.controller";
const router = Router();

router.get("/", getAllTodo);
router.post("/", createTodo);
router.get("/:id", getOneTodo);
router.delete("/:id", deleteOneTodo);
router.put("/:id", updateOneTodo)

export default router;
