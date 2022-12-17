import { Link } from "@remix-run/react";
import React from "react";

interface DocuProps {
  title?: string;
  description?: string;
  slug?: string;
}

const Docu = (props: DocuProps) => {
  return (
    <div className="p-3 border rounded-md bg-neutral-800/40 border-neutral-700">
      <Link to={`/app/${props.slug}`}>
        <h1 className="mb-1 text-xl font-bold text-gray-300 truncate transition-all duration-150 hover:text-white">
          {props.title}
        </h1>
      </Link>
      <p className="text-gray-400">{props.description}</p>
    </div>
  );
};

export default Docu;
