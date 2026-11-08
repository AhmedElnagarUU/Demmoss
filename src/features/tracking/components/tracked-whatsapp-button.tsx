"use client";

import type { Locale } from "@/shared/i18n/config";
import { WhatsAppButton } from "@/shared/ui/whatsapp-button";
import { track } from "../client/track";

type Props = {
  locale: Locale;
  label: string;
  message: string;
  template?: string;
  className?: string;
};

export function TrackedWhatsAppButton({ locale, label, message, template, className }: Props) {
  return (
    <WhatsAppButton
      label={label}
      message={message}
      onClick={() => track("whatsapp_clicked", { locale, template })}
      className={className}
    />
  );
}
