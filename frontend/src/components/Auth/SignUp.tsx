import { use, useState } from "react";
import Button from "../Button";
import { signup } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, steError] = useState("");
  const [formSignUp, setFromSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromSignUp({
      ...formSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    steError("");
    try {
      const validateResult = await signup({
        username: formSignUp.username,
        email: formSignUp.email,
        password: formSignUp.password,
      });
      if (validateResult.success) {
        setFromSignUp({
          username: "",
          email: "",
          password: "",
        });
        router.push("/Home");
      } else {
        steError(validateResult.message);
      }
    } catch (error) {
      steError("erreur serveur, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <input
            className="p-2 text-black border rounded-sm"
            type="text"
            placeholder="Username"
            name="username"
            value={formSignUp.username}
            onChange={handleChange}
          />
          <input
            className="p-2 text-black border rounded-sm"
            type="text"
            placeholder="E-mail"
            name="email"
            value={formSignUp.email}
            onChange={handleChange}
          />
          <input
            className="p-2 text-black border rounded-sm"
            type="password"
            placeholder="Password"
            name="password"
            value={formSignUp.password}
            onChange={handleChange}
          />
        </div>
        <Button
          className="w-full px-2 text-black border rounded-sm"
          type="submit"
        >
          Inscription
        </Button>
      </div>
    </form>
  );
}
