"use client"
import { Card } from "@/components/Card";
import Modal from "@/components/Modal";
import { useModal } from "@/provider/ModalContext";

export default function PageHome() {
  const { openModal} = useModal();
  console.log("openModal:", openModal);

  return (
    <>
      <Card />
      {openModal && <Modal />}
    </>
  );
}
