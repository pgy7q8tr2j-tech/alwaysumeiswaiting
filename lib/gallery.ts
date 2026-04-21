// public/images/gallery/ に実在するファイルのみ列挙。
// 低解像度（1179px幅以下）の画像は除外済み。
// 画像を追加・削除する場合は public/images/gallery/ のファイルと合わせて編集してください。
export const galleryImages = [
  "/images/gallery/DSC00717.jpg",
  "/images/gallery/IMG_1492.jpg",
  "/images/gallery/IMG_1663.jpg",
  "/images/gallery/IMG_2003.jpg",
  "/images/gallery/IMG_2196.jpg",
  "/images/gallery/IMG_2714.jpg",
  "/images/gallery/IMG_3243.jpg",
  "/images/gallery/IMG_3341.jpg",
  "/images/gallery/IMG_3989.jpg",
  "/images/gallery/IMG_4019.jpg",
  "/images/gallery/IMG_4287.jpg",
  "/images/gallery/IMG_4520.jpg",
  "/images/gallery/IMG_4951.jpg",
  "/images/gallery/IMG_4998.jpg",
  "/images/gallery/IMG_6268.jpg",
  "/images/gallery/IMG_6736.jpg",
  "/images/gallery/IMG_6743.jpg",
  "/images/gallery/IMG_6965.jpg",
  "/images/gallery/IMG_7053.jpg",
  "/images/gallery/IMG_7696.jpg",
  "/images/gallery/IMG_8116.jpg",
  "/images/gallery/IMG_8147.jpg",
  "/images/gallery/IMG_8231.jpg",
  "/images/gallery/IMG_8236.jpg",
  "/images/gallery/IMG_8254.jpg",
  "/images/gallery/IMG_8348.jpg",
  "/images/gallery/IMG_8444.jpg",
  "/images/gallery/IMG_8822.jpg",
  "/images/gallery/IMG_8956.jpg",
  "/images/gallery/IMG_5137.jpg",
  "/images/gallery/IMG_5138.jpg",
  "/images/gallery/IMG_9726.jpg",
  "/images/gallery/IMG_9781.jpg",
];

export function pickRandom(images: string[] = galleryImages): string {
  return images[Math.floor(Math.random() * images.length)];
}

/** Picks N unique random images */
export function pickRandomN(n: number, images: string[] = galleryImages): string[] {
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
