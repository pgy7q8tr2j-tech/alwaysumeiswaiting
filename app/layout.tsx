import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alwaysumeiswaiting.com"),
  title: "alwaysumeiswaiting",
  description: "alwaysumeiswaiting",
  openGraph: {
    title: "alwaysumeiswaiting",
    description: "alwaysumeiswaiting",
    url: "https://alwaysumeiswaiting.com",
    siteName: "alwaysumeiswaiting",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "alwaysumeiswaiting" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "alwaysumeiswaiting",
    description: "alwaysumeiswaiting",
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
