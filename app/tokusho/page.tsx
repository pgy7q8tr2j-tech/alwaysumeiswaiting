"use client";

import PhotoBackground from "@/components/PhotoBackground";
import HomeButton from "@/components/HomeButton";

const mono = { fontFamily: "'Courier New', Courier, monospace" };
const ts   = { ...mono, textShadow: "0 1px 6px rgba(0,0,0,0.6)" };

const items = [
  { label: "販売業者",           value: "cn1046hb9an0o42（氏名は請求があった場合は遅滞なく開示します）" },
  { label: "運営責任者",         value: "cn1046hb9an0o42（氏名は請求があった場合は遅滞なく開示します）" },
  { label: "所在地",             value: "東京都練馬区（詳細住所は請求があった場合に速やかに開示いたします）" },
  { label: "電話番号",           value: "090-6653-5580（対応時間：メール・Instagram DMにて随時受付）" },
  { label: "メールアドレス",     value: "cn1046hb9an0o42@icloud.com（随時受付、数日以内にご返信）" },
  { label: "Instagram",         value: "@cn1046hb9an0o42（DM随時受付、数日以内にご返信）" },
  { label: "販売URL",            value: "https://cn1046hb9an0o42.vercel.app" },
  { label: "販売価格",           value: "各商品・サービスページに記載の価格（消費税込み）" },
  { label: "商品代金以外の費用", value: "なし（配送が必要な場合は別途送料をご案内します）" },
  { label: "支払方法",           value: "クレジットカード（Stripe決済）" },
  { label: "支払時期",           value: "注文時にお支払いいただきます" },
  { label: "引渡し時期",         value: "タトゥー施術：予約確定後、施術当日。絵画・プリント：ご入金確認後、順次発送。" },
  { label: "返品・キャンセル",   value: "予約金は理由の如何を問わず返金いたしません。商品（絵画・プリント）は商品の性質上、返品・交換はお受けできません。ただし、商品に明らかな欠陥がある場合は cn1046hb9an0o42@icloud.com までご連絡ください。" },
];

export default function TokushoPage() {
  return (
    <PhotoBackground overlay={40}>
      <HomeButton />
      <div className="min-h-screen px-7 pt-20 pb-24 md:px-14 max-w-xl">
        <h1 className="text-white text-sm mb-10" style={ts}>
          特定商取引法に基づく表記
        </h1>

        <div className="flex flex-col gap-8">
          {items.map(({ label, value }) => (
            <div key={label}>
              <p className="text-white text-[10px] mb-1" style={{ ...ts, opacity: 0.6 }}>
                {label}
              </p>
              <p className="text-white text-[11px] leading-relaxed" style={ts}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PhotoBackground>
  );
}
