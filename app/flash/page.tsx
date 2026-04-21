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
  { id: "flash-01",  src: "/images/works/flash/flash-01.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-02",  src: "/images/works/flash/flash-02.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-03",  src: "/images/works/flash/flash-03.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-04",  src: "/images/works/flash/flash-04.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-05",  src: "/images/works/flash/flash-05.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-06",  src: "/images/works/flash/flash-06.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-07",  src: "/images/works/flash/flash-07.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-08",  src: "/images/works/flash/flash-08.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-09",  src: "/images/works/flash/flash-09.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-10",  src: "/images/works/flash/flash-10.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-11",  src: "/images/works/flash/flash-11.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-12",  src: "/images/works/flash/flash-12.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-13",  src: "/images/works/flash/flash-13.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-14",  src: "/images/works/flash/flash-14.jpg",  title: "無題",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-15",  src: "/images/works/flash/flash-15.jpg",  title: "20241012",                                         price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-16",  src: "/images/works/flash/flash-16.jpg",  title: "2人",                                              price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-17",  src: "/images/works/flash/flash-17.jpg",  title: "2人",                                              price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-18",  src: "/images/works/flash/flash-18.jpg",  title: "2人",                                              price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-19",  src: "/images/works/flash/flash-19.jpg",  title: "8階の部屋、太陽",                                    price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-20",  src: "/images/works/flash/flash-20.jpg",  title: "Flower's memory",                                  price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-21",  src: "/images/works/flash/flash-21.jpg",  title: "IMG_3566",                                         price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-22",  src: "/images/works/flash/flash-22.jpg",  title: "IMG_3715",                                         price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-23",  src: "/images/works/flash/flash-23.jpg",  title: "IMG_3718",                                         price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-24",  src: "/images/works/flash/flash-24.jpg",  title: "Relationship between space-time and crystals",     price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-25",  src: "/images/works/flash/flash-25.jpg",  title: "Relationship between space-time and darkness",     price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-26",  src: "/images/works/flash/flash-26.jpg",  title: "Summon space and time!",                           price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-27",  src: "/images/works/flash/flash-27.jpg",  title: "Symbol of layers of time and space",               price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-28",  src: "/images/works/flash/flash-28.jpg",  title: "Symbol of the type of space-time",                 price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-29",  src: "/images/works/flash/flash-29.jpg",  title: "Symbol of the type of space-time",                 price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-30",  src: "/images/works/flash/flash-30.jpg",  title: "The Relationship Between Everyday Life and Dogs",  price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-31",  src: "/images/works/flash/flash-31.jpg",  title: "hug",                                              price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-32",  src: "/images/works/flash/flash-32.jpg",  title: "✌🏻に侵入に侵入",                                    price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-33",  src: "/images/works/flash/flash-33.jpg",  title: "✌🏻の夢",                                           price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-34",  src: "/images/works/flash/flash-34.jpg",  title: "ゆっくり歩けば暑くない",                              price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-35",  src: "/images/works/flash/flash-35.jpg",  title: "忘れられた町",                                       price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-36",  src: "/images/works/flash/flash-36.jpg",  title: "手のひらの58",                                      price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-37",  src: "/images/works/flash/flash-37.jpg",  title: "村",                                               price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-38",  src: "/images/works/flash/flash-38.jpg",  title: "村",                                               price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-39",  src: "/images/works/flash/flash-39.jpg",  title: "浮かぶ数字",                                        price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-40",  src: "/images/works/flash/flash-40.jpg",  title: "祈り",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-41",  src: "/images/works/flash/flash-41.jpg",  title: "祈り",                                             price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-42",  src: "/images/works/flash/flash-42.jpg",  title: "蔓",                                               price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
  { id: "flash-43",  src: "/images/works/flash/flash-43.jpg",  title: "蔓",                                               price: 30000, size: "", availability: "available", priceId: DEPOSIT_PRICE_ID },
];

const statusLabel: Record<AvailabilityStatus, string> = {
  available: "available",
  reserved:  "reserved",
  sold:      "sold out",
};

type FlashItem = (typeof flashItems)[number];

export default function FlashPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  // 毎回ランダムな順番で表示
  const [shuffled, setShuffled] = useState<FlashItem[]>(flashItems);

  useEffect(() => {
    setShuffled([...flashItems].sort(() => Math.random() - 0.5));
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
                  <span className="text-white text-xs leading-snug">{item.title}</span>
                  {item.price > 0 && (
                    <span className="text-white text-xs">
                      ¥{item.price.toLocaleString()}
                    </span>
                  )}
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
