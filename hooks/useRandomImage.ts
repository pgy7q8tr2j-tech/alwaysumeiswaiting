"use client";

import { useState, useEffect } from "react";
import { galleryImages, pickRandom, pickRandomN } from "@/lib/gallery";

/** Returns a single random gallery image (client-side, changes each visit) */
export function useRandomImage(): string {
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(pickRandom(galleryImages));
  }, []);
  return image;
}

/** Returns N unique random gallery images */
export function useRandomImages(n: number): string[] {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    setImages(pickRandomN(n, galleryImages));
  }, [n]);
  return images;
}
