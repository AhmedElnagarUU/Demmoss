import Link from "next/link";
import { publicEnv } from "@/shared/env";

export function Logo({ href }: { href: string }) {
  return (
    <Link href={href} className="text-xl font-bold text-text">
      {publicEnv.NEXT_PUBLIC_BRAND_NAME}
    </Link>
  );
}
