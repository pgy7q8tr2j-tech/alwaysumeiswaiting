"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import PhotoBackground from "@/components/PhotoBackground";

import Lightbox from "@/components/Lightbox";
import HomeButton from "@/components/HomeButton";

type AvailabilityStatus = "available" | "reserved" | "sold";

const mono = { fontFamily: "'Courier New', Courier, monospace" };
const ts   = { ...mono, textShadow: "0 1px 6px rgba(0,0,0,0.7)" };

const DEPOSIT_PRICE_ID = "price_1TOGn8EXSQUsr48YscnscL6w";

const flashItems: {
  id: string; src: string; title: string;
  price: number; size: string;
  availability: AvailabilityStatus; priceId: string;
}[] = [
  { id: "flash-67", src: "/images/works/flash/flash-67.jpg", title: "思うところあり",         price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-68", src: "/images/works/flash/flash-68.jpg", title: "ゆっくり歩けば暑くない", price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-69", src: "/images/works/flash/flash-69.jpg", title: "だって夢だもんね",       price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-70", src: "/images/works/flash/flash-70.jpg", title: "勧誘",                  price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-71", src: "/images/works/flash/flash-71.jpg", title: "眉毛の長い男",           price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-72", src: "/images/works/flash/flash-72.jpg", title: "ホームビデオ悲しい",     price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-73", src: "/images/works/flash/flash-73.jpg", title: "魔女",                  price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-75", src: "/images/works/flash/flash-75.jpg", title: "2人",                   price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-76", src: "/images/works/flash/flash-76.jpg", title: "口",      price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-78", src: "/images/works/flash/flash-78.jpg", title: "alone",   price: 40000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-79", src: "/images/works/flash/flash-79.jpg", title: "20241012", price: 40000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-80", src: "/images/works/flash/flash-80.jpg", title: "登山",    price: 40000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-81", src: "/images/works/flash/flash-81.jpg", title: "dive!!!",  price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-82", src: "/images/works/flash/flash-82.jpg", title: "20240515", price: 40000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-83", src: "/images/works/flash/flash-83.jpg", title: "共犯",    price: 35000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-84", src: "/images/works/flash/flash-84.jpg", title: "時空",    price: 45000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-85", src: "/images/works/flash/flash-85.jpg", title: "弓",      price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
];

// 元の配列順で固定番号を割り振る
const flashNumMap: Record<string, number> = Object.fromEntries(
  flashItems.map((item, i) => [item.id, i + 1])
);

const statusLabel: Record<AvailabilityStatus, string> = {
  available: "available",
  reserved:  "reserved",
  sold:      "sold out",
};

const archivedItems = [
  // 旧アーカイブ
  { id: "arch-27", src: "/images/works/flash/flash-27.jpg", title: "Symbol of layers of time and space",         price: 25000 },
  { id: "arch-29", src: "/images/works/flash/flash-29.jpg", title: "Symbol of the type of space-time",           price: 20000 },
  { id: "arch-37", src: "/images/works/flash/flash-37.jpg", title: "村",                                          price: 45000 },
  { id: "arch-53", src: "/images/works/flash/flash-53.jpg", title: "map",                                         price: 10000 },
  { id: "arch-31", src: "/images/works/flash/flash-31.jpg", title: "hug",                                         price: 25000 },
  { id: "arch-46", src: "/images/works/flash/flash-46.jpg", title: "蔦",                                          price: 15000 },
  // #1〜#49 アーカイブ
  { id: "arch-01", src: "/images/works/flash/flash-01.jpg", title: "無題",                                        price: 25000 },
  { id: "arch-02", src: "/images/works/flash/flash-02.jpg", title: "無題",                                        price: 25000 },
  { id: "arch-03", src: "/images/works/flash/flash-03.jpg", title: "無題",                                        price: 25000 },
  { id: "arch-04", src: "/images/works/flash/flash-04.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-05", src: "/images/works/flash/flash-05.jpg", title: "無題",                                        price: 25000 },
  { id: "arch-06", src: "/images/works/flash/flash-06.jpg", title: "無題",                                        price: 25000 },
  { id: "arch-07", src: "/images/works/flash/flash-07.jpg", title: "無題",                                        price: 30000 },
  { id: "arch-08", src: "/images/works/flash/flash-08.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-09", src: "/images/works/flash/flash-09.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-10", src: "/images/works/flash/flash-10.jpg", title: "無題",                                        price: 45000 },
  { id: "arch-11", src: "/images/works/flash/flash-11.jpg", title: "無題",                                        price: 45000 },
  { id: "arch-12", src: "/images/works/flash/flash-12.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-13", src: "/images/works/flash/flash-13.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-14", src: "/images/works/flash/flash-14.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-15", src: "/images/works/flash/flash-15.jpg", title: "20241012",                                    price: 30000 },
  { id: "arch-16", src: "/images/works/flash/flash-16.jpg", title: "2人",                                         price: 25000 },
  { id: "arch-17", src: "/images/works/flash/flash-17.jpg", title: "2人",                                         price: 35000 },
  { id: "arch-18", src: "/images/works/flash/flash-18.jpg", title: "2人",                                         price: 30000 },
  { id: "arch-19", src: "/images/works/flash/flash-19.jpg", title: "8階の部屋、太陽",                               price: 25000 },
  { id: "arch-20", src: "/images/works/flash/flash-20.jpg", title: "Flower's memory",                             price: 40000 },
  { id: "arch-21", src: "/images/works/flash/flash-21.jpg", title: "太陽のうるさい日",                              price: 20000 },
  { id: "arch-22", src: "/images/works/flash/flash-22.jpg", title: "水",                                          price: 30000 },
  { id: "arch-23", src: "/images/works/flash/flash-23.jpg", title: "呼び声",                                       price: 20000 },
  { id: "arch-24", src: "/images/works/flash/flash-24.jpg", title: "Relationship between space-time and crystals", price: 60000 },
  { id: "arch-25", src: "/images/works/flash/flash-25.jpg", title: "Relationship between space-time and darkness", price: 35000 },
  { id: "arch-26", src: "/images/works/flash/flash-26.jpg", title: "Summon space and time!",                      price: 35000 },
  { id: "arch-32", src: "/images/works/flash/flash-32.jpg", title: "✌🏻に侵入に侵入",                               price: 25000 },
  { id: "arch-33", src: "/images/works/flash/flash-33.jpg", title: "✌🏻の夢",                                      price: 20000 },
  { id: "arch-34", src: "/images/works/flash/flash-34.jpg", title: "ゆっくり歩けば暑くない",                         price: 30000 },
  { id: "arch-35", src: "/images/works/flash/flash-35.jpg", title: "忘れられた町",                                  price: 35000 },
  { id: "arch-36", src: "/images/works/flash/flash-36.jpg", title: "手のひらの58",                                 price: 25000 },
  { id: "arch-39", src: "/images/works/flash/flash-39.jpg", title: "浮かぶ数字",                                   price: 20000 },
  { id: "arch-40", src: "/images/works/flash/flash-40.jpg", title: "祈り",                                        price: 35000 },
  { id: "arch-41", src: "/images/works/flash/flash-41.jpg", title: "祈り",                                        price: 30000 },
  { id: "arch-43", src: "/images/works/flash/flash-43.jpg", title: "蔓",                                          price: 10000 },
  { id: "arch-45", src: "/images/works/flash/flash-45.jpg", title: "無題",                                        price: 70000 },
  { id: "arch-47", src: "/images/works/flash/flash-47.jpg", title: "蔦",                                          price: 15000 },
  { id: "arch-48", src: "/images/works/flash/flash-48.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-50", src: "/images/works/flash/flash-50.jpg", title: "無題",                                        price: 35000 },
  { id: "arch-51", src: "/images/works/flash/flash-51.jpg", title: "無題",                                        price: 100000 },
  { id: "arch-52", src: "/images/works/flash/flash-52.jpg", title: "無題",                                        price: 20000 },
  { id: "arch-54", src: "/images/works/flash/flash-54.jpg", title: "map",                                         price: 10000 },
  { id: "arch-56", src: "/images/works/flash/flash-56.jpg", title: "2人",                                         price: 30000 },
  { id: "arch-57", src: "/images/works/flash/flash-57.jpg", title: "Memories of titans",                          price: 40000 },
  { id: "arch-58", src: "/images/works/flash/flash-58.jpg", title: "蔦",                                          price: 15000 },
  { id: "arch-28", src: "/images/works/flash/flash-28.jpg", title: "Symbol of the type of space-time",           price: 30000 },
  { id: "arch-49", src: "/images/works/flash/flash-49.jpg", title: "無題",                                        price: 10000 },
  { id: "arch-44", src: "/images/works/flash/flash-44.jpg", title: "無題",                                        price: 40000 },
  { id: "arch-38", src: "/images/works/flash/flash-38.jpg", title: "村",                                          price: 30000 },
  { id: "arch-74", src: "/images/works/flash/flash-74.jpg", title: "120",                                         price: 30000 },
  { id: "arch-77", src: "/images/works/flash/flash-77.jpg", title: "花",                                          price: 30000 },
];

type FlashItem = (typeof flashItems)[number];

export default function FlashPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [shuffled, setShuffled] = useState<FlashItem[]>(flashItems);
  const [showArchive, setShowArchive] = useState(false);
  const [showTitles, setShowTitles] = useState(false);

  useEffect(() => {
    setShuffled([...flashItems].sort(() => Math.random() - 0.5));
    if (typeof window !== "undefined") {
      // 裏コマンド①：特商→home→flash でアーカイブのみ表示
      if (sessionStorage.getItem("archiveUnlocked") === "1") {
        sessionStorage.removeItem("archiveUnlocked");
        setShowArchive(true);
      }
      // 裏コマンド②：booking→home→shop→home→flash でタイトル＋アーカイブ表示
      if (sessionStorage.getItem("titlesUnlocked") === "1") {
        sessionStorage.removeItem("titlesUnlocked");
        setShowTitles(true);
        setShowArchive(true);
      }
    }
  }, []);

  return (
    <PhotoBackground overlay={18}>
      <HomeButton />
      <div className="min-h-screen px-14 pt-20 pb-28 md:px-20 lg:px-28">

        <p className="text-white text-xs leading-loose mb-14" style={ts}>
          deposit payment confirms your booking.<br />
          contact via instagram dm for scheduling.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-14">
          {shuffled.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              {/* クリックで拡大 */}
              <button
                onClick={() => setLightbox({ src: item.src, alt: item.title })}
                className="relative w-full aspect-square overflow-hidden bg-white/10 cursor-zoom-in block"
                style={{ border: "none", padding: 0 }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-opacity duration-300 hover:opacity-80"
                  sizes="(max-width: 768px) 40vw, 28vw"
                />
                {item.availability !== "available" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <span className="text-white text-xs" style={ts}>
                      {statusLabel[item.availability]}
                    </span>
                  </div>
                )}
              </button>

              {/* Info */}
              <div className="flex flex-col gap-1" style={ts}>
                <div className="flex flex-col gap-0.5">
                  {showTitles && (
                    <span className="text-white text-xs leading-snug">{item.title}</span>
                  )}
                  <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
                    #{String(flashNumMap[item.id]).padStart(2, "0")}
                  </span>
                </div>
                {item.size && (
                  <div className="flex items-center justify-between">
                    <span className="text-white text-[10px]">{item.size}</span>
                    <span className="text-white text-[10px]">{statusLabel[item.availability]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* アーカイブ（裏コマンド解放時のみ表示） */}
        {showArchive && (
          <div className="px-0 pt-20 pb-10">
            <p className="text-white/20 text-[10px] mb-10" style={mono}>archive</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-14">
              {archivedItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-2">
                  <button
                    onClick={() => setLightbox({ src: item.src, alt: item.title })}
                    className="relative w-full aspect-square overflow-hidden bg-white/10 cursor-zoom-in block"
                    style={{ border: "none", padding: 0 }}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-opacity duration-300 hover:opacity-80"
                      sizes="(max-width: 768px) 40vw, 28vw"
                    />
                  </button>
                  <div className="flex flex-col gap-0.5" style={ts}>
                    {showTitles && (
                      <span className="text-white text-xs leading-snug">{item.title}</span>
                    )}
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
                      A-{String(archivedItems.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </PhotoBackground>
  );
}
