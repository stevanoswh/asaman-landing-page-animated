// app/components/HomeHero.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HomeHero() {
  const [baseScale, setBaseScale] = useState(0.75); // scale dari scroll
  const [isHovered, setIsHovered] = useState(false); // scale extra dari hover

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 300; // range scroll yang kita pakai
      const y = window.scrollY;
      const clamped = Math.min(Math.max(y, 0), maxScroll);
      const t = clamped / maxScroll; // 0 → 1

      // scale: 0.75 di atas → 1.0 setelah scroll sekitar 300px
      const minScale = 0.75;
      const maxScale = 1.0;
      const nextScale = minScale + (maxScale - minScale) * t;

      setBaseScale(nextScale);
    };

    // init
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // scale final = scroll * hoverFactor
  const hoverFactor = isHovered ? 1.05 : 1; // 5% membesar saat hover
  const cardScale = baseScale * hoverFactor;

  return (
    <section className="relative h-[900px] w-full overflow-hidden bg-black text-white">
      {/* === BACKGROUND PAKAI PNG === */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/background-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-top"
        />

        <Image
          src="/background-layer-2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-top"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom," +
              "rgba(0,0,0,0) 0%," +
              "rgba(0,0,0,0) 25%," +
              "rgba(0,0,0,0) 50%," +
              "rgba(0,0,0,0) 75%," +
              "rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to bottom," +
              "rgba(0,0,0,0) 0%," +
              "rgba(0,0,0,0) 25%," +
              "rgba(0,0,0,0) 50%," +
              "rgba(0,0,0,0) 75%," +
              "rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      {/* === FOREGROUND CONTENT === */}
      <div className="relative mx-auto flex min-h-[900px] max-w-6xl flex-col items-center px-5 pb-24 pt-40">
        {/* Headline + CTA */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1
            className="
              max-w-4xl
              text-3xl md:text-5xl lg:text-[48px]
              font-bold
              leading-snug md:leading-[56px] lg:leading-[58px]
              opacity-0 animate-pop-in [animation-delay:40ms]
            "
          >
            <span className="bg-gradient-to-r from-white via-white-5 to-white/10 bg-clip-text text-transparent">
              Operational Intelligence That Connects
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-white-5 to-white/10 bg-clip-text text-transparent">
              Schools, Parents &amp; Providers
            </span>
          </h1>

          <button
            type="button"
            className="
              mt-2 inline-flex items-center justify-center
              rounded-full bg-[#1895AF]
              px-[25px] py-[15px]
              text-[16px] font-semibold leading-[19px]
              shadow-[0_0_0_1px_rgba(255,255,255,0.2)]
              transition-colors hover:bg-[#16A3BF]
              opacity-0 animate-pop-in [animation-delay:140ms]
            "
          >
            Get To Know Us
          </button>
        </div>

        {/* Card dashboard */}
        <div className="relative mt-16 w-full max-w-5xl">
          {/* wrapper: animasi naik dari bawah waktu pertama kali muncul */}
          <div className="relative opacity-0 animate-hero-rise">
            {/* inner: efek scale karena scroll + hover */}
            <div
              className="
                relative overflow-hidden
                rounded-3xl border border-white/80 bg-white
              "
              style={{
                transform: `scale(${cardScale})`,
                transformOrigin: "center bottom",
                transition: "transform 0.18s ease-out",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src="/hero-image.png"
                alt="Asaman dashboard preview"
                width={1200}
                height={720}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
