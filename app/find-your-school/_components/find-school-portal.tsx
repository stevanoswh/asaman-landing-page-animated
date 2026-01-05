"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Globe,
  Zap,
  ShieldCheck,
  Building2,
  User,
  Mail,
  Check,
  Loader2,
  ArrowRight,
} from "lucide-react";

type School = {
  id: string;
  name: string;
  location: string; // "Accra, Ghana"
};

const SCHOOLS: School[] = [
  { id: "1", name: "Lincoln International Academy", location: "Accra, Ghana" },
  { id: "2", name: "British International School", location: "Lagos, Nigeria" },
  { id: "3", name: "British International School", location: "Abuja, Nigeria" },
  { id: "4", name: "Metro High School", location: "Jakarta, Indonesia" },
  { id: "5", name: "Oakwood Elementary", location: "Beijing, China" },
];

type RequestRole = "Parent" | "Administrator";
type ViewState = "idle" | "results" | "empty" | "request" | "success" | "returning";

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

/* =========================
   Step pills (NO inner components)
========================= */

function StepDot({
  n,
  step,
  doneUntil,
}: {
  n: 1 | 2 | 3;
  step: 1 | 2 | 3;
  doneUntil: 0 | 1 | 2 | 3;
}) {
  const done = doneUntil >= n;
  const active = step === n;

  return (
    <div
      className={cn(
        "grid h-8 w-8 place-items-center rounded-full text-sm font-semibold",
        done ? "bg-[#0B3C78] text-white" : active ? "bg-[#0B3C78] text-white" : "bg-[#0B3C78] text-white/80"
      )}
    >
      {done ? <Check className="h-4 w-4" /> : n}
    </div>
  );
}

function StepLine() {
  return <div className="h-[2px] w-10 bg-[#0B3C78]/40" aria-hidden />;
}

function StepPills({
  step,
  doneUntil,
}: {
  step: 1 | 2 | 3;
  doneUntil: 0 | 1 | 2 | 3;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <StepDot n={1} step={step} doneUntil={doneUntil} />
      <StepLine />
      <StepDot n={2} step={step} doneUntil={doneUntil} />
      <StepLine />
      <StepDot n={3} step={step} doneUntil={doneUntil} />
    </div>
  );
}

/* =========================
   Main section
========================= */

