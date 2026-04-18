"use client";

import { useState } from "react";

export default function BookingDepositButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking-deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}
