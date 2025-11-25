import Todo from "../models/Todo";
import { Request, Response } from 'express';

export cosnt getAllTodo = async ("/", (req: Request, res: Response) => {
  return res.json({ message: "le get il marche bien" });
});
