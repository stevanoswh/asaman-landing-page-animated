"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/#top", label: "Home" },
  { href: "/#find-your-school", label: "Find Your School" },
  { href: "/#features", label: "Features" },
  { href: "/#innovations", label: "Innovations" },
  { href: "/#help-guides", label: "Help Guides" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // active state for Contact Us page
  const isContactActive = pathname === "/contact-us";

  // NOTE: pathname doesn't include hash, so nav items won't be "active" by section with this function.
  // If you want active-by-scroll, we can add scroll-spy later.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="absolute inset-x-0 top-0 z-50 animate-nav-drop will-change-transform">
      <div className="mx-auto grid h-24 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-6 px-5 md:px-20">
        {/* Logo */}
        <Link href="/#top" className="flex items-center gap-3">
          <Image
            src="/asaman-logo.png"
            alt="Asaman"
            width={115}
            height={49}
            priority
          />
        </Link>

        {/* Desktop menu (center column) */}
        <nav className="hidden justify-center md:flex">
          <div
            className="
              inline-flex rounded-[54px] p-[1px]
              shadow-[0_0_0_1px_rgba(2,167,207,0.25)]
            "
          >
            <div
              className="
                flex items-center gap-2 rounded-[54px] px-4 py-2
                bg-[linear-gradient(90deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.075)_100%)]
                backdrop-blur-md
              "
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    // default = blue text
                    "text-[#06748A]",
                    // keep hover same
                    "hover:bg-white/20",
                    // (optional) if user is currently on "/", you can highlight "Home" only.
                    // But since these are hash links, active-by-section needs scroll-spy.
                    // We'll leave your style unchanged.
                    isActive(item.href) ? "bg-[#06748A] text-white shadow-sm" : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right column: Contact (desktop) + Hamburger (mobile) */}
        <div className="flex items-center justify-end gap-3">
          {/* Contact Us pill (Frame 35) - desktop */}
          <Link
            href="/contact-us"
            className={[
              "hidden md:flex items-center rounded-[54px] px-5 py-3 text-sm font-semibold transition backdrop-blur-md",
              isContactActive
                ? "bg-[#06748A] text-white shadow-sm"
                : `
                  text-[#06748A]
                  bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.05)_100%)]
                  hover:bg-white/10
                `,
            ].join(" ")}
          >
            Contact Us
          </Link>

          {/* Mobile: hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 md:hidden bg-white/10 backdrop-blur-md"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="space-y-1">
              <span className="block h-[2px] w-5 bg-white" />
              <span className="block h-[2px] w-5 bg-white" />
            </div>
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="absolute left-0 right-0 top-24 mx-4 rounded-2xl bg-white/95 p-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "w-full rounded-full px-4 py-3 text-sm font-medium transition",
                    // keep your original mobile behavior
                    isActive(item.href)
                      ? "bg-[#06748A] text-white"
                      : "text-[#06748A] hover:bg-slate-100",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/contact-us"
                onClick={() => setOpen(false)}
                className={[
                  "mt-2 w-full rounded-full px-4 py-3 text-center text-sm font-semibold transition",
                  isContactActive
                    ? "bg-[#06748A] text-white"
                    : "bg-[#06748A] text-white",
                ].join(" ")}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
