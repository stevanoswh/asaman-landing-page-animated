// components/sections/TermsConditionsSection.tsx
"use client";

export function TermsConditionsSection() {
  return (
    <section className="relative bg-white py-24">
      {/* soft top gradient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#E3F5FF] via-white to-white opacity-80" />

      <div className="relative mx-auto max-w-3xl px-6">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-[#02A7CF] px-6 py-2 text-xs md:text-sm font-semibold uppercase tracking-wide text-white shadow-md">
            Terms & Condition
          </span>
        </div>

        {/* Title + intro */}
        <header className="mt-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 text-center">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-600">
            At Asaman, we are committed to protecting your personal information and ensuring
            a transparent, secure, and trustworthy experience. This Privacy Policy explains
            how we collect, use, store, and safeguard information when you use our platform,
            mobile app, or associated services.
          </p>
        </header>

        {/* Content */}
        <div className="mt-10 space-y-8 text-left">
          {/* Information We Collect */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Information We Collect
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              Asaman collects essential information to operate the platform smoothly and
              securely. This includes personal details such as parent and student names,
              contact information, class profiles, and communication preferences. We also
              collect attendance records, activity participation, app usage behavior, device
              information, and technical logs. These details help us ensure accurate
              operations, support school processes, and improve overall app performance.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              How We Use Your Information
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              The information you provide is used to deliver core features of the Asaman
              platform. This includes enabling real-time notifications, managing attendance,
              supporting activity enrollment, and improving communication between schools and
              families. We also use aggregated data to enhance performance, refine user
              experience, and maintain reliable app functionality. Your information is used
              strictly for operational purposes and never for unauthorized marketing or resale.
            </p>
          </section>

          {/* Data Protection & Security */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Data Protection &amp; Security
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              We take security seriously and safeguard your data using encrypted channels,
              secure cloud hosting, and strict role-based access controls. Only verified
              users and school personnel have permission to access sensitive information.
              Our system is regularly monitored and updated to ensure that all data handled
              on Asaman remains protected from unauthorized access or misuse.
            </p>
          </section>

          {/* Data Sharing & Disclosure */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Data Sharing &amp; Disclosure
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              Asaman does not sell or exploit your information. We only share data with your
              school to support educational processes or with trusted service providers who
              help us power and maintain the platform. In certain cases, we may be required
              to share information to comply with legal requests or safety obligations. All
              shared data is handled with strict confidentiality and security requirements.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Your Rights
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              As a user, you have the right to access, update, or modify your personal
              information. You may request account deletion, adjust your notification
              settings, or correct inaccurate details at any time. For data-related
              requests, parents and students can contact their school administration or
              Asaman support directly.
            </p>
          </section>

          {/* Updates To This Policy */}
          <section>
            <h2 className="text-lg md:text-xl font-semibold text-slate-900">
              Updates to This Policy
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              We may update this Privacy Policy over time as we introduce new features or
              comply with updated regulations. Any major changes will be communicated
              through the app or website to keep you informed.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
