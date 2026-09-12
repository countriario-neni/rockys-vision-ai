import { SITE } from "@/content/site";

// WhatsApp deep links need a bare international number: no +, spaces or dashes.
export function whatsappHref(message?: string): string {
  const digits = SITE.whatsapp.replace(/\D/g, "");
  const text = message ?? `Hi Rocky's Vision AI — I run a fitness brand and I'd like to talk about content and marketing.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
