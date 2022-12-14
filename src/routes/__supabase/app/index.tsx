import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@/utils/supabase.server";

import type { LoaderArgs } from "@remix-run/node";
import CreateDoc from "@/components/app/functions/createDoc";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { Database } from "@/types/db";
import { supabaseEnv } from "@/utils/supabase.env";
import Docu from "@/components/app/docu";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const env = supabaseEnv;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("docs")
    .select("*")
    .eq("user_id", session?.user?.id);
    

  return json(
    { env, data, session },
    {
      headers: response.headers,
    }
  );
};

export default function App() {
  const { env, session, data } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  return (
    <div className="px-5 py-4">
      <h1 className="text-3xl font-medium">Welcome</h1>
      {data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-2xl font-medium">
            Let's create your first document 🎉
          </h1>
          <p className="mt-2 mb-3 text-gray-500">
            Create a new doc to get started:
          </p>
          <CreateDoc supabase={supabase} session={session} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 lg:grid-cols-4">
          {data?.map((doc) => (
            <Docu
              key={doc.id}
              title={doc.title}
              description={doc.description}
              slug={doc.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
