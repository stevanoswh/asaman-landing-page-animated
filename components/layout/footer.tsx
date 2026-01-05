// components/sections/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = ["Home", "Discovr Pro", "App Features", "Privacy Policy"];
const infoLinks = ["Privacy Policy", "Terms & Condition"];

// mapping route untuk item yang kamu minta
const ROUTES: Record<string, string> = {
  "Privacy Policy": "/privacy-policy/1-terms-of-services",
  "Terms & Condition": "/terms-condition",
};

export function Footer() {
  // refs per blok
  const headingRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLSpanElement | null>(null);

  const [showHeading, setShowHeading] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [showBottom, setShowBottom] = useState(false);
  const [showGlobe, setShowGlobe] = useState(false);
  const [showWatermark, setShowWatermark] = useState(false);

  useEffect(() => {
    const checkInCenter = (
      el: HTMLElement | null,
      setter: (v: boolean) => void
    ) => {
      if (!el || typeof window === "undefined") return;

      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const threshold = window.innerHeight * 0.25; // ±25% dari tengah

      if (Math.abs(elementCenter - viewportCenter) <= threshold) {
        setter(true); // trigger sekali
      }
    };

    const handleScroll = () => {
      checkInCenter(headingRef.current, setShowHeading);
      checkInCenter(columnsRef.current, setShowColumns);
      checkInCenter(lineRef.current, setShowBottom);
      checkInCenter(copyRef.current, setShowBottom);
      checkInCenter(globeRef.current, setShowGlobe);
      checkInCenter(watermarkRef.current, setShowWatermark);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // helper delay
  const dh = (active: boolean, ms: number) =>
    active ? { animationDelay: `${ms}ms` } : {};

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="relative border-t border-transparent bg-gradient-to-b from-[#0e1820] via-black to-black">
        {/* Dots background */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:16px_16px]" />
        </div>

        {/* Glow kiri bawah */}
        <div className="pointer-events-none absolute left-[140px] top-[-180px] h-[430px] w-[700px] rounded-full bg-[#5BB2C3]/60 blur-[90px]" />

        {/* Glow biru belakang globe kanan */}
        <div className="pointer-events-none absolute right-[-40px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#23358F]/70 blur-[90px]" />
        <div className="pointer-events-none absolute right-[140px] top-[-200px] h-[420px] w-[420px] rotate-[22deg] rounded-full bg-[#23358F]/70 blur-[90px]" />

        {/* Globe: slide dari bawah + spin */}
        <div
          ref={globeRef}
          className={[
            "pointer-events-none absolute right-[160px] top-[-180px] h-[420px] w-[420px] opacity-0",
            showGlobe ? "animate-slide-up-fade" : "",
          ].join(" ")}
          style={dh(showGlobe, 0)}
        >
          <div className="relative h-full w-full animate-globe-spin">
            <Image
              src="/footer-globe.svg"
              alt="Asaman global coverage"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* ================== TOP TEXT (headline) ================== */}
        <div
          ref={headingRef}
          className={[
            "relative mx-auto flex max-w-6xl flex-col gap-6 px-6 pt-16 pb-6 opacity-0",
            showHeading ? "animate-slide-up-fade" : "",
          ].join(" ")}
          style={dh(showHeading, 0)}
        >
          <h2 className="max-w-xl text-[42px] font-semibold leading-[51px] uppercase">
            ONE PLATFORM EVERY ACTIVITY
          </h2>

          <p className="max-w-md text-[16px] leading-[19px] text-white/80">
            Asaman empowers schools with smarter tools to manage attendance,
            activities, communication, and parent engagement all in one unified
            platform.
          </p>
        </div>

        {/* ================== MAIN FOOTER CONTENT ================== */}
        <div className="relative mx-auto mt-4 flex max-w-6xl flex-col gap-10 px-6 pb-10">
          <div
            ref={columnsRef}
            className={[
              "flex flex-col gap-10 md:flex-row md:items-start md:justify-between opacity-0",
              showColumns ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(showColumns, 120)}
          >
            {/* Kiri: logo + tagline + social */}
            <div className="flex w-full max-w-sm flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/asaman-logo.svg"
                    alt="Asaman"
                    width={115}
                    height={48}
                  />
                </div>
                <p className="text-[16px] italic leading-[19px] text-white">
                  “A modern school operations platform”
                </p>
              </div>

              <div className="flex items-center gap-4">
                {["F", "IG", "in"].map((label) => (
                  <button
                    key={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-white/20 to-white/20 text-xs font-semibold text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tengah: Navigation + Information */}
            <div className="flex flex-1 flex-wrap gap-18 text-[16px] leading-[19px]">
              <div className="flex md:gap-1">
                {/* Navigation */}
                <div className="flex min-w-[140px] flex-1 flex-col gap-3">
                  <h4 className="text-[16px] font-semibold">Navigation</h4>
                  <ul className="flex flex-col gap-3 text-white/90">
                    {navLinks.map((item) => (
                      <li key={item}>
                        {ROUTES[item] ? (
                          <Link href={ROUTES[item]} className="hover:text-white">
                            {item}
                          </Link>
                        ) : (
                          <a href="#" className="hover:text-white">
                            {item}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Information */}
                <div className="flex min-w-[140px] flex-1 flex-col gap-3">
                  <h4 className="text-[16px] font-semibold">Information</h4>
                  <ul className="flex flex-col gap-3 text-white/90">
                    {infoLinks.map((item) => (
                      <li key={item}>
                        {ROUTES[item] ? (
                          <Link href={ROUTES[item]} className="hover:text-white">
                            {item}
                          </Link>
                        ) : (
                          <a href="#" className="hover:text-white">
                            {item}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Newsletter */}
              <div className="flex min-w-[140px] max-w-sm flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-[16px] font-semibold uppercase">
                    News Letter
                  </h4>
                  <p className="max-w-[315px] text-[16px] leading-[19px] text-white/85">
                    Subscribe our newsletter to get our latest update &amp; news
                  </p>
                </div>

                <form className="mt-2 flex items-center gap-2">
                  <div className="flex h-[50px] flex-1 items-center justify-between rounded-[16px] bg-gradient-to-r from-white/20 to-white/20 px-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-transparent text-[16px] leading-[19px] text-white placeholder:text-white/70 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06748A]"
                    >
                      <span className="text-sm">➤</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Line */}
          <div
            ref={lineRef}
            className={[
              "mt-4 h-px w-full border-t border-white/50 opacity-0",
              showBottom ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(showBottom, 80)}
          />

          {/* Copyright */}
          <div
            ref={copyRef}
            className={[
              "flex justify-center pb-40 text-[14px] font-medium leading-[17px] text-white opacity-0",
              showBottom ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(showBottom, 180)}
          >
            © 2025 Asaman. All rights reserved.
          </div>
        </div>

        {/* Watermark besar "Asaman" */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[-100px] flex justify-center">
          <span
            className="select-none text-[270px] font-normal leading-[327px] bg-gradient-to-b from-white/50 to-transparent bg-clip-text text-transparent opacity-0 animate-pop-in"
            style={{ animationDelay: "1000ms" }}
          >
            Asaman
          </span>
        </div>
      </div>
    </footer>
  );
}
