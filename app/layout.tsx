import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vegetablizevampire.vercel.app"),
  title: "vegetablizevampire",
  description: "vegetablizevampire",
  openGraph: {
    title: "vegetablizevampire",
    description: "vegetablizevampire",
    url: "https://vegetablizevampire.vercel.app",
    siteName: "vegetablizevampire",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "vegetablizevampire" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vegetablizevampire",
    description: "vegetablizevampire",
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
