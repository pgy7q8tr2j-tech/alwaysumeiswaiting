"use client";

import PhotoBackground from "@/components/PhotoBackground";
import HomeButton from "@/components/HomeButton";

const mono = { fontFamily: "'Courier New', Courier, monospace" };
const ts   = { ...mono, textShadow: "0 1px 6px rgba(0,0,0,0.6)" };

const sections = [
  {
    title: "1. 収集する個人情報",
    body: "当サービスでは、ご注文・予約の際に以下の情報を収集することがあります。\n・氏名\n・メールアドレス\n・お支払い情報（クレジットカード情報はStripeが管理し、当方は保持しません）\n・Instagram IDなど、お客様からご提供いただいた情報",
  },
  {
    title: "2. 利用目的",
    body: "収集した個人情報は、以下の目的で使用します。\n・ご注文・ご予約の確認および対応\n・商品の発送およびお届けの連絡\n・お問い合わせへの回答\n・サービスの改善および運営",
  },
  {
    title: "3. 第三者への提供",
    body: "当方は、以下の場合を除き、お客様の個人情報を第三者に提供しません。\n・お客様の同意がある場合\n・法令に基づく場合\n・決済処理のためにStripe, Inc.と情報を共有する場合（Stripeのプライバシーポリシーが適用されます）",
  },
  {
    title: "4. 決済について",
    body: "当サービスの決済はStripe, Inc.が提供するシステムを利用しています。クレジットカード情報は当方のサーバーには保存されず、Stripeによって安全に管理されます。",
  },
  {
    title: "5. Cookieの使用",
    body: "当サイトでは、サービス向上のためにCookieを使用することがあります。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。",
  },
  {
    title: "6. 個人情報の管理",
    body: "収集した個人情報は、不正アクセス・紛失・改ざん等が生じないよう適切に管理します。保存期間は法令の定めに従い、目的が達成された後は速やかに廃棄します。",
  },
  {
    title: "7. お問い合わせ",
    body: "個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。\nメール：cn1046hb9an0o42@icloud.com\nInstagram DM：@cn1046hb9an0o42",
  },
  {
    title: "8. プライバシーポリシーの変更",
    body: "本ポリシーは、必要に応じて予告なく変更することがあります。変更後のポリシーは、当ページへの掲載をもって効力を生じるものとします。",
  },
];

export default function PrivacyPage() {
  return (
    <PhotoBackground overlay={40}>
      <HomeButton />
      <div className="min-h-screen px-7 pt-20 pb-24 md:px-14 max-w-xl">
        <h1 className="text-white text-sm mb-2" style={ts}>
          プライバシーポリシー
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
