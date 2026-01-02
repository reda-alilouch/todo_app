"use client";
import { SigninData, SignupData } from "@/types";
import axios from "axios";

export const signin = async (data: SigninData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/signin`,
      data,
      {
        withCredentials: true,
      }
    );
    return { success: true, user: res.data.user, message: res.data.message };
  } catch (error: any) {
    if (error.response) {
      return { success: false, message: error.response.data.message };
    }
    return {
      success: false,
      message: "erreur serveur",
    };
  }
};

export const signup = async (data: SignupData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/signup`,
      data,
      {
        withCredentials: true,
      }
    );
    return {
      success: true,
      message: res.data.message,
      user: res.data.user,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message,
      };
    }
    return {
      succes: false,
      message: "erreur serveur",
    };
  }
};

/*
vérifier si l'utilisateur est connecté

gérer le loading / logout

protéger les pages côté client

rafraîchir le token

afficher le nom du user dans la navbar, etc.
*/
