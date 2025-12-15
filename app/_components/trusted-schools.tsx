// components/sections/TrustedSchoolsStrip.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const SCHOOLS = [
  { name: "Metro High School", icon: "🎓", highlight: true },
  { name: "Metro High School", icon: "🎓", highlight: false },
  { name: "Oakwood Elementary", icon: "📘", highlight: false },
  { name: "Oakwood Elementary", icon: "📘", highlight: false },
  { name: "Oakwood Elementary", icon: "📘", highlight: false },
];

export function TrustedSchoolsStrip() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || typeof window === "undefined") return;

      const rect = sectionRef.current.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.6; // kira2 60% tinggi layar

      if (rect.top <= triggerLine) {
        setActive(true);
      }
    };

    // initial + listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const d = (ms: number) => (active ? { animationDelay: `${ms}ms` } : {});

  return (
    <section className="bg-white py-16">
      <div ref={sectionRef} className="mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <span
          className={[
            "inline-flex items-center rounded-full bg-[#02A7CF] px-8 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg opacity-0",
            active ? "animate-slide-up-fade" : "",
          ].join(" ")}
          style={d(0)}
        >
          They Trusted Us
        </span>

        {/* Heading */}
        <h2
          className={[
            "mt-6 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl opacity-0",
            active ? "animate-slide-up-fade" : "",
          ].join(" ")}
          style={d(120)}
        >
          What Schools Are Saying
        </h2>

        {/* Marquee strip */}
        <div
          className={[
            "relative mt-8 w-full overflow-hidden opacity-0",
            active ? "animate-slide-up-fade" : "",
          ].join(" ")}
          style={d(220)}
        >
          {/* Fade kiri-kanan */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex min-w-max animate-marquee-left items-center gap-10">
            {/* Duplikasi list biar loop-nya mulus */}
            {[...SCHOOLS, ...SCHOOLS].map((school, idx) => (
              <div
                key={`${school.name}-${idx}`}
                className="flex items-center gap-2 text-base"
              >
                <span
                  className={
                    school.highlight
                      ? "text-[22px] text-orange-500"
                      : "text-[22px] text-slate-400"
                  }
                >
                  {school.icon}
                </span>
                <span
                  className={
                    school.highlight
                      ? "font-semibold text-slate-900"
                      : "font-semibold text-slate-500"
                  }
                >
                  {school.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
