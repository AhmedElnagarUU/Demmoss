export function GuideCallout({ label, text }: { label: string; text: string }) {
  return (
    <div
      role="note"
      aria-label={label}
      className="flex gap-3 rounded-xl border border-white/10 border-s-4 border-s-primary bg-primary/5 p-4"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="mt-0.5 size-5 shrink-0 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
      <p className="text-base leading-relaxed text-text">
        <span className="font-semibold text-primary">{label}: </span>
        {text}
      </p>
    </div>
  );
}
