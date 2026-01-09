import { RequestHandler } from "express";
import Todo from "../models/Todo";
import { SlugService } from "../services/slug.service";

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
    const { name } = req.body;
    const userId = req.user.id;
    const slug = await SlugService.generateUnique(name, async (s) =>
      Boolean(await Todo.exists({ slug: s }))
    );
    const newTodo = await Todo.create({
      ...req.body,
      slug,
      userId,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getOneTodo: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const oneTodo = await Todo.findById({
      _id: req.params.id,
      userId,
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
    const userId = req.user.id;
    const deleteTodo = await Todo.findByIdAndDelete({
      _id: req.params.id,
      userId,
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
    const userId = req.user.id;
    const updateTodo = await Todo.findByIdAndUpdate(
      {
        _id: req.params.id,
        userId,
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

export const completedTodo: RequestHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const update = req.body;
    const updateTodoCompleted = await Todo.findByIdAndUpdate(
      {
        _id: req.params.id,
        userId,
      },
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!updateTodoCompleted) {
      res.status(404).json({ message: "todo not found" });
    }
    res.status(200).json(updateTodoCompleted);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
