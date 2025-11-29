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

export const getOneTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const oneTodo = await Todo.findById(id);
    if (!oneTodo) {
      res.status(404).json({ message: "todo not found" });
    }
    res.status(200).json(oneTodo);
  } catch (error) {
    res.status(400).json({ message: "invalid id: ", error });
  }
};
export const deleteOneTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.deleteOne({ _id: id });
    if (!deleteTodo) {
      res.status(404).json({ message: "todo not found" });
    }
    res.status(200).json(deleteTodo);
  } catch (error) {
    res.status(400).json({ message: "invalid id: ", error });
  }
};
export const updateOneTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
     const data = req.body;
    const updateTodo = await Todo.updateOne({ _id: id }, { $set: data });
    if (!updateTodo) {
      res.status(404).json({ message: "todo not found" });
    }
    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(404).json({ message: "invalid id: ", error });
  }
};
