"use client";
import { useState } from "react";
import Button from "../Button";
import SignIn from "./SingIn";
import SignUp from "./SignUp";

type ModeConnexion = "inscription" | "connexion";
export default function Auth() {
  const [modeConnexion, setModeConnexion] =
    useState<ModeConnexion>("connexion");

  return (
    <div className="flex items-center h-screen m-auto bg-white w-max">
      <div className="px-3 py-5 text-black border rounded-3xl">
        <div className="flex items-center justify-center gap-3 mb-5">
          <Button onClick={() => setModeConnexion("connexion")}>
            Connexion
          </Button>
          <Button onClick={() => setModeConnexion("inscription")}>
            S'inscrire
          </Button>
        </div>
        {modeConnexion == "connexion" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
