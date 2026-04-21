"use client";

import { useState } from "react";

export default function BookingDepositButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/booking-deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "エラーが発生しました");
      }
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full h-12 border text-xs transition-opacity duration-300 hover:opacity-60 disabled:opacity-30"
        style={{
          borderColor: "rgba(255,255,255,0.7)",
          color: "rgba(255,255,255,0.85)",
          background: "none",
          cursor: loading ? "wait" : "pointer",
          fontFamily: "'Courier New', Courier, monospace",
        }}
      >
        {loading ? "..." : "pay deposit  ¥5,000"}
      </button>
      {error && (
        <p className="text-red-400 text-[10px] text-center" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
          {error}
        </p>
      )}
    </div>
  );
}
