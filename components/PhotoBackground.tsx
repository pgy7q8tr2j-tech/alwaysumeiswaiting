"use client";

import Image from "next/image";
import { useRandomImage } from "@/hooks/useRandomImage";

interface Props {
  children: React.ReactNode;
  /** 0-100. Adds a dark overlay for text readability. Default 0 (no overlay). */
  overlay?: number;
  className?: string;
}

export default function PhotoBackground({ children, overlay = 0, className = "" }: Props) {
  const image = useRandomImage();

  return (
    /*
     * iOS Safari fix: instead of "fixed background + scrolling body",
     * use "fixed outer shell (overflow:hidden) + absolute background + inner scroll container".
     * The background never resizes because it lives inside a fixed-size shell.
     */
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      {/* Background — absolute inside the fixed shell, so it never moves */}
      {image && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: image ? 1 : 0,
            transition: "opacity 0.7s",
          }}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {overlay > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `rgba(0,0,0,${overlay / 100})`,
              }}
            />
          )}
        </div>
      )}

      {/* Scrollable content layer */}
      <div
        className={`relative ${className}`}
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
