"use client";
import { fetchProfile } from "@/lib/user";
import { SigninData, SignupData, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

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

export const getProfile = () => {
  const [userProfile, setUserProfile] = useState<User>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then((data) => setUserProfile(data))
      .finally(() => setLoading(false));
  }, []);
  return { userProfile, loading };
};
