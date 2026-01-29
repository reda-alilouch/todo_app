"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
import { useModal } from "@/provider/ModalContext";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { openCreate } = useModal();
  const [dropDown, setDropDown] = useState(false);
  return (
    <header className="px-5">
      <div className="flex p-2.5 justify-end gap-3">
        <Button
          className="p-1 cursor-pointer rounded-xl hover:scale-125"
          onClick={openCreate}
        >
          <Plus className="w-5 h-5" />
        </Button>
        <div
          className="border rounded-full"
          onClick={() => setDropDown(!dropDown)}
        >
          <Image
            src="/default_image.jpg"
            alt="Photo Profile"
            width={50}
            height={50}
            className="border rounded-full cursor-pointer"
          />
        </div>
      </div>
      {dropDown && (
        <div className="absolute flex flex-col bg-white border rounded-md max-w-min right-3">
          <Link href="/Profile" className="px-4 rounded-md cursor-pointer hover:bg-gray-300">
            Profile
          </Link>
          <div>
            <Button className="px-4 text-red-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white">
              logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
