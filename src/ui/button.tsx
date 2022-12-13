import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className="w-full px-4 py-2 text-sm font-medium text-white transition-all duration-200 border border-transparent rounded-md shadow-sm outline-none bg-neutral-900 hover:bg-neutral-800 border-neutral-700 focus:ring-0"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;