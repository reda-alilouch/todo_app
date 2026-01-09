"use client";
import { Card } from "@/components/Card";
import Modal from "@/components/Modal";
import { getTodoAll } from "@/hooks/useTodo";
import { useModal } from "@/provider/ModalContext";
import { Todo } from "@/types/todo";

export default function PageHome() {
  const { openModal } = useModal();
  const { todoList, loading } = getTodoAll();

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2 lg:grid-cols-3">
        {todoList.map((todo: Todo) => (
          <Card key={todo._id} todo={todo} />
        ))}
      </ul>
      {openModal && <Modal />}
    </>
  );
}
