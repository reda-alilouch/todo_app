"use client";
import { getCurrentUser } from "@/lib/auth";
import { SigninData, SignupData, AuthContextType } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getCurrentUser();
        console.log(data)
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvide");
  }
  return context;
}

/*
vérifier si l'utilisateur est connecté

gérer le loading / logout

protéger les pages côté client

rafraîchir le token

afficher le nom du user dans la navbar, etc.
*/
