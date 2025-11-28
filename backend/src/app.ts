import express, { Application, Request, Response } from "express";
import cors from "cors";
import todoRoute from "./routes/todo.routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/todo", todoRoute);

app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ message: "reda" });
});

export default app;
