"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/works", label: "WORKS" },
  { href: "/flash", label: "FLASH" },
  { href: "/shop", label: "SHOP" },
  { href: "/about", label: "ABOUT" },
  { href: "/booking", label: "BOOKING" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <Link
        href="/"
        className="text-xs tracking-[0.25em] font-light text-paper opacity-80 hover:opacity-100 transition-opacity duration-500"
        style={{ color: "var(--paper)" }}
      >
        alwaysumeiswaiting
      </Link>
      <nav className="flex gap-8">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-xs tracking-[0.2em] font-light transition-opacity duration-500"
            style={{
              color: "var(--paper)",
              opacity: pathname === href ? 1 : 0.5,
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
