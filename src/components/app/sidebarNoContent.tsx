interface SidebarNoContentProps {
  text: string;
}

const SidebarNoContent = (props: SidebarNoContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 border rounded-md text-neutral-400 bg-neutral-800/30 border-neutral-800">
      {props.text}
    </div>
  );
};

export default SidebarNoContent;
