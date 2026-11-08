import Link from "next/link";
import { publicEnv } from "@/shared/env";
import { BrandMark } from "./brand-mark";

export function Logo({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 rounded-lg text-[15px] font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
    >
      <BrandMark className="size-8" />
      <span className="tracking-tight rtl:tracking-normal">{publicEnv.NEXT_PUBLIC_BRAND_NAME}</span>
    </Link>
  );
}
