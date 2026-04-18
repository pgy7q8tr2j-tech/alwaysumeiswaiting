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
    <div className={`relative min-h-screen ${className}`}>
      {/* Background photo — fixed on desktop, absolute on iOS to prevent scroll-zoom */}
      {image && (
        <div
          className="fixed inset-0 -z-10 transition-opacity duration-700"
          style={{
            opacity: image ? 1 : 0,
            // iOS Safari: prevent the viewport-resize zoom when browser bar hides
            height: "100dvh",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ WebkitBackfaceVisibility: "hidden" }}
          />
          {overlay > 0 && (
            <div
              className="absolute inset-0"
              style={{ background: `rgba(0,0,0,${overlay / 100})` }}
            />
          )}
        </div>
      )}
      {children}
    </div>
  );
}
