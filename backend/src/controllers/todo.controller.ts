import { RequestHandler } from "express";
import Todo from "../models/Todo";

export const getAllTodo: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;

    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  try {
    const newTodo = await Todo.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export const getOneTodo: RequestHandler = async (req, res) => {
  try {
    const oneTodo = await Todo.findById({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!oneTodo) {
      res.status(404).json({ message: "todo not found" });
      return;
    }

    res.status(200).json(oneTodo);
  } catch (error) {
    res.status(400).json({ message: "invalid id", error });
  }
};

export const deleteOneTodo: RequestHandler = async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleteTodo) {
      res.status(404).json({ message: "todo not found" });
      return;
    }

    res.status(200).json(deleteTodo);
  } catch (error) {
    res.status(400).json({ message: "invalid id", error });
  }
};

export const updateOneTodo: RequestHandler = async (req, res) => {
  try {
    const updateTodo = await Todo.findByIdAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id, // Vérifier que le todo appartient à l'utilisateur
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateTodo) {
      res.status(404).json({ message: "todo not found" });
      return;
    }

    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(400).json({ message: "invalid id", error });
  }
};
