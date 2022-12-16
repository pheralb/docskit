import { useState } from "react";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Database } from "@/types/db";
import { supabaseEnv } from "@/utils/supabase.env";
import { createServerClient } from "@/utils/supabase.server";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

export const loader = async ({ request }: LoaderArgs) => {
  const env = supabaseEnv;

  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If the user is already signed in, redirect them to the app =>
  if (session) {
    return redirect("/app", {
      headers: response.headers,
    });
  }

  return json({
    env,
  });
};

const Auth = () => {
  const { env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  return (
    <div>
      <button
        onClick={() =>
          supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
              redirectTo: "/app",
            },
          })
        }
      >
        Sign In
      </button>
    </div>
  );
};

export default Auth;
