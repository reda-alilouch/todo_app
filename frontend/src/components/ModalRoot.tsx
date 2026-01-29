"use client";
import { useModal } from "@/provider/ModalContext";
import UpdateModal from "./UpdateModal";
import CreateModal from "./CreateModal";

export default function ModalRoot() {
  const { modalType, selectedTodo, closeModal } = useModal();

  if (!modalType) return null;
  if (modalType === "create") {
    return <CreateModal onClose={closeModal} />;
  }
  if (modalType === "update" && selectedTodo) {
    return <UpdateModal onClose={closeModal} todo={selectedTodo} />;
  }
  return null;
}
