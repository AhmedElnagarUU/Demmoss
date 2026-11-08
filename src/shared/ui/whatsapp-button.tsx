import { publicEnv } from "@/shared/env";
import { buttonClasses } from "./button-styles";
import { whatsappUrl } from "./whatsapp";

type Props = {
  label: string;
  message: string;
  onClick?: () => void;
  className?: string;
};

export function WhatsAppButton({ label, message, onClick, className = "" }: Props) {
  return (
    <a
      href={whatsappUrl(publicEnv.NEXT_PUBLIC_WHATSAPP_NUMBER, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonClasses("whatsapp")} ${className}`}
      onClick={onClick}
    >
      {label}
    </a>
  );
}
