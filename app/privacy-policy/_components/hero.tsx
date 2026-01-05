// components/legal/legal-hero.tsx
import Image from "next/image";

export function PrivacyPolicyHero() {
  return (
    <section className="relative isolate overflow-hidden pt-15">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-image-pp.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Terms &amp; Policies
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
            Clear guidelines that define how Asaman works and protects its users
          </p>
        </div>
      </div>
    </section>
  );
}
