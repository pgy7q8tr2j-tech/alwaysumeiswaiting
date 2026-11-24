// days ページに並べる写真。
//
// 背景（public/images/gallery/）に使っている写真は、すべて days にも表示されます。
// days だけに載せる写真は public/images/days/ に置いて、下の配列に足してください。
import { galleryImages } from "./gallery";

// days 専用（背景には使わない写真）
const daysOnlyPhotos: string[] = [
  "/images/days/0F2766D1-97D2-445A-B9E1-9F684819CA3F.jpg",
  "/images/days/54FA3C0F-ACAF-4059-94CB-AAD7F2D62956.jpg",
  "/images/days/9F93A0B4-AE13-4748-9EA5-1AF230AE2B49.jpg",
  "/images/days/IMG_5281.jpg",
  "/images/days/IMG_6267.jpg",
  "/images/days/IMG_7678.jpg",
];

export const daysPhotos: string[] = [...galleryImages, ...daysOnlyPhotos];
