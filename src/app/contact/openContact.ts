export type ContactPrefill = {
  reason?: "General Inquiry" | "Request Demo" | "Partnership" | string;
  message?: string;
};

const KEY = "trove_contact_prefill";

export function openContact(
  onNavigate: (page: string) => void,
  prefill?: ContactPrefill
) {
  if (prefill && (prefill.reason || prefill.message)) {
    sessionStorage.setItem(KEY, JSON.stringify(prefill));
  } else {
    sessionStorage.removeItem(KEY);
  }
  onNavigate("contact");
}

export function consumeContactPrefill(): ContactPrefill {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ContactPrefill;
  } catch {
    return {};
  }
}
