// The BOCHKE cube mark (public/brand/logo-mark.png, from the owner's logo). The PNG is used as a mask, so the mark takes
// the theme colour (bg-primary) and stays sharp on any background.
const mask = "url(/brand/logo-mark.png) center / contain no-repeat";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-primary ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
