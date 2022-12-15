import { useState } from "react";

import EditorComponent from "@/components/editor";
import Viewer from "@/components/viewer";
import { IoBookOutline } from "react-icons/io5";

type Props = {};

const Write = (props: Props) => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div className="border-t border-neutral-800">
      <div className="fixed z-50 w-16 h-full overflow-x-hidden overflow-y-auto border-r border-neutral-800 bg-midnight">
        <div className="flex flex-col items-center justify-center py-5 bg-neutral-900">
          <IoBookOutline size={22} />
        </div>
        <div className="flex flex-col items-center justify-center py-5 bg-neutral-900">
          <IoBookOutline size={22} />
        </div>
      </div>
      <div className="grid grid-cols-2 ml-16">
        <EditorComponent value={value} onChange={(value) => setValue(value)} />
        <div className="overflow-y-auto border-l h-80vh border-neutral-800">
          <Viewer>{value}</Viewer>
        </div>
      </div>
    </div>
  );
};

export default Write;
