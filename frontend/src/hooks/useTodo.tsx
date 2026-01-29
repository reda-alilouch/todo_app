"use client";
import { getAllTodo } from "@/lib/todo";
import { UpdateTodoCompleted } from "@/types";
import { Todo } from "@/types/todo";
import axios from "axios";
import error from "next/error";
import { useEffect, useState } from "react";

export const getTodoAll = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllTodo()
      .then((data) => setTodoList(data))
      .finally(() => setLoading(false));
  }, []);
  return { todoList, loading };
};

const todoCache = new Map<string, Todo>();

export const getTodo = (todo_id: string) => {
  const [todoById, setTodoById] = useState<Todo | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodo = async (todo_id: string) => {
    if (!todo_id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Todo>(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo/${todo_id}`,
        { withCredentials: true }
      );
      const data = response.data;
      todoCache.set(todo_id, data);
      setTodoById(data);
    } catch (err: any) {
      if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") return;
      setError(
        err?.response?.data?.message || err?.message || "Erreur serveur"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodo(todo_id);
  }, [todo_id]);

  return { todoById, loading, error };
};

export const createTodo = async (data: Todo) => {
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
export const updateTodo = async (todo_id: string, data: Todo) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo/${todo_id}`,
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

export const deleteTodo = async (todo_id: string) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo/${todo_id}`,
      {
        withCredentials: true,
      }
    );
    return { success: true, message: res.data.message };
  } catch (error: any) {
    if (error.message) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: "erreur de serveur" };
    }
  }
};

export const completedTodo = async (
  todo_id: string,
  data: UpdateTodoCompleted
) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo/${todo_id}`,
      data,
      {
        withCredentials: true,
      }
    );
    return { success: true, message: res.data.message };
  } catch (error: any) {
    if (error.message) {
      return { success: false, message: error.response.data.message };
    } else {
      return { success: false, message: "erreur de serveur" };
    }
  }
};
