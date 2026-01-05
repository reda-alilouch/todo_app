"use client";
import { Trash, Check, Pencil } from "lucide-react";
import Button from "./Button";
import { useGetTodoAll } from "@/hooks/useTodo";

export function Card() {
  const { todoList, loading } = useGetTodoAll();
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {todoList.map((todo: any) => (
        <li key={todo.id}>
          <div className="flex justify-center w-full gap-3 p-4 border">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold">{todo.name}</h2>
              <p className="text-lg">{todo.description}</p>
              <p>{todo.timeRelease}</p>
            </div>
            <div className="flex flex-col gap-5">
              <Button className="p-1 cursor-pointer rounded-xl hover:scale-125">
                <Check className="w-5 h-5" />
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
      ))}
    </ul>
  );
}
