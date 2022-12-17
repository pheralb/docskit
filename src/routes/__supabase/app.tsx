import { useState } from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { createBrowserClient } from "@supabase/auth-helpers-remix";
import { createServerClient } from "@/utils/supabase.server";
import { supabaseEnv } from "@/utils/supabase.env";
import { Database } from "@/types/db";

import { Dropdown, DropdownItem } from "@/ui/dropdown";
import IconButton from "@/ui/iconButton";
import Button from "@/ui/button";

import { BiCloud, BiDockLeft, BiLibrary } from "react-icons/bi";
import { IoCloudOutline, IoSettingsOutline } from "react-icons/io5";

import RealtimeDocs from "@/components/app/realtimeDocs";
import SidebarSection from "@/components/app/sidebarSection";

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const { doc } = Object.fromEntries(await request.formData());
  const { error } = await supabase.from("docs").insert({ doc: String(doc) });

  if (error) {
    console.log(error);
  }

  return json(null, { headers: response.headers });
};

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
  const { docs, session, env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 z-40 h-full pb-10 overflow-x-hidden overflow-y-auto border-r w-60 transition-all bg-neutral-800/30 border-neutral-800 ${sidebarOpen ? "w-60" : "w-0"}`}>
        <div className="h-full px-5 py-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <img
                src={session.user.user_metadata.avatar_url}
                alt={session.user.user_metadata.user_name}
                className="h-6 rounded-full"
              />
              <p>{session.user.user_metadata.user_name}</p>
            </div>
            <Dropdown as={IconButton} icon={<IoSettingsOutline size={19} />}>
              <DropdownItem
                as={Button}
                icon={<IoCloudOutline size={19} />}
                onClick={() => supabase.auth.signOut()}
              >
                Profile
              </DropdownItem>
            </Dropdown>
          </div>
          <SidebarSection title="Documents" icon={<BiCloud size={19} />}>
            <RealtimeDocs serverDocs={docs} />
          </SidebarSection>
          <SidebarSection title="Saved" icon={<BiLibrary size={19} />}>
            <p>my docs</p>
          </SidebarSection>
        </div>
      </nav>
      <div className={`transition-all duration-300 ease-in-out ml-60 ${sidebarOpen ? "ml-60" : "ml-0"}`}>
        <div className="fixed top-0 z-30 flex items-center justify-between w-full px-4 py-4 mb-12 border-b bg-neutral-800/30 border-neutral-800">
          <IconButton
            icon={<BiDockLeft size={19} />}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <div className="mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}
