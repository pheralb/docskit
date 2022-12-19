import { useState } from "react";
import { json, MetaFunction, redirect } from "@remix-run/node";
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
import ShareDoc from "@/components/app/functions/shareDoc";
import { BsGear } from "react-icons/bs";

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

  if (!data) {
    return redirect("/404", {
      headers: response.headers,
    });
  }

  if (data.author !== session?.user.user_metadata.user_name) {
    return redirect("/app", {
      headers: response.headers,
    });
  }

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
      <div className="flex flex-col items-center justify-between w-full md:flex-row">
        <h1 className="mb-2 text-2xl font-bold text-gray-300 md:text-4xl">
          {doc?.title}
        </h1>
        <p className="text-gray-400 text-md">
          {doc?.description ??
            "😊 Press 'Edit info' button to add description."}
        </p>
        <div className="flex items-center mt-2 space-x-2">
          <EditDocInfo
            supabase={supabase}
            session={session}
            title={title}
            description={description}
            slug={doc?.slug}
            btnIcon={<BsGear size={18} />}
            btnClass="border border-neutral-800"
          />
          <ShareDoc
            supabase={supabase}
            session={session}
            slug={doc?.slug}
            public={doc?.public}
          />
          <Button
            className="border border-neutral-800"
            icon={<BiSave size={18} />}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-5 md:grid-cols-2">
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
