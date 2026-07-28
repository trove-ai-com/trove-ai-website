import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { consumeContactPrefill } from "./openContact";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjgejera";
const OFFICE_ADDRESS = "1886 Metro Center Dr Ste 150, Reston, VA 20190";

type Props = {
  onNavigate: (page: string) => void;
  FadeUp: React.ComponentType<{ children: React.ReactNode; delay?: number; className?: string }>;
  SharedFooter: React.ComponentType<{ onNavigate: (page: string) => void }>;
};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/[0.1] bg-[#040D1A] px-4 py-3 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-[#10B981]/50 focus:ring-1 focus:ring-[#10B981]/30";
const labelClass = "block text-[11px] font-bold tracking-[0.16em] uppercase text-white/42";

export function ContactPage({ onNavigate, FadeUp, SharedFooter }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [reason, setReason] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "success" | "error"; text: string }>({
    kind: "idle",
    text: "",
  });

  useEffect(() => {
    const prefill = consumeContactPrefill();
    if (prefill.reason) setReason(prefill.reason);
    if (prefill.message) setMessage(prefill.message);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ kind: "loading", text: "Sending…" });
    try {
      const body = new FormData();
      body.set("name", name);
      body.set("email", email);
      body.set("phone", phone);
      body.set("organization", organization);
      body.set("reason", reason);
      body.set("message", message);
      body.set("_subject", `New Trove-AI Website Inquiry — ${reason}`);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || data?.message || "Unable to send right now. Please try again.");
      }

      setName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setReason("General Inquiry");
      setMessage("");
      setStatus({ kind: "success", text: "Received. We'll get back to you shortly." });
    } catch (err) {
      setStatus({
        kind: "error",
        text: err instanceof Error ? err.message : "Network error. Please try again.",
      });
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-[#040D1A]">
      <section className="border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background:
            "radial-gradient(circle at 70% 45%, rgba(16,185,129,0.12), transparent 55%), radial-gradient(circle at 20% 30%, rgba(27,111,232,0.10), transparent 50%)",
        }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="h-px bg-gradient-to-r from-[#10B981]/60 via-white/[0.06] to-transparent" />
          <div className="py-20 max-w-3xl">
            <FadeUp>
              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#10B981] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Contact
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Let&apos;s build a safe and secure future. Together.
              </h1>
              <p className="mt-6 text-white/45 text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Whether you&apos;re exploring AI-powered solutions or looking to partner on a mission-critical deployment, our team is ready to help.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <FadeUp>
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-white/[0.08] bg-[#071528]/70 p-8 md:p-10"
              >
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="contact-name">
                    Name
                  </label>
                  <input id="contact-name" required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="contact-email">
                    Email
                  </label>
                  <input id="contact-email" type="email" required className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="contact-phone">
                      Phone
                    </label>
                    <input id="contact-phone" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="contact-org">
                      Organization
                    </label>
                    <input id="contact-org" className={inputClass} value={organization} onChange={(e) => setOrganization(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="contact-reason">
                    Reason for contact
                  </label>
                  <select
                    id="contact-reason"
                    className={inputClass}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option className="bg-[#071528]">General Inquiry</option>
                    <option className="bg-[#071528]">Request Demo</option>
                    <option className="bg-[#071528]">Partnership</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "'Space Grotesk', sans-serif" }} htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    className={`${inputClass} resize-y`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.kind === "loading"}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:opacity-60 text-white text-sm font-semibold px-6 py-3.5 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {status.kind === "loading" ? "Sending…" : "Submit"}
                  {status.kind !== "loading" && <ArrowRight className="w-4 h-4" />}
                </button>

                {status.text && (
                  <p
                    className={`text-sm ${
                      status.kind === "success"
                        ? "text-[#10B981]"
                        : status.kind === "error"
                          ? "text-red-400"
                          : "text-white/45"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {status.text}
                  </p>
                )}
              </form>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/[0.08] bg-[#071528]/70 p-7">
                  <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Direct contact
                  </h2>
                  <p className="text-sm text-white/42 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                    Solution and partnership inquiries
                  </p>
                  <a
                    href="mailto:info@trove-ai.com"
                    className="inline-flex items-center gap-2 text-white hover:text-[#10B981] transition-colors font-semibold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <Mail className="w-4 h-4 text-[#10B981]" />
                    info@trove-ai.com
                  </a>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#071528]/70 p-7">
                  <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Office
                  </h2>
                  <div className="flex items-start gap-3 text-sm text-white/50 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    <MapPin className="w-4 h-4 text-[#1B6FE8] flex-shrink-0 mt-0.5" />
                    <span>{OFFICE_ADDRESS}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-[#071528]/40 p-7">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/38 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Looking for solutions?
                  </p>
                  <p className="text-sm text-white/42 mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    Explore the full product suite or see how we deploy across industries.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => onNavigate("solutions")}
                      className="text-sm font-semibold text-[#10B981] hover:gap-3 inline-flex items-center gap-2 transition-all"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Solutions <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate("industries")}
                      className="text-sm font-semibold text-white/50 hover:text-white inline-flex items-center gap-2 transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Industries <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <SharedFooter onNavigate={onNavigate} />
    </div>
  );
}
