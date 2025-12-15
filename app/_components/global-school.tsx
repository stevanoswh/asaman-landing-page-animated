// components/sections/GlobalSchoolsSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PINS = [
  {
    src: "/pin-map/1.png", // Cross-Platform Access
    position: "left-[12.5%] top-[9.5%]",
  },
  {
    src: "/pin-map/2.png", // Cloud-Based Architecture
    position: "left-[44.2%] top-[12%]",
  },
  {
    src: "/pin-map/3.png", // Multilingual Interface
    position: "left-[34.2%] top-[43%] -translate-x-1/2",
  },
  {
    src: "/pin-map/4.png", // Compliance-Ready
    position: "right-[7.8%] bottom-[12%]",
  },
];

export function GlobalSchoolsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(false);
  const [mapScale, setMapScale] = useState(0.75); // mulai kecil

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;

      const sectionEl = sectionRef.current;
      if (sectionEl) {
        const sectionRect = sectionEl.getBoundingClientRect();
        const triggerLine = window.innerHeight * 0.6;
        if (sectionRect.top <= triggerLine) {
          setActive(true);
        }
      }

      // === SCROLL-BASED SCALE UNTUK MAP (RELATIF TERHADAP POSISI MAP) ===
      const mapEl = mapWrapperRef.current;
      if (!mapEl) return;

      const rect = mapEl.getBoundingClientRect();
      const vh = window.innerHeight;

      // Kita definisikan:
      // - scale mulai 0.75 ketika top map masih di bawah layar (rect.top ~ vh)
      // - scale jadi 1.0 ketika top map sudah naik ke sekitar 30% tinggi layar
      const start = vh;          // top map di bawah viewport
      const end = vh * 0.3;      // top map di sekitar 30% viewport

      let t: number;
      if (rect.top >= start) {
        t = 0;                   // belum kelihatan → skala minimal
      } else if (rect.top <= end) {
        t = 1;                   // sudah naik cukup tinggi → skala penuh
      } else {
        // interpolasi linier antara start dan end
        t = (start - rect.top) / (start - end);
      }

      const minScale = 0.75;
      const maxScale = 1.0;
      const scale = minScale + (maxScale - minScale) * t;

      setMapScale(scale);
    };

    // initial + listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const d = (ms: number) => (active ? { animationDelay: `${ms}ms` } : {});

  return (
    <section className="bg-white py-24">
      <div ref={sectionRef} className="mx-auto max-w-6xl px-6">
        {/* Badge */}
        <div className="flex justify-center">
          <span
            className={[
              "inline-flex items-center rounded-full bg-[#02A7CF] px-6 py-2 text-sm font-semibold text-white shadow-md opacity-0",
              active ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={d(0)}
          >
            Global
          </span>
        </div>

        {/* Heading + subheading */}
        <div className="mt-6 text-center">
          <h2
            className={[
              "text-3xl font-semibold leading-tight text-slate-900 md:text-[36px] opacity-0",
              active ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={d(120)}
          >
            Built for <span className="text-[#008cb4]">Global Schools</span>
          </h2>
          <p
            className={[
              "mt-4 text-sm leading-relaxed text-slate-600 md:text-base opacity-0",
              active ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={d(220)}
          >
            A platform built to support schools worldwide with reliable,
            scalable, and seamless operations.
          </p>
        </div>

        {/* DESKTOP / TABLET: map + PNG pin */}
        <div className="mt-12 hidden md:block">
          <div
            ref={mapWrapperRef}
            className="relative mx-auto max-w-4xl"
          >
            {/* world map – hero-style: naik + scale scroll */}
            <div
              className={[
                "relative h-auto w-full opacity-0",
                active ? "animate-hero-rise" : "",
              ].join(" ")}
              style={active ? { animationDelay: "260ms" } : undefined}
            >
              {/* inner: scale via scroll */}
              <div
                className="relative h-auto w-full overflow-visible"
                style={{
                  transform: `scale(${mapScale})`,
                  transformOrigin: "center bottom",
                  transition: "transform 0.18s ease-out",
                }}
              >
                <Image
                  src="/map.png"
                  alt="Global schools map"
                  width={1200}
                  height={350}
                  className="h-auto w-full object-contain drop-shadow-[0_40px_80px_rgba(15,23,42,0.25)]"
                  priority
                />
              </div>
            </div>

            {/* PNG pin overlays – agresif dari bawah */}
            {PINS.map((pin, index) => (
              <div
                key={pin.src}
                className={[
                  "absolute opacity-0",
                  active ? "animate-pin-pop" : "",
                  pin.position,
                ].join(" ")}
                style={d(380 + index * 140)}
              >
                <div className="relative h-32 w-64">
                  <Image
                    src={pin.src}
                    alt={`Global feature ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE: list biasa untuk pin */}
        <div className="mt-10 grid gap-4 md:hidden">
          {PINS.map((pin, index) => (
            <div
              key={pin.src}
              className={[
                "flex justify-center opacity-0",
                active ? "animate-pin-pop" : "",
              ].join(" ")}
              style={d(300 + index * 120)}
            >
              <div className="relative h-24 w-full max-w-md">
                <Image
                  src={pin.src}
                  alt={`Global feature ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
