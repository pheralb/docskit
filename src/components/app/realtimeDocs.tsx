import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";

import type { SupabaseContext } from "@/types/supabase";
import type { Doc } from "@/types/doc";
import SidebarNoContent from "./sidebarNoContent";

const RealtimeDocs = ({ serverDocs }: { serverDocs: Doc[] }) => {
  const [docs, setDocs] = useState(serverDocs);
  const { supabase } = useOutletContext<SupabaseContext>();

  useEffect(() => {
    setDocs(serverDocs);
  }, [serverDocs]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "docs" },
        (payload) => setDocs([...docs, payload.new as Doc])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, docs, setDocs]);

  return docs.length > 0 ? (
    <div>
      {docs.map((doc) => (
        <div key={doc.id}>{doc.doc}</div>
      ))}
    </div>
  ) : (
    <SidebarNoContent text="No docs yet" />
  );
};

export default RealtimeDocs;
