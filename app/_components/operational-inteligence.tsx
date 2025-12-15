// components/sections/OperationalIntelligenceSection.tsx
"use client";

import Image from "next/image";
import {
  CalendarCheck2,
  Users,
  BarChart4,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const FEATURES: FeatureItem[] = [
  {
    title: "Smart Scheduling",
    description:
      "AI-powered conflict detection ensures every class, room, and resource is perfectly aligned.",
    icon: CalendarCheck2,
  },
  {
    title: "Automated Attendance",
    description:
      "Keep parents and staff informed through automated alerts and updates.",
    icon: Users,
  },
  {
    title: "Instant Reporting",
    description:
      "Access powerful analytics that turn raw school data into meaningful insights.",
    icon: BarChart4,
  },
  {
    title: "Parent Communication",
    description:
      "Deliver clear, multilingual notifications that keep families engaged and informed.",
    icon: MessageCircle,
  },
];

export function OperationalIntelligenceSection() {
  const headingRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [headingActive, setHeadingActive] = useState(false);
  const [contentActive, setContentActive] = useState(false);

  useEffect(() => {
    const triggerLine = () => window.innerHeight * 0.6;

    const checkTrigger = (
      el: HTMLDivElement | null,
      setter: (v: boolean) => void
    ) => {
      if (!el || typeof window === "undefined") return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerLine()) {
        setter(true);
      }
    };

    const handleScroll = () => {
      checkTrigger(headingRef.current, setHeadingActive);
      checkTrigger(contentRef.current, setContentActive);
    };

    // initial
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dh = (ms: number) =>
    headingActive ? { animationDelay: `${ms}ms` } : {};
  const dc = (ms: number) =>
    contentActive ? { animationDelay: `${ms}ms` } : {};

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Badge + heading + subtitle (animated) */}
        <div
          ref={headingRef}
          className="mt-0 flex flex-col items-center text-center"
        >
          {/* Badge */}
          <span
            className={[
              "inline-flex items-center rounded-full bg-[#02A7CF] px-8 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md opacity-0",
              headingActive ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(0)}
          >
            Innovations
          </span>

          {/* Heading */}
          <h2
            className={[
              "mt-6 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl opacity-0",
              headingActive ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(120)}
          >
            Operational Intelligence in{" "}
            <span className="text-[#008cb4]">Action</span>
          </h2>

          {/* Subtitle */}
          <p
            className={[
              "mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base opacity-0",
              headingActive ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(220)}
          >
            A unified platform that brings clarity, automation, and efficiency
            to school operations.
          </p>
        </div>

        {/* Content: left features, right illustration */}
        <div
          ref={contentRef}
          className="mt-14 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between"
        >
          {/* LEFT: features → slide dari bawah, stagger, hover scale */}
          <div className="grid w-full max-w-xl gap-x-10 gap-y-10 md:grid-cols-2">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`
                    flex items-start gap-4
                    opacity-0
                    transform transition-transform duration-200 ease-out
                    hover:scale-[1.05] hover:-translate-y-1
                    ${contentActive ? "animate-slide-up-fade" : ""}
                  `}
                  style={dc(index * 120)}
                >
                  {/* Circle icon */}
                  <div className="mt-1 inline-flex h-11 w-11 aspect-square shrink-0 items-center justify-center rounded-full bg-[#007a94] text-white">
                    <Icon className="h-5 w-5" strokeWidth={2.3} />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: illustration → masuk dari kanan + float-space */}
          <div
            className={`
              w-full max-w-md md:max-w-lg
              opacity-0
              ${contentActive ? "animate-slide-in-right" : ""}
            `}
            style={dc(FEATURES.length * 120)}
          >
            <div className="relative mx-auto aspect-[4/3] w-full animate-float-space will-change-transform">
              <Image
                src="/operational-intelligence.png"
                alt="Operational intelligence visualization"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
