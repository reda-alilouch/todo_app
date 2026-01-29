"use client";
import { Todo } from "@/types/todo";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalProviderProp = {
  children: ReactNode;
};

type ModalType = "create" | "update" | null;

export type ModalContextType = {
  modalType: ModalType;
  selectedTodo: Todo | null;
  openCreate: () => void;
  openUpdate: (todo: Todo) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: ModalProviderProp) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const openCreate = () => {
    setModalType("create");
    setSelectedTodo(null);
  };
  const openUpdate = (todo: Todo) => {
    setModalType("update");
    setSelectedTodo(todo);
  };
  const closeModal = () => {
    setModalType(null);
    setSelectedTodo(null);
  };

  return (
    <ModalContext.Provider
      value={{ modalType, selectedTodo, openCreate, openUpdate, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};
