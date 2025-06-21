import React from "react";
import { NavLink } from "react-router";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  title: string;
  className: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, to, ...props }: Partial<ButtonProps>) => {
  return (
    <NavLink to={to || "/"} {...props}>
      {children}
    </NavLink>
  );
};

export default Button;
