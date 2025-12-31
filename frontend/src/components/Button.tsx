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
      className={` text-black ${className}`}
      {...rest}  
    >
      {children}
    </button>
  );
}

