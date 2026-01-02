"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { signin } from "@/hooks/useAuth";

export default function SignIn() {
  const router = useRouter();
  const [formSignIn, setFormSignIn] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormSignIn({
      ...formSignIn,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const validateForm = await signin({
        identifier: formSignIn.identifier,
        password: formSignIn.password,
      });
      if (validateForm.success) {
        setFormSignIn({
          identifier: "",
          password: "",
        });
        router.push("/Home");
      } else {
        setError(validateForm.message);
      }
    } catch (error) {
      setError("erreur serveur, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action="post" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <input
            className="p-2 text-black border rounded-sm"
            name="identifier"
            type="text"
            placeholder="E-mail ou username"
            onChange={handleChange}
          />
          <input
            className="p-2 text-black border rounded-sm"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <Button
          className="w-full px-2 text-black border rounded-sm"
          type="submit"
        >
          Connexion
        </Button>
      </div>
    </form>
  );
}
