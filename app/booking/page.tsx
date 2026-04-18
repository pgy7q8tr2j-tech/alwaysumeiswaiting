"use client";

import PhotoBackground from "@/components/PhotoBackground";
import BookingDepositButton from "@/components/BookingDepositButton";
import HomeButton from "@/components/HomeButton";

const mono = { fontFamily: "'Courier New', Courier, monospace" };
const ts   = { ...mono, textShadow: "0 1px 6px rgba(0,0,0,0.7)" };

const steps = [
  { num: "01", title: "instagram dm",    desc: "希望のデザイン・部位・サイズをDMでお知らせください。" },
  { num: "02", title: "デザイン相談",      desc: "DMにてデザインの詳細を詰めます。flash / customどちらでも対応します。" },
  { num: "03", title: "日程確定",          desc: "空き状況を確認のうえ、施術日程を確定します。" },
  { num: "04", title: "deposit payment", desc: "日程確定後、下の決済リンクから予約金をお支払いください。お支払いをもって予約確定となります。" },
];

export default function BookingPage() {
  return (
    <PhotoBackground overlay={32}>
      <HomeButton />
      <div className="min-h-screen px-7 pt-20 pb-24 md:px-14">

        <div className="fixed top-6 right-6 z-40">
          <span className="text-white text-sm" style={ts}>booking</span>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-9 mb-16 max-w-sm">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-5">
              <span className="text-white text-xs shrink-0 pt-0.5" style={ts}>
                {step.num}
              </span>
              <div>
                <h2 className="text-white text-xs mb-2" style={ts}>{step.title}</h2>
                <p className="text-white text-[11px] leading-relaxed" style={ts}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 max-w-sm">
          <a
            href="https://www.instagram.com/alwaysumeiswaiting/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-12 border border-white text-white text-xs transition-opacity duration-300 hover:opacity-60"
            style={ts}
          >
            open instagram dm
          </a>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-white text-[10px]" style={ts}>after scheduling</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          <BookingDepositButton />
        </div>

        <p className="mt-8 text-white text-[10px] leading-loose max-w-sm" style={ts}>
          ※ 予約金はキャンセルの場合、返金いたしません。<br />
          ※ 施術代金から予約金を差し引いた金額を当日お支払いください。
        </p>
      </div>
    </PhotoBackground>
  );
}
