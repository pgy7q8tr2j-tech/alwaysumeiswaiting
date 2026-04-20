"use client";

import { useEffect } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt, onClose }: Props) {
  // Escキーで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    // スクロール禁止
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.88)" }}
      onClick={onClose}
    >
      {/* 画像コンテナ — クリックで閉じないよう伝播を止める */}
      <div
        className="relative"
        style={{ width: "min(88vw, 88vh)", height: "min(88vw, 88vh)" }}
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

      {/* ヒント */}
      <p
        className="absolute bottom-6 text-white text-xs"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          opacity: 0.3,
        }}
      >
        click anywhere or esc to close
      </p>
    </div>
  );
}
