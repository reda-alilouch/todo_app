"use client";
import { useEffect, useState } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import { useModal } from "@/provider/ModalContext";
import { createTodo } from "@/hooks/useTodo";
import { Todo } from "@/types/todo";
export default function CreateModal() {
  const [formTodo, setFormTodo] = useState<Todo>({
    name: "",
    description: "",
    completed: false,
    priority: "",
    timeRelease: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { closeModal } = useModal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormTodo((prev) => ({
      ...prev,
      [name]:
        name === "timeRelease" ? (value === "" ? "" : Number(value)) : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const validateResult = await createTodo({
        name: formTodo.name,
        description: formTodo.description,
        timeRelease: formTodo.timeRelease,
        completed: formTodo.completed,
        priority: formTodo.priority,
      });
      if (validateResult.success) {
        setFormTodo({
          name: "",
          description: "",
          completed: false,
          priority: "",
          timeRelease: "",
        });
        closeModal();
      } else {
        setError(validateResult.message);
      }
    } catch (error) {
      setError("erreur serveur, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="p-5 bg-white border rounded-3xl">
        <Button className="cursor-pointer" onClick={closeModal}>
          <X className="w-5 h-5" />
        </Button>
        <form method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <input
                className="p-2 text-black border rounded-sm"
                type="text"
                placeholder="entrez le nom"
                name="name"
                value={formTodo.name}
                onChange={handleChange}
              />
              <input
                className="p-2 text-black border rounded-sm"
                type="text"
                placeholder="entrez la description"
                name="description"
                value={formTodo.description}
                onChange={handleChange}
              />
              <input
                className="p-2 text-black border rounded-sm"
                type="number"
                placeholder="entrez le temps"
                name="timeRelease"
                value={formTodo.timeRelease}
                onChange={handleChange}
              />
              <select
                name="priority"
                value={formTodo.priority}
                onChange={(e) =>
                  setFormTodo({ ...formTodo, priority: e.target.value })
                }
                className="p-2 text-black border rounded-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <Button
              className="w-full px-2 text-black border rounded-sm"
              type="submit"
            >
              Créer un todo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
