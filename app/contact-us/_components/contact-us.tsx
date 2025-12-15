// components/sections/FindYourSchoolSection.tsx
"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export function ContactUs() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const checkTrigger = () => {
      const el = cardRef.current;
      if (!el || typeof window === "undefined") return;

      const rect = el.getBoundingClientRect();
      // garis trigger di 60% tinggi viewport
      const triggerLine = window.innerHeight * 0.6;

      // kalau bagian atas card sudah naik sampai garis ini → nyalakan animasi
      if (rect.top <= triggerLine) {
        setActive(true);
      }
    };

    const handleScroll = () => {
      checkTrigger();
    };

    // initial cek + listener
    checkTrigger();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: sambungkan ke API / form provider
  }

  // helper delay
  const d = (ms: number) => (active ? { animationDelay: `${ms}ms` } : {});

  return (
    <section className="bg-white py-24">
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Glow besar di luar card */}
        <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_top,_rgba(0,199,255,0.6),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.45),transparent_60%)] blur-3xl opacity-80" />

        {/* Card utama */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[40px] border border-white/70 bg-gradient-to-br from-white/95 via-[#F4FBFF] to-[#F6F0FF] shadow-[0_40px_80px_rgba(15,23,42,0.18)]"
        >
          <div className="mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-14">
            {/* Badge */}
            <div className="flex justify-center">
              <span
                className={[
                  "inline-flex items-center rounded-full bg-[#02A7CF] px-8 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md opacity-0",
                  active ? "animate-slide-in-left" : "",
                ].join(" ")}
                style={d(0)}
              >
                Contact Us
              </span>
            </div>

            {/* Heading + subheading */}
            <div className="mt-8 space-y-3 text-center">
              <h2
                className={[
                  "text-2xl font-semibold leading-tight text-slate-900 md:text-[32px] opacity-0",
                  active ? "animate-slide-up-fade" : "",
                ].join(" ")}
                style={d(120)}
              >
                Chat with the team{" "}
              </h2>
              <p
                className={[
                  "text-sm leading-relaxed text-slate-600 md:text-base opacity-0",
                  active ? "animate-slide-up-fade" : "",
                ].join(" ")}
                style={d(220)}
              >
                Join leading international schools worldwide in transforming how
                they manage after-school programs with AI-powered automation.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6 text-left"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div
                  className={[
                    "space-y-2 opacity-0",
                    active ? "animate-slide-up-fade" : "",
                  ].join(" ")}
                  style={d(320)}
                >
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-800"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="h-11 w-full rounded-[999px] border border-slate-200 bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#02A7CF] focus:outline-none focus:ring-2 focus:ring-[#02A7CF]/30"
                  />
                </div>

                {/* Email */}
                <div
                  className={[
                    "space-y-2 opacity-0",
                    active ? "animate-slide-up-fade" : "",
                  ].join(" ")}
                  style={d(420)}
                >
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    className="h-11 w-full rounded-[999px] border border-slate-200 bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#02A7CF] focus:outline-none focus:ring-2 focus:ring-[#02A7CF]/30"
                  />
                </div>

                {/* School name */}
                <div
                  className={[
                    "space-y-2 opacity-0",
                    active ? "animate-slide-up-fade" : "",
                  ].join(" ")}
                  style={d(520)}
                >
                  <label
                    htmlFor="school"
                    className="text-sm font-medium text-slate-800"
                  >
                    School Name
                  </label>
                  <input
                    id="school"
                    name="school"
                    type="text"
                    placeholder="Enter school name"
                    className="h-11 w-full rounded-[999px] border border-slate-200 bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#02A7CF] focus:outline-none focus:ring-2 focus:ring-[#02A7CF]/30"
                  />
                </div>

                {/* Phone */}
                <div
                  className={[
                    "space-y-2 opacity-0",
                    active ? "animate-slide-up-fade" : "",
                  ].join(" ")}
                  style={d(620)}
                >
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-slate-800"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. +14155552671"
                    className="h-11 w-full rounded-[999px] border border-slate-200 bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#02A7CF] focus:outline-none focus:ring-2 focus:ring-[#02A7CF]/30"
                  />
                </div>
              </div>

              {/* Message */}
              <div
                className={[
                  "space-y-2 opacity-0",
                  active ? "animate-slide-up-fade" : "",
                ].join(" ")}
                style={d(720)}
              >
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-800"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Please describe your inquiry in detail..."
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-[#02A7CF] focus:outline-none focus:ring-2 focus:ring-[#02A7CF]/30"
                />
              </div>

              {/* Submit button */}
              <div
                className={[
                  "mt-4 flex justify-center opacity-0",
                  active ? "animate-pop-in" : "",
                ].join(" ")}
                style={d(820)}
              >
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-[999px] bg-[#007a94] px-12 text-sm font-semibold uppercase tracking-wide text-white shadow-md hover:bg-[#00627a] focus:outline-none focus:ring-2 focus:ring-[#02A7CF]/40"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
