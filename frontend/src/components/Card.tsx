"use client";
import { Trash, Check, Pencil, X } from "lucide-react";
import Button from "./Button";
import { completedTodo } from "@/hooks/useTodo";
import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
};

export function Card({ todo }: Props) {
  const [todoCompleted, setTodoCompleted] = useState<boolean>(todo.completed);

  const toggleCompleted = async () => {
    const newValue = !todoCompleted;
    setTodoCompleted(newValue);
    completedTodo(todo._id, { completed: newValue });
  };
  useEffect(() => {
    setTodoCompleted(todo.completed);
  }, [todo.completed]);
  return (
    <li>
      <div className="flex justify-center w-full gap-3 p-4 border rounded-4xl">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">{todo.name}</h2>
          <p className="text-lg">{todo.description}</p>
          <p>{todo.timeRelease}</p>
        </div>
        <div className="flex flex-col gap-5">
          <Button onClick={toggleCompleted}>
            {todoCompleted ? (
              <X
                className="w-5 h-5 cursor-pointer hover:scale-125"
                onClick={() => setTodoCompleted(false)}
              />
            ) : (
              <Check
                className="w-5 h-5 cursor-pointer hover:scale-125"
                onClick={() => setTodoCompleted(true)}
              />
            )}
          </Button>
          <Button className="p-1 cursor-pointer rounded-xl hover:scale-125">
            <Pencil className="w-5 h-5" />
          </Button>
          <Button className="p-1 text-red-600 cursor-pointer rounded-xl hover:scale-125">
            <Trash className="w-5 h-5 " />
          </Button>
        </div>
      </div>
    </li>
  );
}
