import { useEffect, useState } from "react";

import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";

import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { supabaseEnv } from "@/utils/supabase.env";
import { createServerClient } from "@/utils/supabase.server";
import type { Database } from "@/types/db";

import Header from "@/layout/header";
import Show from "@/components/animations/show";

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return json(
    {
      supabaseEnv,
      session,
    },
    {
      headers: response.headers,
    }
  );
};

export default function Supabase() {
  const { supabaseEnv, session } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [supabase] = useState(() =>
    createBrowserClient<Database>(
      supabaseEnv.SUPABASE_URL,
      supabaseEnv.SUPABASE_ANON_KEY
    )
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        fetcher.submit(null, {
          method: "post",
          action: "/handle-supabase-auth",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, fetcher]);

  return (
    <>
      <Header supabase={supabase} session={session} />
      <Show>
        <Outlet context={{ supabase, session }} />
      </Show>
    </>
  );
}
