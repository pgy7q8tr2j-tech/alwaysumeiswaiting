import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alwaysumeiswaiting.com"),
  title: "cn1046hb9an0o42",
  description:
    "記憶、トラウマ、感情、時空など目に見えないが確かに存在するものを、原型を崩した具象として描く。Tattoo artist, painter, hairdresser based in Tokyo.",
  openGraph: {
    title: "alwaysumeiswaiting",
    description:
      "記憶、トラウマ、感情、時空など目に見えないが確かに存在するものを、原型を崩した具象として描く。",
    url: "https://alwaysumeiswaiting.com",
    siteName: "alwaysumeiswaiting",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "alwaysumeiswaiting" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "alwaysumeiswaiting",
    description: "記憶、トラウマ、感情、時空など目に見えないが確かに存在するものを、原型を崩した具象として描く。",
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
