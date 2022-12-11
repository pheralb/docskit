import type { Session, SupabaseClient } from "@supabase/auth-helpers-remix";
import type { Database } from "./db";

export type TypedSupabaseClient = SupabaseClient<Database>;
export type MaybeSession = Session | null;

export type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
};
