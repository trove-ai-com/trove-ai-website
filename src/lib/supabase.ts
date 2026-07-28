import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(
  url &&
    anonKey &&
    !url.includes("YOUR_PROJECT_REF") &&
    !anonKey.includes("YOUR_ANON_KEY")
);

export const ADMIN_EMAIL_DOMAIN = "trove-admin.local";

export function usernameToEmail(username: string): string {
  const u = username.trim().toLowerCase();
  if (u.includes("@")) return u;
  return `${u}@${ADMIN_EMAIL_DOMAIN}`;
}

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(url!, anonKey!);
  }
  return client;
}
