import type { Doc } from "@/types/doc";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link, NavLink } from "@remix-run/react";
import SidebarNoContent from "./sidebarNoContent";

const Docs = ({ documents }: { documents: Doc[] }) => {
  return documents?.length > 0 ? (
    <div className="flex flex-col space-y-2">
      {documents.map((doc) => (
        <NavLink
          to={`/app/${doc.slug}`}
          key={doc.id}
          className={({ isActive }) =>
            "flex items-center p-3 space-x-2 rounded-md bg-neutral-800/40 border border-neutral-800 cursor-pointer hover:bg-neutral-800 " +
            (isActive ? "border-neutral-700" : "")
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
