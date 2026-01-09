"use client";
import { getAllTodo, getOneTodo } from "@/lib/todo";
import { UpdateTodoCompleted } from "@/types";
import { Todo } from "@/types/todo";
import axios from "axios";
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

export const getTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getOneTodo()
      .then((data) => setTodoList(data))
      .finally(() => setLoading(false));
  }, []);
  return { todoList, loading };
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
export const updateTodo = async (data: Todo) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo/id`,
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

export const deleteTodo = async () => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo/id`,
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
