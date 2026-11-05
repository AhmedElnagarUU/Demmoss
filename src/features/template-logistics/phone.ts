import { whatsappUrl } from "@/shared/ui/whatsapp";

const phonePattern = /^\+?[0-9\s-]{8,18}$/;

export function isValidPhone(phone: string): boolean {
  return phonePattern.test(phone.trim());
}

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

// A link that opens a WhatsApp chat with the client.
export function clientWhatsAppUrl(phone: string, message: string): string {
  return whatsappUrl(phoneDigits(phone), message);
}
