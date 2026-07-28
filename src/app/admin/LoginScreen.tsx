import { useState, type FormEvent } from "react";
import { AlertCircle, Eye, EyeOff, LogIn } from "lucide-react";
import troveLogo from "@/imports/Trove.png";
import { inputClass, labelClass } from "./adminUi";

type Props = {
  onNavigate: (page: string) => void;
  onSignIn: (username: string, password: string) => Promise<{ error: string | null }>;
  configured: boolean;
};

export function LoginScreen({ onNavigate, onSignIn, configured }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await onSignIn(username, password);
    setLoading(false);
    if (err) setError(err);
  }

  return (
    <div
      className="min-h-screen bg-[#040D1A] flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #1B6FE810, transparent)" }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <button
            onClick={() => onNavigate("home")}
            className="inline-block mb-6 opacity-70 hover:opacity-100 transition-opacity"
          >
            <img src={troveLogo} alt="Trove-AI" className="h-8 mx-auto brightness-0 invert" />
          </button>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Admin Sign In
          </h1>
          <p className="text-white/42 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            Access is restricted to authorized personnel.
          </p>
        </div>

        {!configured && (
          <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90">
            Supabase is not configured. Copy <code className="text-amber-100">.env.example</code> to{" "}
            <code className="text-amber-100">.env</code> and add your project URL and anon key.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#071528] border border-white/[0.08] rounded-2xl p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {error}
              </p>
            </div>
          )}
          <div>
            <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Username or email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className={inputClass}
              style={{ fontFamily: "Inter, sans-serif" }}
              placeholder="Admin"
            />
          </div>
          <div>
            <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={`${inputClass} pr-12`}
                style={{ fontFamily: "Inter, sans-serif" }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !configured}
            className="w-full flex items-center justify-center gap-2 bg-[#1B6FE8] hover:bg-[#1558C8] text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                Authenticating...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
