import User, { IUser } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserBody } from "../types";

export const signup = async (
  req: Request<{}, {}, UserBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "Email et mot de passe requis" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
    });
    res.status(201).json({ messge: "utilisateur crée", user });
  } catch (error) {
    res.status(500).json({ message: "erreur de serveur" });
  }
};

export const singin = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "email not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "mot de passe incorrect" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
    res.status(200).json({ message: "connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur", error });
  }
};
