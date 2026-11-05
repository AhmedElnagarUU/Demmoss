import { publicEnv } from "@/shared/env";
import { buttonClasses } from "./button-styles";
import { whatsappUrl } from "./whatsapp";

type Props = {
  label: string;
  message: string;
  onClick?: () => void;
};

export function WhatsAppButton({ label, message, onClick }: Props) {
  return (
    <a
      href={whatsappUrl(publicEnv.NEXT_PUBLIC_WHATSAPP_NUMBER, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses("whatsapp")}
      onClick={onClick}
    >
      {label}
    </a>
  );
}
