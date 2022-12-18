import type { Doc } from "@/types/doc";
import { HiOutlineDocumentText } from "react-icons/hi";
import { NavLink } from "@remix-run/react";
import SidebarNoContent from "./sidebarNoContent";

const Docs = ({ documents }: { documents: Doc[] }) => {
  return documents?.length > 0 ? (
    <div className="flex flex-col space-y-1">
      {documents.map((doc) => (
        <NavLink
          to={`/app/${doc.slug}`}
          key={doc.id}
          className={({ isActive }) =>
            "flex items-center py-2 px-2 space-x-2 rounded-md cursor-pointer hover:bg-neutral-800 duration-100 transition-colors" +
            (isActive ? " bg-neutral-800 text-white" : "")
          }
        >
          <HiOutlineDocumentText size={16} />
          <p className="text-sm truncate">{doc.title}</p>
        </NavLink>
      ))}
    </div>
  ) : (
    <SidebarNoContent text="No docs yet" />
  );
};

export default Docs;
