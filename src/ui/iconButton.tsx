import { ButtonProps } from "./button";

const IconButton = (props: ButtonProps) => {
  return (
    <button
      className={`text-sm font-medium text-white transition-all duration-200 border border-transparent rounded-md shadow-sm outline-none focus:ring-0 hover:text-gray-300 ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
};

export default IconButton;
