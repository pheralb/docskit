import React from "react";

interface SidebarSectionProps {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}

const SidebarSection = (props: SidebarSectionProps) => {
  return (
    <>
      <div className="flex items-center pt-4 pb-2 space-x-2 border-b border-neutral-800">
        {props.icon}
        <p>{props.title}</p>
      </div>
      <div className="mt-3 mb-4">{props.children}</div>
    </>
  );
};

export default SidebarSection;
