"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { pickRandom } from "@/lib/gallery";

const navLinks = [
  { href: "/flash",   label: "flash",   zone: { tMin: 10, tMax: 32, lMin: 5,  lMax: 60 } },
  { href: "/shop",    label: "shop",    zone: { tMin: 38, tMax: 60, lMin: 18, lMax: 65 } },
  { href: "/booking", label: "booking", zone: { tMin: 66, tMax: 84, lMin: 8,  lMax: 58 } },
];

// 3色を必ずシャッフルして重複なしで割り当て
const DOT_COLORS = ["#ff4444", "#4488ff", "#44cc77"];
function shuffleColors(): string[] {
  return [...DOT_COLORS].sort(() => Math.random() - 0.5);
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface LinkState { top: string; left: string; color: string }

export default function Home() {
  const [bg, setBg]       = useState("");
  const [links, setLinks] = useState<LinkState[]>([]);

  useEffect(() => {
    setBg(pickRandom());
    const colors = shuffleColors();
    setLinks(
      navLinks.map(({ zone: { tMin, tMax, lMin, lMax } }, i) => ({
        top:   `${rand(tMin, tMax)}%`,
        left:  `${rand(lMin, lMax)}%`,
        color: colors[i],
      }))
    );
  }, []);

  return (
    <main style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      {bg && (
        <Image src={bg} alt="" fill className="object-cover" priority sizes="100vw" />
      )}

      {links.length > 0 &&
        navLinks.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            className="absolute text-white select-none flex items-center gap-2"
            style={{
              top:           links[i].top,
              left:          links[i].left,
              fontSize:      "clamp(1.4rem, 4vw, 2.2rem)",
              fontFamily:    "'Courier New', Courier, monospace",
              letterSpacing: "0.05em",
              textShadow:    "0 1px 10px rgba(0,0,0,0.5)",
            }}
          >
            {/* 発光ドット */}
            <span
              style={{
                display:      "inline-block",
                width:        "7px",
                height:       "7px",
                borderRadius: "50%",
                background:   links[i].color,
                flexShrink:   0,
                boxShadow:    `0 0 6px 3px ${links[i].color}`,
              }}
            />
            {label}
          </Link>
        ))}

      {/* 特定商取引法リンク */}
      <Link
        href="/tokusho"
        style={{
          position:   "absolute",
          bottom:     "16px",
          right:      "16px",
          fontSize:   "10px",
          fontFamily: "'Courier New', Courier, monospace",
          color:      "rgba(255,255,255,0.4)",
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          letterSpacing: "0.03em",
        }}
      >
        特定商取引法に基づく表記
      </Link>
    </main>
  );
}
