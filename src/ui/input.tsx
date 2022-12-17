import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  onChange?: () => void;
}

const Input = (props: InputProps) => {
  return (
    <input
      className={`w-full px-3 py-2 font-medium transition-all duration-200 rounded-md shadow-sm outline-none bg-neutral-900 hover:bg-neutral-900 border border-neutral-800 focus:ring-0 ${
        props.className ? props.className : ""
      }`}
      value={props.value}
      onChange={props.onChange}
      {...props}
    />
  );
};

export default Input;
