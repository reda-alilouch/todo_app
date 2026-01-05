"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
import { useModal } from "@/provider/ModalContext";

export default function Header() {
  const { setOpenModal } = useModal();
  
  return (
    <header className="flex p-2.5 justify-end gap-3">
      <Button
        className="cursor-pointer rounded-xl"
        onClick={() => setOpenModal(true)}
      >
        <Plus className="w-5 h-5" />
      </Button>
      <div className="border rounded-full">
        <Image
          src="/default_image.jpg"
          alt="Photo Profile"
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}
