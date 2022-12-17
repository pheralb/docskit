import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@/utils/supabase.server";

import type { LoaderArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase.from("docs").select("*");

  return json(
    { data, session },
    {
      headers: response.headers,
    }
  );
};

export default function App() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="px-5 py-5">
      <h1 className="text-3xl font-medium">Welcome</h1>
      {data?.map((doc) => (
        <div key={doc.id}>{doc.doc}</div>
      ))}
    </div>
  );
}
