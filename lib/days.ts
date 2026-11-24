// days ページに並べる写真。
//
// 写真を追加するとき：
//   1. public/images/days/ に画像ファイルを置く
//   2. 下の配列に "/images/days/ファイル名.jpg" を足す
//
// 現在は背景に使っている写真（public/images/gallery/）をそのまま表示しています。
// days 専用の写真に差し替える場合は、この配列を書き換えてください。
import { galleryImages } from "./gallery";

export const daysPhotos: string[] = [...galleryImages];
