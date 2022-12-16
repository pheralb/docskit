import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { createServerClient } from "@/utils/supabase.server";

import type { LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { Database } from "@/types/db";
import { supabaseEnv } from "@/utils/supabase.env";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const env = supabaseEnv;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect all /app URLs =>
  if (!session) {
    return redirect("/auth", {
      headers: response.headers,
    });
  }
  return json(
    { env, session },
    {
      headers: response.headers,
    }
  );
};

export default function RequiredSession() {
  const { env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  return (
    <>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      <Outlet />
    </>
  );
}
