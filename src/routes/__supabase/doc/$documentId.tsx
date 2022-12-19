import { useState } from "react";
import { json, MetaFunction, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { createServerClient } from "@/utils/supabase.server";
import { useLoaderData } from "@remix-run/react";
import { supabaseEnv } from "@/utils/supabase.env";

import Viewer from "@/components/viewer";
import Header from "@/layout/header";
import Up from "@/components/animations/up";

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
    .eq("slug", `${params.documentId}`)
    .single();

  if (!data) {
    return redirect("/404", {
      headers: response.headers,
    });
  }

  if (data.public === false) {
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
  const { doc } = useLoaderData<typeof loader>();
  const [value] = useState(doc?.doc ?? "");
  return (
    <>
      <Header title={doc.title} />
      <div className="max-w-2xl px-6 mx-auto mt-7 md:max-w-4xl md:px-0 md:mt-8">
        <div className="pb-4 border-b border-neutral-800">
          <Up>
            <h1 className="mb-2 text-4xl font-bold text-gray-300">
              {doc?.title}
            </h1>
          </Up>
          <p className="text-gray-400 text-md">
            {doc?.description ?? "No description provided."}
          </p>
          <div className="flex justify-end w-full mt-2">
            <p className="text-gray-400">by {doc?.author}</p>
          </div>
        </div>
        <div className="w-full mt-6 mb-6">
          <Viewer>{value}</Viewer>
        </div>
      </div>
    </>
  );
};

export default DocumentSlug;
