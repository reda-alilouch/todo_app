"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalProviderProp = {
  children: ReactNode;
};

export type ModalContextType = {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: ModalProviderProp) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
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
