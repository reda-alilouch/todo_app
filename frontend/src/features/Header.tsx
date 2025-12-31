import { Plus } from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
export default function Header() {
  return (
    <div className="flex p-2.5 justify-end gap-3">
      <Button className=" rounded-xl">
        <Plus className="w-5 h-5" />
      </Button>
      <div className="border rounded-full">
        <Image src="" alt="" width={50} height={50} />
      </div>
    </div>
  );
}
