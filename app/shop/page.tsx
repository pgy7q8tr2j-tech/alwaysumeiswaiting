"use client";

import Image from "next/image";
import { useState } from "react";
import PhotoBackground from "@/components/PhotoBackground";
import ShopCheckoutButton from "@/components/ShopCheckoutButton";
import Lightbox from "@/components/Lightbox";
import HomeButton from "@/components/HomeButton";

const mono = { fontFamily: "'Courier New', Courier, monospace" };
const ts   = { ...mono, textShadow: "0 1px 6px rgba(0,0,0,0.7)" };

const shopItems = [
  { id: "shop-05", src: "/images/shop/shop-05.jpg", title: "無題（20241126）",      year: "2024", medium: "", size: "", price: 40000, inStock: true, priceId: "price_1TOTkmEXSQUsr48YcC5YeZoM" },
  { id: "shop-06", src: "/images/shop/shop-06.jpg", title: "もっと、ずっと速く。", year: "2024", medium: "", size: "", price: 40000, inStock: true, priceId: "price_1TOTlCEXSQUsr48Y3jjOKxNp" },
];

export default function ShopPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <PhotoBackground overlay={18}>
      <HomeButton />
      <div className="min-h-screen px-14 pt-20 pb-28 md:px-20 lg:px-28">


        <p className="text-white text-xs leading-loose mb-14" style={ts}>
          original paintings and prints.<br />
          shipped after purchase. inquiries via instagram dm.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 md:gap-x-10 md:gap-y-16">
          {shopItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              {/* クリックで拡大 */}
              <button
                onClick={() => setLightbox({ src: item.src, alt: item.title })}
                className="relative w-full overflow-hidden bg-white/10 cursor-zoom-in block"
                style={{ border: "none", padding: 0 }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 40vw, 28vw"
                  className="w-full h-auto transition-opacity duration-300 hover:opacity-80"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <span className="text-white text-xs" style={ts}>sold out</span>
                  </div>
                )}
              </button>

              {/* Info */}
              <div className="flex flex-col gap-1" style={ts}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-white text-xs leading-snug">{item.title}</span>
                  <span className="text-white text-xs shrink-0">¥{item.price.toLocaleString()}</span>
                </div>
                <p className="text-white text-[10px] leading-relaxed">
                  {item.medium}<br />{item.size} / {item.year}
                </p>
                {item.inStock && (
                  <div className="mt-1">
                    <ShopCheckoutButton priceId={item.priceId} label="purchase" />
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
