import { useState } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { createServerClient } from "@/utils/supabase.server";
import { supabaseEnv } from "@/utils/supabase.env";
import { Database } from "@/types/db";

import IconButton from "@/ui/iconButton";

import {
  BiDockLeft,
  BiFolder,
  BiLibrary,
  BiPlus,
  BiSearch,
} from "react-icons/bi";

import RealtimeDocs from "@/components/app/docs";
import SidebarSection from "@/components/app/sidebarSection";
import UserCard from "@/components/app/userCard";
import CreateDoc from "@/components/app/functions/createDoc";

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

  const { data } = await supabase.from("docs").select();

  return json(
    { docs: data ?? [], env, session },
    {
      headers: response.headers,
    }
  );
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { env, docs, session } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );
  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-40 h-full pb-10 overflow-x-hidden overflow-y-auto border-r w-60 bg-neutral-800/30 border-neutral-800 ${
          sidebarOpen ? "w-60" : "w-0"
        }`}
      >
        <div className="h-full px-4 py-1">
          <UserCard
            supabase={supabase}
            pic={session.user.user_metadata.avatar_url}
            name={session.user.user_metadata.user_name}
          >
            <CreateDoc
              supabase={supabase}
              session={session}
              btnClass="mb-2 w-full shadow-none bg-neutral-700/20"
              btnIcon={<BiPlus size={19} />}
            />
          </UserCard>
          <SidebarSection title="Documents" icon={<BiFolder size={19} />}>
            <RealtimeDocs documents={docs} />
          </SidebarSection>
          <SidebarSection title="Saved" icon={<BiLibrary size={19} />}>
            <p>my docs</p>
          </SidebarSection>
        </div>
        <div className="absolute bottom-0 left-0 w-full px-5 py-4 font-medium text-gray-500">
          <h1>🚧 docskit v0.1.0 alpha</h1>
        </div>
      </nav>
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        <div className="sticky top-0 z-30 flex items-center justify-between w-full px-4 py-4 bg-midnight">
          <IconButton
            icon={<BiDockLeft size={20} />}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-400"
          />
          <IconButton
            icon={<BiSearch size={20} />}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-400"
          />
        </div>
        <Outlet />
      </div>
    </>
  );
}
