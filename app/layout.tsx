import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vegetablize10.vercel.app"),
  title: "vegetablize.10",
  description: "vegetablize.10",
  openGraph: {
    title: "vegetablize.10",
    description: "vegetablize.10",
    url: "https://vegetablize10.vercel.app",
    siteName: "vegetablize.10",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "vegetablize.10" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vegetablize.10",
    description: "vegetablize.10",
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
