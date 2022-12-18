import React from "react";

interface AlertMessage {
  message: string;
}

const Alert = (props: AlertMessage) => {
  return (
    <div className="p-3 text-white rounded-md bg-red-800/40">
      <p>{props.message}</p>
    </div>
  );
};

export default Alert;
