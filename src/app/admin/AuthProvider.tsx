import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured, usernameToEmail } from "@/lib/supabase";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signIn: (username: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isSupabaseConfigured;

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) {
      setLoading(false);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setUser(next?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn(username: string, password: string) {
    const sb = getSupabase();
    if (!sb) return { error: "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env." };
    const email = usernameToEmail(username);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, configured, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
