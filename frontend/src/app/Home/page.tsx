"use client";
import { Card } from "@/components/Card";
import ModalRoot from "@/components/ModalRoot";
import { deleteTodo, getTodoAll } from "@/hooks/useTodo";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";


export default function PageHome() {
  const { todoList, loading } = getTodoAll();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (todoList) {
      setTodos(todoList);
    }
  }, [todoList]);

  const handleDelete = async (id: string) => {
    const result = await deleteTodo(id);

    if (result.success) {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 lg:grid-cols-3">
        {todos.map((todo) => (
          <Card
            key={todo._id}
            todo={todo}
            onDelete={() => todo._id && handleDelete(todo._id)}
          />
        ))}
      </ul>
      <ModalRoot />
    </>
  );
}
