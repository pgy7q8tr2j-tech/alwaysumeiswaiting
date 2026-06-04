"use client";

import Link from "next/link";

interface Props {
  onBeforeNavigate?: () => void;
}

export default function HomeButton({ onBeforeNavigate }: Props) {
  return (
    <Link
      href="/"
      onClick={onBeforeNavigate}
      className="fixed top-6 left-6 z-40 text-white text-base transition-opacity hover:opacity-70"
      style={{
        fontFamily: "'Courier New', Courier, monospace",
        textShadow: "0 1px 6px rgba(0,0,0,0.7)",
      }}
    >
      ← home
    </Link>
  );
}
