"use client";
import { getTodo } from "@/hooks/useTodo";
import { Todo } from "@/types/todo";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function TodoPage() {
  const params = useParams();
  const id = (params as any)?.id ?? (params as any)?.ID;

  const { todoById, loading, error } = getTodo(id);
  const [todoState, setTodo] = useState<Todo | undefined>(undefined);

  useEffect(() => {
    if (todoById) {
      setTodo(todoById);
    }
  }, [todoById]);

  if (!id) return <div>Invalid todo ID</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todoState) return <div>No Todo found</div>;

  return (
    <div>
      <div key={todoState._id}>
        <h2>{todoState.name}</h2>
        <p>{todoState.description}</p>
      </div>
    </div>
  );
}
