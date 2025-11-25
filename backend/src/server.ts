import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";


// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app: Application = express();

// Connecter à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Bienvenue sur l'API Todo App" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
