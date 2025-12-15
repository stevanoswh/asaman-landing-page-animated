// components/sections/GlobalImpactSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const IMPACT_ITEMS = [
  {
    metric: "99.9% PLATFORM UPTIME",
    subtitle: "System Reliability",
    description:
      "Reliable, high-performance service for school-wide operations demonstrating technical maturity and trustworthiness for principals and IT directors.",
  },
  {
    metric: "90%+ SAME-DAY PAYMENT COMPLETION",
    subtitle: "Parent Engagement Metrics",
    description:
      "Smooth, hassle-free sign-ups and payments that improve overall parent engagement and convenience.",
  },
  {
    metric: "5–10 HOURS SAVED WEEKLY",
    subtitle: "Operational Impact For Schools",
    description:
      "Real, measurable time savings per coordinator based on modern operational workflows across schools.",
  },
  {
    metric: "Security & Compliance",
    subtitle: "Security & Data Protection",
    description:
      "Aligned with PIPL, ISO, SOC-2, and best-practice global standards for safe, compliant school operations.",
  },
];

type ImpactItem = (typeof IMPACT_ITEMS)[number];

export function GlobalImpactSection() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  const [showHeading, setShowHeading] = useState(false);
  const [showRow1, setShowRow1] = useState(false);
  const [showRow2, setShowRow2] = useState(false);

  useEffect(() => {
    const checkInCenter = (
      el: HTMLDivElement | null,
      setter: (v: boolean) => void
    ) => {
      if (!el) return;
      if (typeof window === "undefined") return;

      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      // dianggap "di tengah" kalau jarak ke center < 25% tinggi viewport
      const threshold = window.innerHeight * 0.25;

      if (Math.abs(elementCenter - viewportCenter) <= threshold) {
        setter(true);
      }
    };

    const handleScroll = () => {
      checkInCenter(headingRef.current, setShowHeading);
      checkInCenter(row1Ref.current, setShowRow1);
      checkInCenter(row2Ref.current, setShowRow2);
    };

    // initial cek + listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Badge + heading + subheading */}
        <div
          ref={headingRef}
          className={[
            "flex flex-col items-center text-center opacity-0",
            showHeading ? "animate-slide-up-fade" : "",
          ].join(" ")}
        >
          <span className="inline-flex items-center rounded-full bg-[#02A7CF] px-8 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg">
            Proven Results
          </span>

          <h2 className="mt-6 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Our <span className="text-[#008cb4]">Global</span> Impact
          </h2>

          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base md:leading-relaxed">
            Trusted by schools worldwide delivering meaningful impact through
            smarter operations.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="mt-12 divide-y divide-slate-200">
          {/* row 1 */}
          <div
            ref={row1Ref}
            className="grid gap-10 py-10 md:grid-cols-2 md:divide-x md:divide-slate-200"
          >
            {IMPACT_ITEMS.slice(0, 2).map((item, index) => (
              <ImpactCard
                key={item.metric}
                item={item}
                index={index}
                active={showRow1}
              />
            ))}
          </div>

          {/* row 2 */}
          <div
            ref={row2Ref}
            className="grid gap-10 py-10 md:grid-cols-2 md:divide-x md:divide-slate-200"
          >
            {IMPACT_ITEMS.slice(2, 4).map((item, index) => (
              <ImpactCard
                key={item.metric}
                item={item}
                index={index + 2}
                active={showRow2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactCard({
  item,
  index,
  active,
}: {
  item: ImpactItem;
  index: number;
  active: boolean;
}) {
  const baseDelay = index * 120; // stagger antar CARD

  return (
    <div
      className="
        flex flex-col items-center px-4 text-center
        transform transition-transform duration-200 ease-out
        hover:scale-[1.05] hover:-translate-y-1
      "
    >
      {/* metric */}
      <h3
        className={[
          "text-base font-semibold tracking-[0.02em] text-slate-900 md:text-lg opacity-0",
          active ? "animate-slide-up-fade" : "",
        ].join(" ")}
        style={{
          animationDelay: active ? `${baseDelay}ms` : undefined,
        }}
      >
        {item.metric}
      </h3>

      {/* subtitle */}
      <p
        className={[
          "mt-3 text-sm font-semibold text-[#008cb4] opacity-0",
          active ? "animate-slide-up-fade" : "",
        ].join(" ")}
        style={{
          animationDelay: active ? `${baseDelay + 100}ms` : undefined,
        }}
      >
        {item.subtitle}
      </p>

      {/* description */}
      <p
        className={[
          "mt-3 max-w-md text-sm leading-relaxed text-slate-600 opacity-0",
          active ? "animate-slide-up-fade" : "",
        ].join(" ")}
        style={{
          animationDelay: active ? `${baseDelay + 200}ms` : undefined,
        }}
      >
        {item.description}
      </p>
    </div>
  );
}
