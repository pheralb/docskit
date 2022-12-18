import { useState } from "react";
import { json, LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";

import { Database } from "@/types/db";
import { supabaseEnv } from "@/utils/supabase.env";
import { createServerClient } from "@/utils/supabase.server";
import { createBrowserClient } from "@supabase/auth-helpers-remix";
import Button from "@/ui/button";
import Logo from "@/components/icons/logo";
import { BsGithub } from "react-icons/bs";
import Up from "@/components/animations/up";
import Down from "@/components/animations/down";
import Show from "@/components/animations/show";
import { Ring } from "@uiball/loaders";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "/app",
        },
      });
      navigate("/app");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-3">
      <Up>
        <Logo className="h-16" />
      </Up>
      {loading ? (
        <Ring size={30} color="white" />
      ) : (
        <>
          <Show delay={0.2}>
            <h1 className="text-3xl font-bold">Welcome</h1>
          </Show>
          <Show delay={0.4}>
            <Button
              icon={<BsGithub size={18} />}
              onClick={handleLogin}
              className="border border-neutral-800 hover:bg-neutral-800 hover:text-neutral-50"
            >
              Sign In with Github
            </Button>
          </Show>
          <p className="font-medium text-gray-500">🚧 alpha</p>
        </>
      )}
    </div>
  );
};

export default Auth;
