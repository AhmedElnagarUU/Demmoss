import type { Metadata } from "next";

// The admin is private and reads cookies and the database on every request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AdminLayout({ children }: LayoutProps<"/[locale]/admin">) {
  return children;
}
