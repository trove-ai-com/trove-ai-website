import { useState, type ReactNode } from "react";
import {
  BookOpen,
  ChevronDown,
  Columns,
  FileText,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  Plus,
  UserCheck,
} from "lucide-react";
import troveLogo from "@/imports/Trove.png";
import type { AdminSection } from "./adminUi";

type Props = {
  email: string;
  displayName: string;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  activeSection: AdminSection;
  onSectionChange: (s: AdminSection) => void;
  onNewPost?: () => void;
  children: ReactNode;
};

const contentNav: { id: AdminSection; label: string; icon: ReactNode }[] = [
  { id: "blog", label: "Blog Posts", icon: <FileText className="w-4 h-4" /> },
  { id: "copy", label: "Pages", icon: <Columns className="w-4 h-4" /> },
  { id: "guides", label: "Guides", icon: <BookOpen className="w-4 h-4" /> },
  { id: "faqs", label: "FAQs", icon: <HelpCircle className="w-4 h-4" /> },
];

export function AdminShell({
  email,
  displayName,
  onNavigate,
  onSignOut,
  activeSection,
  onSectionChange,
  onNewPost,
  children,
}: Props) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const roleColor = "#1B6FE8";
  const initial = (displayName || email || "A").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#03080F] flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#030C1A] border-b border-white/[0.07] flex items-center px-5 gap-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center opacity-80 hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <img src={troveLogo} alt="Trove-AI" className="h-6 brightness-0 invert" />
        </button>
        <div className="w-px h-5 bg-white/[0.1] mx-1" />
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[#1B6FE8]" />
          <span className="text-white/70 text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Administrator Dashboard
          </span>
        </div>

        <div className="flex-1" />

        {onNewPost && (
          <button
            onClick={onNewPost}
            className="flex items-center gap-1.5 bg-[#1B6FE8] hover:bg-[#1558C8] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <Plus className="w-3.5 h-3.5" /> New post
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/[0.08]"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: `${roleColor}30`, border: `1px solid ${roleColor}40` }}
            >
              {initial}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-white/80 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {displayName}
              </p>
              <p className="text-[10px] leading-tight" style={{ color: roleColor, fontFamily: "Inter, sans-serif" }}>
                Administrator
              </p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#071528] border border-white/[0.1] rounded-xl shadow-2xl z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-xs font-semibold text-white/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {displayName}
                  </p>
                  <p className="text-[11px] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
                    {email}
                  </p>
                  <div
                    className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${roleColor}18`, color: roleColor, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <UserCheck className="w-2.5 h-2.5" />
                    Administrator
                  </div>
                </div>
                <div className="p-1.5">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onNavigate("home");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-colors text-left"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Globe className="w-3.5 h-3.5" /> View public site
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.08] transition-colors text-left"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="flex pt-14 min-h-screen">
        <aside className="fixed left-0 top-14 bottom-0 w-52 bg-[#030C1A] border-r border-white/[0.06] flex flex-col z-40">
          <nav className="flex-1 py-4 px-2">
            <p
              className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/25 px-3 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Content
            </p>
            <div className="space-y-0.5">
              {contentNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                    activeSection === item.id
                      ? "bg-[#1B6FE8]/15 text-[#1B6FE8] font-semibold"
                      : "text-white/45 hover:text-white/75 hover:bg-white/[0.04] font-medium"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className={activeSection === item.id ? "text-[#1B6FE8]" : "text-white/30"}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="p-3 border-t border-white/[0.05]">
            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ background: `${roleColor}30` }}
              >
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/50 truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                  {email}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 ml-52 min-h-full bg-[#040D1A]">{children}</main>
      </div>
    </div>
  );
}
