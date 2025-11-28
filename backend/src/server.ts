import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
