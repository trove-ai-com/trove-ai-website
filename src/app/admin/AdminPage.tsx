import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useAuth } from "./AuthProvider";
import { LoginScreen } from "./LoginScreen";
import { AdminShell } from "./AdminShell";
import { BlogAdmin, emptyBlogDraft } from "./BlogAdmin";
import { GuidesAdmin } from "./GuidesAdmin";
import { CopyAdmin } from "./CopyAdmin";
import { FaqsAdmin } from "./FaqsAdmin";
import type { AdminSection } from "./adminUi";
import type { BlogPost } from "@/app/content/types";

type Props = { onNavigate: (page: string) => void };

function displayNameFromUser(user: User): string {
  const meta = user.user_metadata as { full_name?: string; name?: string } | undefined;
  if (meta?.full_name) return meta.full_name;
  if (meta?.name) return meta.name;
  const email = user.email || "";
  const local = email.split("@")[0] || "Admin";
  return local.charAt(0).toUpperCase() + local.slice(1);
}

export function AdminPage({ onNavigate }: Props) {
  const { user, loading, configured, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040D1A] flex items-center justify-center">
        <p className="text-white/40 text-sm">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onNavigate={onNavigate} onSignIn={signIn} configured={configured} />;
  }

  return (
    <AdminDashboard
      user={user}
      onNavigate={onNavigate}
      onSignOut={async () => {
        await signOut();
      }}
    />
  );
}

function AdminDashboard({
  user,
  onNavigate,
  onSignOut,
}: {
  user: User;
  onNavigate: (p: string) => void;
  onSignOut: () => Promise<void>;
}) {
  const [section, setSection] = useState<AdminSection>("blog");
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  function handleSectionChange(s: AdminSection) {
    setEditingPost(null);
    setSection(s);
  }

  function startNewPost() {
    setSection("blog");
    setEditingPost(emptyBlogDraft());
  }

  const email = user.email || "";
  const displayName = displayNameFromUser(user);

  return (
    <AdminShell
      email={email}
      displayName={displayName}
      onNavigate={onNavigate}
      onSignOut={() => {
        void onSignOut();
      }}
      activeSection={section}
      onSectionChange={handleSectionChange}
      onNewPost={section === "blog" && !editingPost ? startNewPost : undefined}
    >
      {section === "blog" && (
        <BlogAdmin editing={editingPost} onEdit={setEditingPost} onRequestNew={startNewPost} />
      )}
      {section === "guides" && <GuidesAdmin />}
      {section === "copy" && <CopyAdmin />}
      {section === "faqs" && <FaqsAdmin />}
    </AdminShell>
  );
}
