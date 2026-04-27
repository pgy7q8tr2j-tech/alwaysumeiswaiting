"use client";

import { useState } from "react";

interface Props {
  priceId: string;
  shippingRateId?: string;
  label?: string;
}

export default function ShopCheckoutButton({ priceId, shippingRateId, label = "購入する" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, shippingRateId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "error");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full h-10 border text-xs transition-opacity duration-300 hover:opacity-60 disabled:opacity-30"
        style={{ borderColor: "rgba(255,255,255,0.7)", color: "rgba(255,255,255,0.85)", background: "none", cursor: loading ? "wait" : "pointer", fontFamily: "'Courier New', Courier, monospace" }}
      >
        {loading ? "..." : label}
      </button>
      {error && (
        <span style={{ color: "rgba(255,100,100,0.9)", fontSize: 10, fontFamily: "'Courier New', Courier, monospace" }}>
          {error}
        </span>
      )}
    </div>
  );
}
