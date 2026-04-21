"use client";

import { useEffect } from "react";
import Image from "next/image";
import ShopCheckoutButton from "@/components/ShopCheckoutButton";

const mono = { fontFamily: "'Courier New', Courier, monospace" };
const ts   = { ...mono, textShadow: "0 1px 6px rgba(0,0,0,0.7)" };

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
  // shop 用オプション
  title?: string;
  price?: number;
  medium?: string;
  size?: string;
  year?: string;
  priceId?: string;
  inStock?: boolean;
}

export default function Lightbox({ src, alt, onClose, title, price, medium, size, year, priceId, inStock }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const hasDetail = title !== undefined;
  const detail    = [medium, size, year].filter(Boolean).join("  /  ");

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        padding: "24px 16px",
      }}
    >
      {hasDetail ? (
        /* ── shop モード：画像 + 詳細 縦並び ── */
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ width: "min(88vw, 480px)", display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* 画像 */}
          <div style={{ position: "relative", width: "100%" }}>
            <Image
              src={src}
              alt={alt}
              width={0}
              height={0}
              sizes="min(88vw, 480px)"
              className="w-full h-auto"
              priority
            />
          </div>

          {/* 詳細 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, ...ts }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13 }}>{title}</span>
              {price !== undefined && (
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, whiteSpace: "nowrap" }}>
                  ¥{price.toLocaleString()}
                </span>
              )}
            </div>
            {detail && (
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, lineHeight: 1.8 }}>{detail}</p>
            )}
            {inStock && priceId && (
              <div style={{ marginTop: 4 }}>
                <ShopCheckoutButton priceId={priceId} label="buy now" />
              </div>
            )}
            {!inStock && (
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, ...mono }}>sold out</span>
            )}
          </div>
        </div>
      ) : (
        /* ── 通常モード：画像のみ ── */
        <div
          style={{ width: "min(88vw, 88vh)", height: "min(88vw, 88vh)", position: "relative" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="88vw"
            priority
          />
        </div>
      )}
    </div>
  );
}
