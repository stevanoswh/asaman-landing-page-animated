// components/sections/ParentsOperationalIntelligenceSection.tsx
"use client";

import Image from "next/image";
import {
  CalendarCheck2,
  Bell,
  FileText,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ParentFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const PARENT_FEATURES: ParentFeature[] = [
  {
    title: "Track Attendance",
    description:
      "Real-time visibility into student participation and attendance records.",
    icon: CalendarCheck2,
  },
  {
    title: "Receive Updates",
    description:
      "Multilingual alerts and notifications about activities and events.",
    icon: Bell,
  },
  {
    title: "Report Absences",
    description:
      "One-tap submission for quick and easy absence reporting.",
    icon: FileText,
  },
  {
    title: "Enroll in Activities",
    description:
      "Confirm enrollment in activities with one simple step.",
    icon: Activity,
  },
];

export function Features() {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const checkInCenter = (el: HTMLDivElement | null, setter: (v: boolean) => void) => {
      if (!el || typeof window === "undefined") return;

      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const threshold = window.innerHeight * 0.25; // ±25% tinggi viewport

      if (Math.abs(elementCenter - viewportCenter) <= threshold) {
        setter(true);
      }
    };

    const handleScroll = () => {
      checkInCenter(leftRef.current, setShowLeft);
      checkInCenter(imageRef.current, setShowImage);
      checkInCenter(cardsRef.current, setShowCards);
    };

    // initial cek + listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* TOP: text + hero image */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
          {/* LEFT: badge + heading + paragraf */}
          <div
            ref={leftRef}
            className={[
              "w-full max-w-xl space-y-6 opacity-0",
              showLeft ? "animate-slide-in-left" : "",
            ].join(" ")}
          >
            <span className="inline-flex items-center rounded-full bg-[#02A7CF] px-6 py-2 text-sm font-semibold text-white shadow-md">
              Features
            </span>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-[36px]">
                Bridge Learning Empower Parents Through{" "}
                <span className="text-[#008cb4]">Operational Intelligence</span>
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-slate-600 md:text-base">
                Experience effortless communication, real-time updates, and
                streamlined school workflows in one place.
              </p>
            </div>
          </div>

          {/* RIGHT: 3D shapes + cubes (muncul dari kiri) */}
          <div
            ref={imageRef}
            className={[
              "relative mx-auto aspect-[400/330] w-full max-w-[416px] opacity-0",
              showImage ? "animate-slide-in-right" : "",
            ].join(" ")}
          >
            {/* Core glass */}
            <div className="absolute left-[24%] top-[16%] h-[71%] w-[52%]">
              <Image
                src="/features/1.png"
                alt="Operational intelligence 3D shapes"
                fill
                className="object-contain drop-shadow-[0_40px_80px_rgba(15,23,42,0.35)]"
              />
            </div>

            {/* 31.png – cluster kiri atas */}
            <div className="absolute left-[0.5%] top-[0.2%] h-[38%] w-[33%] animate-float-space will-change-transform">
              <Image
                src="/features/2.png"
                alt="Calendar cube"
                fill
                className="object-contain"
              />
            </div>

            {/* 32.png – cluster kanan atas */}
            <div className="absolute left-[66.7%] top-[10.7%] h-[21%] w-[18%] animate-float-space will-change-transform [animation-delay:150ms]">
              <Image
                src="/features/4.png"
                alt="Wellbeing cube"
                fill
                className="object-contain"
              />
            </div>

            {/* 34.png – cluster kiri bawah */}
            <div className="absolute left-[0.5%] top-[72%] h-[26%] w-[22%] animate-float-space will-change-transform [animation-delay:300ms]">
              <Image
                src="/features/3.png"
                alt="Documents cube"
                fill
                className="object-contain"
              />
            </div>

            {/* 33.png – cluster kanan bawah */}
            <div className="absolute left-[69%] top-[60.5%] h-[40%] w-[34%] animate-float-space will-change-transform [animation-delay:450ms]">
              <Image
                src="/features/5.png"
                alt="Notifications cube"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM: feature cards (slide dari bawah + hover besar) */}
        <div
          ref={cardsRef}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {PARENT_FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`
                  flex h-full flex-col gap-3 rounded-[28px] bg-white p-6
                  shadow-[0_22px_45px_rgba(15,23,42,0.06)]
                  opacity-0 transform transition-transform duration-200 ease-out
                  hover:scale-[1.05] hover:-translate-y-1
                  ${showCards ? "animate-slide-up-fade" : ""}
                `}
                style={{
                  animationDelay: showCards ? `${index * 100}ms` : undefined,
                }}
              >
                {/* circle icon lucide */}
                <div className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#007a94] text-white">
                  <Icon className="h-6 w-6" strokeWidth={2.3} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
