"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WHY_ITEMS = [
  {
    title: "Administrators",
    description:
      "Manage all programs, communications, and reports in one dashboard.",
    icon: "/why-asaman/admin.png",
  },
  {
    title: "Teachers & Providers",
    description: "Simplify scheduling, attendance, and reporting tasks.",
    icon: "/why-asaman/teachers.png",
  },
  {
    title: "Parents",
    description:
      "Centralized updates, easy enrollment, and direct communication.",
    icon: "/why-asaman/parents.png",
  },
  {
    title: "Students",
    description:
      "Clear structure and personalized activity opportunities.",
    icon: "/why-asaman/students.png",
  },
  {
    title: "Reduced Admin Time",
    description:
      "Automate daily tasks and cut manual admin work by up to 70%.",
    icon: "/why-asaman/time.png",
  },
  {
    title: "Integrated & Future-Ready",
    description:
      "Seamless SIS and SSO integration with features that evolve as your school grows.",
    icon: "/why-asaman/integrated.png",
  },
];

export function WhyAsamanSection() {
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

      // elemen dianggap "di tengah" kalau jarak ke center < 25% tinggi viewport
      const threshold = window.innerHeight * 0.25;

      if (Math.abs(elementCenter - viewportCenter) <= threshold) {
        setter(true); // nyalain sekali, tidak dimatikan lagi
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

  const firstRow = WHY_ITEMS.slice(0, 3);
  const secondRow = WHY_ITEMS.slice(3);

  return (
    <section className="relative bg-[#ffffff] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div
          ref={headingRef}
          className={[
            "mb-10 flex flex-col items-center text-center opacity-0",
            showHeading ? "animate-slide-up-fade" : "",
          ].join(" ")}
        >
          <span className="inline-flex items-center rounded-full bg-[#02A7CF] px-6 py-2 text-sm font-semibold text-white shadow-lg">
            Why Asaman
          </span>

          <h2 className="mt-6 text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Why Schools Choose <span className="text-[#008cb4]">Asaman</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            A platform built to simplify school operations, strengthen
            communication, and support every stakeholder with clarity and
            efficiency.
          </p>
        </div>

        {/* White card container */}
        <div className="rounded-[32px] bg-white p-6 shadow-[0_40px_80px_rgba(15,23,42,0.12)] md:p-10">
          <div className="space-y-6">
            {/* ROW 1 */}
            <div
              ref={row1Ref}
              className={[
                "grid gap-6 md:grid-cols-2 xl:grid-cols-3 opacity-0",
                showRow1 ? "animate-slide-up-fade" : "",
              ].join(" ")}
            >
              {firstRow.map((item) => (
                <div
                  key={item.title}
                  className="
                    flex flex-col gap-4 rounded-3xl bg-white p-6
                    shadow-[0_18px_40px_rgba(15,23,42,0.04)]
                    transform transition-transform duration-200 ease-out
                    hover:scale-[1.1] hover:-translate-y-1
                  "
                >
                  <div className="relative h-16 w-16">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                    <div className="pointer-events-none absolute inset-x-2 -bottom-2 h-3 rounded-full bg-cyan-400/25 blur-sm" />
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
              ))}
            </div>

            {/* ROW 2 */}
            <div
              ref={row2Ref}
              className={[
                "grid gap-6 md:grid-cols-2 xl:grid-cols-3 opacity-0",
                showRow2 ? "animate-slide-up-fade" : "",
              ].join(" ")}
            >
              {secondRow.map((item) => (
                <div
                  key={item.title}
                  className="
                    flex flex-col gap-4 rounded-3xl bg-white p-6
                    shadow-[0_18px_40px_rgba(15,23,42,0.04)]
                    transform transition-transform duration-200 ease-out
                    hover:scale-[1.1] hover:-translate-y-1
                  "
                >
                  <div className="relative h-16 w-16">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                    <div className="pointer-events-none absolute inset-x-2 -bottom-2 h-3 rounded-full bg-cyan-400/25 blur-sm" />
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
