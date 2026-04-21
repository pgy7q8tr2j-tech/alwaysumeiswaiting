import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cn1046hb9an0o42.vercel.app"),
  title: "cn1046hb9an0o42",
  description: "cn1046hb9an0o42",
  openGraph: {
    title: "cn1046hb9an0o42",
    description: "cn1046hb9an0o42",
    url: "https://cn1046hb9an0o42.vercel.app",
    siteName: "cn1046hb9an0o42",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "cn1046hb9an0o42" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "cn1046hb9an0o42",
    description: "cn1046hb9an0o42",
    images: ["/images/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
