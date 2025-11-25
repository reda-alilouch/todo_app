import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI n'est pas défini dans les variables d'environnement"
      );
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
