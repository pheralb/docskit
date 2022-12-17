export const supabaseEnv = {
  SUPABASE_URL: process.env.SUPABASE_URL || 'Your Supabase URL',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'Your Supabase Anon Key',
};

export function getEnv() {
  return supabaseEnv;
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}