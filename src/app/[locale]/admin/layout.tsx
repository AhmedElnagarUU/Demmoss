import type { Metadata } from "next";
import { siteFontClass, siteFonts } from "@/features/site-shell/fonts";

// The admin is private and reads cookies and the database on every request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: LayoutProps<"/[locale]/admin">) {
  return (
    <div
      className={`brand-site ${siteFontClass} min-h-screen overflow-x-clip bg-bg text-text`}
      style={siteFonts}
    >
      {children}
    </div>
  );
}
