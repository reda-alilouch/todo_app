import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("❌ Variable MONGODB_URI manquante.");
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB connecté à : ${conn.connection.host}`);
  } catch (error) {
    console.error("🚨 Erreur MongoDB :", error);
    process.exit(1);
  }
};

export default connectDB;
