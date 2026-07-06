import { MessageCircle } from "lucide-react";

const PHONE = "971505097864";
const DEFAULT_MSG =
  "Hi Nexus Line, I'd like to enquire about your services.";

export function WhatsAppFloat() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(DEFAULT_MSG)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nexus Line on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle className="relative h-7 w-7" fill="currentColor" strokeWidth={0} />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}