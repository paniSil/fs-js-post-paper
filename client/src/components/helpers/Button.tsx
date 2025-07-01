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
  if (to) {
    return (
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    );
  }

  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
