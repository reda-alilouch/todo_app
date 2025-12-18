import { useState } from "react";
import Button from "../Button";

interface SignupData {
  username: String;
  email: String;
  password: String;
}
export default function SignUp() {
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
  const signup = async (data: SignupData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/signup`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: "erreur de serveur" };
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      } else {
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-3">
      <form method="post" onSubmit={handleSubmit}>
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
        <Button className="px-2 text-black border rounded-sm" type="submit">
          Inscription
        </Button>
      </form>
    </div>
  );
}
