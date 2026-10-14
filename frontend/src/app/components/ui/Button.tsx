import React from "react";

export interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", onClick, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
