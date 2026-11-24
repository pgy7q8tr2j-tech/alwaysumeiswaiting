"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import PhotoBackground from "@/components/PhotoBackground";
import Lightbox from "@/components/Lightbox";
import HomeButton from "@/components/HomeButton";
import { daysPhotos } from "@/lib/days";

const mono = { fontFamily: "'Courier New', Courier, monospace" };

export default function DaysPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [photos, setPhotos]     = useState<string[]>(daysPhotos);

  useEffect(() => {
    setPhotos([...daysPhotos].sort(() => Math.random() - 0.5));
  }, []);

  return (
    // 写真を並べるページなので、背景は強めに暗くして一覧を見やすくする
    <PhotoBackground overlay={45}>
      <HomeButton />
      <div className="min-h-screen px-14 pt-20 pb-28 md:px-20 lg:px-28">

        {/* 写真が無いとき：画面中央に no photo */}
        {photos.length === 0 && (
          <div
            className="flex items-center justify-center"
            style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}
          >
            <p
              style={{
                ...mono,
                color:         "rgba(255,255,255,0.72)",
                fontSize:      "clamp(1.4rem, 4.5vw, 2.4rem)",
                fontWeight:    700,
                letterSpacing: "0.05em",
                textShadow:    "0 2px 18px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.85), 0 0 3px rgba(0,0,0,0.7)",
              }}
            >
              no photo
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-14">
          {photos.map((src) => (
            <button
              key={src}
              onClick={() => setLightbox(src)}
              className="relative w-full overflow-hidden bg-white/10 cursor-zoom-in block"
              style={{ border: "none", padding: 0 }}
            >
              <Image
                src={src}
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 768px) 40vw, 28vw"
                className="w-full h-auto transition-opacity duration-300 hover:opacity-80"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox}
          alt=""
          onClose={() => setLightbox(null)}
        />
      )}
    </PhotoBackground>
  );
}
