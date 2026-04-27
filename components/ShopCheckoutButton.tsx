"use client";

import { useState } from "react";

interface Props {
  priceId: string;
  shippingRateId?: string;
  label?: string;
}

export default function ShopCheckoutButton({ priceId, shippingRateId, label = "購入する" }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, shippingRateId }),
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
      className="w-full h-10 border text-xs transition-opacity duration-300 hover:opacity-60 disabled:opacity-30"
      style={{ borderColor: "rgba(255,255,255,0.7)", color: "rgba(255,255,255,0.85)", background: "none", cursor: loading ? "wait" : "pointer", fontFamily: "'Courier New', Courier, monospace" }}
    >
      {loading ? "..." : label}
    </button>
  );
}
