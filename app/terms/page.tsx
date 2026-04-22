"use client";

import PhotoBackground from "@/components/PhotoBackground";
import HomeButton from "@/components/HomeButton";

const mono = { fontFamily: "'Courier New', Courier, monospace" };
const ts   = { ...mono, textShadow: "0 1px 6px rgba(0,0,0,0.6)" };

const sections = [
  {
    title: "1. サービス内容",
    body: "当サービスでは、以下を提供しています。\n・タトゥー施術の予約受付（予約金のお支払い）\n・絵画・アートプリントの販売",
  },
  {
    title: "2. 利用条件",
    body: "当サービスは、日本国内にお住まいの18歳以上の方を対象としています。未成年の方によるタトゥー施術の予約はお受けできません。",
  },
  {
    title: "3. お支払い",
    body: "・支払方法：クレジットカード（Stripe決済）\n・支払時期：注文・予約時にお支払いいただきます\n・表示価格はすべて税込みです",
  },
  {
    title: "4. キャンセル・返金",
    body: "・タトゥー予約金：いかなる理由においても返金いたしません\n・絵画・アートプリント：商品の性質上、返品・交換はお受けできません\n・ただし、商品に明らかな欠陥がある場合は cn1046hb9an0o42@icloud.com までご連絡ください",
  },
  {
    title: "5. 商品の引渡し",
    body: "・タトゥー施術：予約確定後、施術当日に提供します\n・絵画・アートプリント：ご入金確認後、順次発送します\n・配送が必要な場合は別途送料をご案内します",
  },
  {
    title: "6. 禁止事項",
    body: "以下の行為を禁止します。\n・当サービスの不正利用\n・虚偽情報の提供\n・第三者への権利の譲渡・転売\n・その他、法令または公序良俗に反する行為",
  },
  {
    title: "7. 免責事項",
    body: "当方は、天災・通信障害・その他不可抗力による損害について責任を負いません。また、お客様の環境による閲覧上の問題についても責任を負いません。",
  },
  {
    title: "8. 準拠法・管轄",
    body: "本規約は日本法に準拠し、紛争が生じた場合は東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
  },
  {
    title: "9. お問い合わせ",
    body: "メール：cn1046hb9an0o42@icloud.com\nInstagram DM：@cn1046hb9an0o42",
  },
];

export default function TermsPage() {
  return (
    <PhotoBackground overlay={40}>
      <HomeButton />
      <div className="min-h-screen px-7 pt-20 pb-24 md:px-14 max-w-xl">
        <h1 className="text-white text-sm mb-2" style={ts}>
          利用規約
        </h1>
        <p className="text-white text-[10px] mb-10" style={{ ...ts, opacity: 0.6 }}>
          cn1046hb9an0o42 / TAI
        </p>

        <div className="flex flex-col gap-8">
          {sections.map(({ title, body }) => (
            <div key={title}>
              <p className="text-white text-[10px] mb-2" style={{ ...ts, opacity: 0.7 }}>
                {title}
              </p>
              <p className="text-white text-[11px] leading-relaxed whitespace-pre-line" style={ts}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PhotoBackground>
  );
}
