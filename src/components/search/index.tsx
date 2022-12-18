import { Doc } from "@/types/doc";
import IconButton from "@/ui/iconButton";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Command, CommandInput, CommandList, CommandOption } from "superkey";

interface Documents {
  docs: Doc[];
}

const SearchCommand = ({ docs }: Documents) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredDocs = docs.filter((doc) => {
    return doc.title?.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <IconButton
        icon={<BiSearch size={20} />}
        onClick={() => setOpen(!open)}
        className="text-neutral-400"
      />
      <Command
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        className="font-sans border bg-midnight border-neutral-800"
        overlayClassName="bg-neutral-900 bg-opacity-50"
        commandFunction={(data) => {
          navigate(`/app/${data}`, { replace: true });
          setOpen(!open);
        }}
      >
        <CommandInput
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          inputClassName="border-none"
          placeholder="Search docs..."
        />
        <CommandList className="border-none">
          {filteredDocs.map((doc) => (
            <CommandOption
              key={doc.id}
              value={doc.slug || ""}
              activeClassName="hover:bg-neutral-800"
            >
              <div className="flex items-center w-full bg-black/0">
                <HiOutlineDocumentText size={16} className="mr-2" />
                <h1 className="font-medium text-neutral-100">{doc.title}</h1>
              </div>
            </CommandOption>
          ))}
        </CommandList>
      </Command>
    </>
  );
};

export default SearchCommand;
