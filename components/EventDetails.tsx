export default function EventDetails() {
    return (
      <section
        id="details"
        className="section scroll-mt-24 -mt-10 sm:-mt-14 pb-16"
        aria-labelledby="event-details-heading"
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
            <span className="tracking-[0.32em] text-sm sm:text-base uppercase">
              Event Details
            </span>
            <span className="h-px w-16 bg-silver-500/50" />
          </div>
  
          <h2 id="event-details-heading" className="sr-only">Event Details</h2>
  
          {/* Body */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Date & Time */}
            <div className="rounded-xl border border-silver-400/20 bg-denim-900/30 p-6">
              <p className="text-base sm:text-lg uppercase tracking-wider text-silver-300/90 mb-1.5">
                Date & Time
              </p>
              <p className="text-silver-100 text-lg sm:text-xl leading-relaxed">
                <span className="font-semibold">Saturday, 23rd August</span><br />
                5:00 PM arrivals • 6:00 PM start
              </p>
            </div>
  
            {/* Venue */}
            <div className="rounded-xl border border-silver-400/20 bg-denim-900/30 p-6">
              <p className="text-base sm:text-lg uppercase tracking-wider text-silver-300/90 mb-1.5">
                Venue
              </p>
              <p className="text-silver-100 text-lg sm:text-xl leading-relaxed">
                Shared privately after RSVP to keep the celebration intimate.
              </p>
            </div>
  
            {/* Dress Code */}
            <div className="rounded-xl border border-silver-400/20 bg-denim-900/30 p-6">
              <p className="text-base sm:text-lg uppercase tracking-wider text-silver-300/90 mb-1.5">
                Dress Code
              </p>
              <p className="text-silver-100 text-lg sm:text-xl leading-relaxed">
                Blue denim base with silver accents — rhinestones, crystals, tasteful sparkle ✨
              </p>
            </div>
          </div>
  
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
  