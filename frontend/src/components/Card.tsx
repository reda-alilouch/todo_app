import { Trash, Check, Pencil } from "lucide-react";
import Button from "./Button";

export function Card() {
  return (
    <div className="flex justify-center w-full gap-3 p-4 border">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">Créer l'application Todo</h2>
        <p className="text-lg">Développer un backend Express avec TypeScript</p>
        <p>54 h</p>
      </div>
      <div className="flex flex-col gap-5">
        <Button className="p-1 rounded-xl hover:scale-125">
          <Check className="w-5 h-5" />
        </Button>
        <Button className="p-1 rounded-xl hover:scale-125">
          <Pencil className="w-5 h-5" />
        </Button>
        <Button className="p-1 text-red-600 rounded-xl hover:scale-125">
          <Trash className="w-5 h-5 " />
        </Button>
      </div>
    </div>
    
  );
}
