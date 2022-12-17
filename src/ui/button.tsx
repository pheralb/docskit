import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={`px-4 py-2 text-sm font-medium text-white transition-all duration-200 border border-transparent rounded-md shadow-sm outline-none bg-neutral-900 hover:bg-neutral-800 border-neutral-800 focus:ring-0 ${
        props.className ? props.className : ""
      }`}
      onClick={props.onClick}
    >
      <div className="flex items-center justify-center">
        {props.icon && <div className="mr-2">{props.icon}</div>}
        {props.children}
      </div>
    </button>
  );
};

export default Button;
