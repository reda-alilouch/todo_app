import User, { IUser } from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserBody } from "../types";

export const signup = async (
  req: Request<{}, {}, UserBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email et mot de passe requis" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hash,
    });
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(201).json({ messge: "utilisateur crée", user, token });
  } catch (error) {
    res.status(500).json({ message: "erreur de serveur" });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({ message: "Identifiant et mot de passe requis" });
      return;
    }

    let user: IUser | null = null;

    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ username: identifier });
    }

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Mot de passe incorrect" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const UserInformation = await User.find({ _id: req.params.id });

    if (!UserInformation) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    res.status(200).json(UserInformation);
  } catch (error) {
    res.status(400).json({ message: "invalid id", error });
  }
};
