import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  onChange?: () => void;
}

const Input = (props: InputProps) => {
  return (
    <input
      className={`w-64 px-2 py-1 font-medium transition-all duration-200 rounded-md shadow-sm outline-none bg-neutral-900 hover:bg-neutral-900 border-neutral-700 focus:ring-0 ${props.className}`}
      value={props.value}
      onChange={props.onChange}
      {...props}
    />
  );
};

export default Input;
