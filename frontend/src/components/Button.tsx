import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`p-2 text-black rounded-sm w-min focus:border ${className}`}
      {...rest}  // <-- ici tu passes toutes les autres propriétés
    >
      {children}
    </button>
  );
}

