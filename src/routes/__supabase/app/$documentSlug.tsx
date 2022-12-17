import { useState } from "react";
import { json, MetaFunction } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { createServerClient } from "@/utils/supabase.server";
import { useLoaderData } from "@remix-run/react";
import { supabaseEnv } from "@/utils/supabase.env";
import { Database } from "@/types/db";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

import Viewer from "@/components/viewer";
import EditorComponent from "@/components/editor";

import Button from "@/ui/button";

import { BiArrowFromBottom, BiEdit, BiSave } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { toastStyle } from "@/styles/toast";
import EditDocInfo from "@/components/app/functions/editDocInfo";

export const loader = async ({ request, params }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const env = supabaseEnv;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("docs")
    .select("*")
    .eq("slug", `${params.documentSlug}`)
    .single();

  return json(
    { env, doc: data, param: params.slug, session },
    {
      headers: response.headers,
    }
  );
};

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data) {
    return {
      title: "Error",
    };
  }
  return {
    title: `${data.doc?.title} - Docskit`,
    description: data.doc?.description,
  };
};

const DocumentSlug = () => {
  const { session, env, doc } = useLoaderData<typeof loader>();
  const [value, setValue] = useState(doc?.doc ?? "");
  const [title, setTitle] = useState(doc?.title ?? "");
  const [slug, setSlug] = useState(doc?.slug ?? "");
  const [description, setDescription] = useState(doc?.description ?? "");
  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("docs")
        .update({ doc: value })
        .eq("slug", doc?.slug);

      if (error) {
        toast(`Error: ${error.message}`, toastStyle);
      }
      toast(`Saved 🎉`, toastStyle);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-gray-300">
            {doc?.title}
          </h1>
          <p className="text-gray-400 text-md">
            {doc?.description ?? "😊 Press settings button to add description."}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <EditDocInfo
            supabase={supabase}
            session={session}
            title={title}
            description={description}
            slug={doc?.slug}
            btnIcon={<BiEdit size={18} />}
            btnClass="border border-neutral-800"
          />
          <Button
            className="border border-neutral-800"
            icon={<BiArrowFromBottom size={18} />}
          >
            Share
          </Button>
          <Button
            className="border border-neutral-800"
            icon={<BiSave size={18} />}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-5">
        <EditorComponent
          default={value}
          onChange={(value) => setValue(value ?? "")}
        />
        <Viewer>{value}</Viewer>
      </div>
    </div>
  );
};

export default DocumentSlug;
