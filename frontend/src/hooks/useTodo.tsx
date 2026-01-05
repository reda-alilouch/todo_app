"use client";
import { getAllTodo } from "@/lib/todo";
import { todo } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
export const useGetTodoAll = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllTodo()
      .then((data) => setTodoList(data))
      .finally(() => setLoading(false));
  }, []);
  return { todoList, loading };
};
export const createTodo = async (data: todo) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo`,
      data,
      {
        withCredentials: true,
      }
    );

    return { success: true, todo: res.data.todo, message: res.data.message };
  } catch (error: any) {
    if (error.message) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: "erreur de serveur" };
    }
  }
};
