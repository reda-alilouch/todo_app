import Todo from "../models/Todo";
import { Request, Response } from "express";
import { TodoBody } from "../types/index";

export const getAllTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error: any) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "error" });
  }
};

export const createTodo = async (
  req: Request<{}, {}, TodoBody>,
  res: Response
): Promise<void> => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error: any) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "error" });
  }
};
