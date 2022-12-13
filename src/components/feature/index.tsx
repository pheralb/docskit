import React from "react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
}

const Feature = (props: FeatureProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 p-4 space-y-2 border rounded-lg bg-neutral-900 border-neutral-700">
      {props.icon}
      <p className="text-white">{props.title}</p>
    </div>
  );
};

export default Feature;
