// components/sections/FaqSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const FAQ_ITEMS = [
  {
    id: "automation",
    question: "How does Asaman help schools automate daily operations?",
    answer:
      "It automates attendance, scheduling, updates, and reporting, reducing manual work for staff.",
  },
  {
    id: "notifications",
    question: "Do parents get real-time notifications?",
    answer:
      "Yes. Parents receive instant updates on attendance, announcements, and important events.",
  },
  {
    id: "teachers",
    question: "Is the platform easy for teachers to use?",
    answer:
      "The interface is built for teachers with simple workflows and minimal onboarding.",
  },
  {
    id: "security",
    question: "Is student data secure on Asaman?",
    answer:
      "Student data is secured with encryption, strict access controls, and compliance with major privacy standards.",
  },
  {
    id: "multi-campus",
    question: "Does Asaman support multiple campuses?",
    answer:
      "Yes, multiple campuses can be managed in one centralized platform with role-based permissions.",
  },
];

export function FaqSection() {
  const [activeId, setActiveId] = useState<string>(FAQ_ITEMS[0].id);

  // kiri (badge + heading) masih satu blok
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [showHeading, setShowHeading] = useState(false);

  // kanan: per-button
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    () => FAQ_ITEMS.map(() => false)
  );

  useEffect(() => {
    const checkInCenter = (el: HTMLElement | null) => {
      if (!el || typeof window === "undefined") return false;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const threshold = window.innerHeight * 0.25; // ±25% dari tengah
      return Math.abs(elementCenter - viewportCenter) <= threshold;
    };

    const handleScroll = () => {
      // kiri
      if (!showHeading && checkInCenter(headingRef.current)) {
        setShowHeading(true);
      }

      // kanan – hitung visible per item
      setVisibleItems((prev) => {
        const next = [...prev];
        let changed = false;

        itemRefs.current.forEach((el, index) => {
          if (!el) return;
          if (next[index]) return; // sudah visible, skip

          if (checkInCenter(el)) {
            next[index] = true;
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHeading]);

  const dh = (ms: number) =>
    showHeading ? { animationDelay: `${ms}ms` } : undefined;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
        {/* Left copy */}
        <div ref={headingRef} className="space-y-6">
          <span
            className={[
              "inline-flex items-center rounded-full bg-[#02A7CF] px-6 py-2 text-sm font-semibold text-white opacity-0",
              showHeading ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(0)}
          >
            FAQ
          </span>

          <div
            className={[
              "space-y-4 opacity-0",
              showHeading ? "animate-slide-up-fade" : "",
            ].join(" ")}
            style={dh(120)}
          >
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-[36px]">
              Got Questions? We’ve Got
              <br />
              Answers.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
              Everything you need to know about our platform in one place –
              features, innovations, and impact all answered for you.
            </p>
          </div>
        </div>

        {/* Right: accordion – muncul satu-satu ketika button-nya di tengah layar */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = activeId === item.id;
            const isVisible = visibleItems[index];

            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                onClick={() =>
                  setActiveId((cur) => (cur === item.id ? "" : item.id))
                }
                className={[
                  "w-full rounded-[24px] border text-left shadow-sm transition-transform duration-200",
                  "hover:-translate-y-1 hover:shadow-md",
                  isOpen
                    ? "border-[#02A7CF] bg-white"
                    : "border-[#E5E7EB] bg-white hover:bg-slate-50",
                  isVisible ? "animate-slide-up-fade" : "opacity-0",
                ].join(" ")}
                
              >
                <div className="flex items-start justify-between gap-4 px-6 py-5">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 md:text-base">
                      {item.question}
                    </p>
                    {isOpen && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {item.answer}
                      </p>
                    )}
                  </div>

                  <span className="mt-1 text-xl text-slate-500">
                    {isOpen ? "✕" : "+"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
