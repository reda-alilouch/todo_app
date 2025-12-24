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
      className={`p-2 text-black rounded-sm focus:border ${className}`}
      {...rest}  
    >
      {children}
    </button>
  );
}