export function FindSchoolPortalSection() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<ViewState>("idle");

  // request flow
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [schoolName, setSchoolName] = useState("");
  const [role, setRole] = useState<RequestRole>("Parent");
  const [workEmail, setWorkEmail] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SCHOOLS.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const hasQuery = query.trim().length > 0;
  const hasMatches = filtered.length > 0;

  // drive view from query/matches
  useEffect(() => {
    // jangan ganggu state success/returning
    if (view === "success" || view === "returning") return;

    if (!hasQuery) {
      setView("idle");
      setStep(1);
      setSchoolName("");
      setRole("Parent");
      setWorkEmail("");
      return;
    }

    if (hasMatches) {
      setView("results");
      return;
    }

    // no matches:
    // kalau user sudah buka request, biarkan tetap request.
    if (view !== "request") setView("empty");
  }, [hasQuery, hasMatches, view]);

  // validations
  const canNext1 = schoolName.trim().length >= 2;
  const emailOk =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim()) && workEmail.trim().length <= 200;
  const canSubmit = canNext1 && emailOk;

  const doneUntil: 0 | 1 | 2 | 3 = useMemo(() => {
    // doneUntil = step - 1 (checkmark buat langkah yg udah lewat)
    if (step === 1) return 0;
    if (step === 2) return 1;
    return 2;
  }, [step]);

  const openRequest = () => {
    setView("request");
    setStep(1);
    setRole("Parent");
    setWorkEmail("");

    // prefill nama sekolah dari query
    const q = query.trim();
    setSchoolName((prev) => (prev.trim() ? prev : q));
  };

  const resetAll = () => {
    setView("idle");
    setQuery("");
    setStep(1);
    setSchoolName("");
    setRole("Parent");
    setWorkEmail("");
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const submitRequest = async () => {
    // TODO: ganti jadi API call beneran
    setView("success");

    setTimeout(() => setView("returning"), 900);
    setTimeout(() => resetAll(), 1900);
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F6FBFF_0%,#ECF8FF_100%)] py-24">
      {/* soft right glow */}
      <div className="pointer-events-none absolute right-[-140px] top-[120px] h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/15 blur-[90px]" />
      <div className="pointer-events-none absolute right-[-60px] top-[220px] h-[520px] w-[520px] rounded-full bg-[#06B6D4]/12 blur-[90px]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-[#0B8AA4] px-8 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
            Smart Access
          </span>
        </div>

        {/* heading */}
        <div className="mt-8 text-center">
          <h2 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            Find Your School’s <span className="text-[#0C7E93]">Asaman Portal</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Access activities, updates, attendance, and reports — all from one unified
            platform.
          </p>
        </div>

        {/* card */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-3xl rounded-[24px] bg-white shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
            <div className="p-8 md:p-10">
              {/* search input */}
              <div className="rounded-[14px] bg-slate-50 px-4 py-4 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-slate-500" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by school name"
                    className="w-full bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* =========================
                 RESULTS LIST
              ========================= */}
              {view === "results" && (
                <div className="mt-6 space-y-2">
                  {filtered.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="w-full rounded-[14px] px-4 py-3 text-left transition hover:bg-slate-50"
                      onClick={() => {
                        // TODO: navigate ke portal sekolah
                        // contoh: router.push(`/schools/${s.id}`)
                        alert(`Selected: ${s.name} (${s.location})`);
                      }}
                    >
                      <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{s.location}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* =========================
                 EMPTY (NO MATCHES) - clickable help
              ========================= */}
              {view === "empty" && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-600">
                    We&apos;re expanding our school network worldwide.
                  </p>

                  <button
                    type="button"
                    onClick={openRequest}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0B8AA4] hover:underline"
                  >
                    Can&apos;t find your school? Let us help <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* =========================
                 REQUEST FLOW
              ========================= */}
              {view === "request" && (
                <div className="mt-8">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Can&apos;t find your school?
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                      Help us connect your school to Asaman. Our team will guide you
                      through onboarding.
                    </p>
                  </div>

                  <div className="mt-6">
                    <StepPills step={step} doneUntil={doneUntil} />
                  </div>

                  <div className="mt-8 space-y-6">
                    {/* STEP 1 */}
                    {step === 1 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <Building2 className="h-4 w-4 text-[#0B8AA4]" />
                          School Name
                        </div>

                        <input
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full rounded-[12px] bg-slate-50 px-4 py-4 text-base text-slate-900 ring-1 ring-[#0B3C78] focus:outline-none"
                          placeholder="Oxford University"
                        />

                        <div className="mt-3 flex gap-3">
                          <button
                            type="button"
                            className="flex-1 rounded-[14px] bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                            onClick={() => setView("empty")}
                          >
                            Back
                          </button>

                          <button
                            type="button"
                            className={cn(
                              "flex-1 inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-4 text-sm font-semibold transition",
                              canNext1
                                ? "bg-[#0B8AA4] text-white hover:brightness-95"
                                : "cursor-not-allowed bg-slate-200 text-slate-400"
                            )}
                            disabled={!canNext1}
                            onClick={() => setStep(2)}
                          >
                            <span>Continue</span>
                            <ArrowRight className="h-4 w-4 shrink-0" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <User className="h-4 w-4 text-[#0B8AA4]" />
                          Your Role
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setRole("Parent")}
                            className={cn(
                              "rounded-[12px] px-5 py-3 text-sm font-medium ring-1 transition",
                              role === "Parent"
                                ? "bg-[#0B8AA4] text-white ring-[#0B8AA4]"
                                : "bg-white text-slate-800 ring-slate-300 hover:bg-slate-50"
                            )}
                          >
                            Parent
                          </button>

                          <button
                            type="button"
                            onClick={() => setRole("Administrator")}
                            className={cn(
                              "rounded-[12px] px-5 py-3 text-sm font-medium ring-1 transition",
                              role === "Administrator"
                                ? "bg-[#0B8AA4] text-white ring-[#0B8AA4]"
                                : "bg-white text-slate-800 ring-slate-300 hover:bg-slate-50"
                            )}
                          >
                            Administrator
                          </button>
                        </div>

                        <div className="mt-2 flex gap-3">
                          <button
                            type="button"
                            className="flex-1 rounded-[14px] bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                            onClick={() => setStep(1)}
                          >
                            Back
                          </button>

                          {/* FIX: inline-flex biar icon ga turun baris */}
                          <button
                            type="button"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#0B8AA4] px-5 py-4 text-sm font-semibold text-white hover:brightness-95"
                            onClick={() => setStep(3)}
                          >
                            <span>Continue</span>
                            <ArrowRight className="h-4 w-4 shrink-0" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <Mail className="h-4 w-4 text-[#0B8AA4]" />
                          Work Email Address
                        </div>

                        <input
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          className="w-full rounded-[12px] bg-slate-50 px-4 py-4 text-base text-slate-900 ring-1 ring-[#0B3C78] focus:outline-none"
                          placeholder="oxforduni@gmail.com"
                        />

                        <div className="mt-3 flex gap-3">
                          <button
                            type="button"
                            className="flex-1 rounded-[14px] bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                            onClick={() => setStep(2)}
                          >
                            Back
                          </button>

                          <button
                            type="button"
                            className={cn(
                              "flex-[2] rounded-[14px] px-5 py-4 text-sm font-semibold transition",
                              canSubmit
                                ? "bg-[#0B768A] text-white hover:brightness-95"
                                : "cursor-not-allowed bg-slate-200 text-slate-400"
                            )}
                            disabled={!canSubmit}
                            onClick={submitRequest}
                          >
                            Request School Access
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* =========================
                 SUCCESS / RETURNING
              ========================= */}
              {view === "success" && (
                <div className="mt-8 grid place-items-center py-10 text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-[#0B8AA4]/10">
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-[#0B8AA4] text-white">
                      <Check className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                    Request Received!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-600">
                    Thanks! Our team has received your request and will reach out shortly.
                  </p>
                </div>
              )}

              {view === "returning" && (
                <div className="mt-8 grid place-items-center py-12 text-center">
                  <Loader2 className="h-14 w-14 animate-spin text-[#0B8AA4]" />
                  <p className="mt-4 text-base text-slate-600">Returning Back...</p>
                </div>
              )}

              {/* helper when empty query */}
              {view === "idle" && (
                <div className="mt-6 text-center text-sm text-slate-500">
                  Start typing to find your school.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* bottom trust icons */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 px-2 text-slate-800 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3">
            <Globe className="h-5 w-5 text-[#0B8AA4]" />
            <span className="text-base font-medium">Trusted by international schools</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Zap className="h-5 w-5 text-[#0B8AA4]" />
            <span className="text-base font-medium">Trusted by international schools</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#0B8AA4]" />
            <span className="text-base font-medium">Trusted by international schools</span>
          </div>
        </div>
      </div>
    </section>
  );
}
