import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

// Line icons of the Orbis Cargo source. They inherit the text colour; the caller sets the size.
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function MarkIcon({ className = "size-9" }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path
        d="M20 3l14.4 8.3v17.4L20 37 5.6 28.7V11.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M5.6 11.3L20 19.6l14.4-8.3M20 19.6V37"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M20 19.6l-7.2-4.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="20" cy="19.6" r="2.6" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ className = "size-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ShieldIcon({ className = "size-[26px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M12 3l8 3v6c0 4.5-3.3 7.8-8 9-4.7-1.2-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function BoxIcon({ className = "size-[26px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2z" />
      <path d="M4 7.2l8 4.4 8-4.4M12 11.6v9.6" />
    </svg>
  );
}

export function FileIcon({ className = "size-[26px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  );
}

export function HeadsetIcon({ className = "size-[26px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19c0 1.5-2 2-5 2" />
    </svg>
  );
}

export function PlaneIcon({ className = "size-[17px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M3 13l18-8-6 15-3-6z" />
    </svg>
  );
}

export function ShipIcon({ className = "size-[17px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M3 17l2 3h14l2-3zM6 17V10h12v7M9 10V6h6v4" />
    </svg>
  );
}

export function TruckIcon({ className = "size-[17px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M2 6h12v10H2zM14 9h4l3 3v4h-7" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export function TrainIcon({ className = "size-[17px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <rect x="5" y="3" width="14" height="14" rx="3" />
      <path d="M5 11h14M8 21l2-4M16 21l-2-4" />
    </svg>
  );
}

export function GlobeIcon({ className = "size-[38px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 4 5.7 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.7-4-9s1.4-6.4 4-9z" />
    </svg>
  );
}

export function PhoneIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export function MailIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function PinIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function ClockIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CheckIcon({ className = "size-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </svg>
  );
}

export function PlayIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M6 3.5v17l15-8.5z" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon({ className = "size-[18px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "size-3" }: IconProps) {
  return (
    <svg viewBox="0 0 12 8" aria-hidden="true" className={className} {...line}>
      <path d="M1 1l5 5 5-5" />
    </svg>
  );
}

export function TelegramIcon({ className = "size-[19px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M21 4L3 11l6 2 2 6 3-4 4 3z" />
      <path d="M9 13l8-6" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "size-[19px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <path d="M4 20l1.2-4A8 8 0 118 19z" />
      <path d="M9 8.5c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "size-[19px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v6M8 7.5v.01M12 16v-6M12 12.5c0-1.5 1-2.5 2.5-2.5S17 11 17 12.5V16" />
    </svg>
  );
}

export function InstagramIcon({ className = "size-[19px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...line}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </svg>
  );
}
