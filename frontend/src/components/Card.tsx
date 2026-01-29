"use client";
import { Trash, Check, Pencil, X } from "lucide-react";
import Button from "./Button";
import { completedTodo } from "@/hooks/useTodo";
import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import { useModal } from "@/provider/ModalContext";
import Link from "next/link";

type Props = {
  todo: Todo;
  onDelete: () => void;
};

export function Card({ todo, onDelete }: Props) {
  const [todoCompleted, setTodoCompleted] = useState<boolean>(todo.completed);
  const [proprietyStyle, setProprietyStyle] = useState<string>(todo.priority);
  const { openUpdate } = useModal();

  const toggleCompleted = () => {
    const newValue = !todoCompleted;
    setTodoCompleted(newValue);
    completedTodo(todo._id, { completed: newValue });
  };
  useEffect(() => {
    setTodoCompleted(todo.completed);
  }, [todo.completed]);

  let color;
  switch (proprietyStyle) {
    case "low":
      color = "indigo-500";
      break;
    case "high":
      color = "purple-500";
      break;
    default:
      color = "sky-500";
  }

  return (
    <>
      <li
        className={`flex justify-center w-full gap-3 p-4 rounded-4xl border-2 border-${color}`}
      >
        <div className="flex flex-col gap-2">
          <Link href={`/Home/${todo._id}`}>
            <h2 className="text-3xl font-bold">{todo.name}</h2>
          </Link>
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
          <Button
            className="p-1 cursor-pointer rounded-xl hover:scale-125"
            onClick={() => openUpdate(todo)}
          >
            <Pencil className="w-5 h-5" />
          </Button>
          <Button
            className="p-1 text-red-600 cursor-pointer rounded-xl hover:scale-125"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash className="w-5 h-5 " />
          </Button>
        </div>
      </li>
    </>
  );
}
