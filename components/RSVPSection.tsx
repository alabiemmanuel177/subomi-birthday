import RSVPForm from "./RSVPForm";

export default function RSVPSection() {
  return (
    <section
      id="rsvp"
      className="section scroll-mt-24 pb-16"
      aria-labelledby="rsvp-heading"
    >
      <div className="relative card backdrop-blur-md w-full max-w-5xl xl:max-w-6xl mx-auto px-8 py-10 sm:px-12 sm:py-14 border-2 border-silver-300/50 overflow-hidden">
        {/* crystal sparkle overlay ON the card */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.20) 1px, transparent 1.6px), radial-gradient(rgba(173,216,230,.16) .6px, transparent 1.2px)",
            backgroundSize: "28px 28px, 22px 22px",
            backgroundPosition: "0 0, 12px 8px",
          }}
        />

        {/* Top diamond divider */}
        <div className="relative mx-auto mb-6 flex items-center justify-center gap-3 text-silver-200/90">
          <span className="h-px w-16 bg-silver-500/50" />
          <span className="tracking-[0.32em] text-sm sm:text-base uppercase">RSVP</span>
          <span className="h-px w-16 bg-silver-500/50" />
        </div>

        <h2 id="rsvp-heading" className="sr-only">RSVP</h2>

        <RSVPForm />

        {/* Bottom diamond divider */}
        <div className="relative mx-auto mt-10 flex items-center justify-center gap-3 text-silver-200/90">
          <span className="h-px w-16 bg-silver-500/50" />
          <span className="text-sm sm:text-base">Denim • Diamonds • Silver</span>
          <span className="h-px w-16 bg-silver-500/50" />
        </div>
      </div>
    </section>
  );
}
