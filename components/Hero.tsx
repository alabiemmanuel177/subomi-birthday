import { Cinzel, Great_Vibes } from "next/font/google";

const display = Cinzel({ subsets: ["latin"], weight: ["400","600","700"] });
const script = Great_Vibes({ subsets: ["latin"], weight: "400" });

// Reusable diamond SVG
function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <polygon points="32,4 60,28 32,60 4,28" fill="white" opacity="0.9" />
      <polyline
        points="32,4 44,28 32,60 20,28 32,4"
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="2"
      />
    </svg>
  );
}

function StudRow({ count = 11, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Diamond
          key={i}
          className={`w-3 opacity-85 drop-shadow-[0_0_6px_rgba(255,255,255,0.55)] animate-twinkle [animation-delay:${(i % 6) * 0.25}s]`}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* amplified soft glow */}
      <div className="pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000_12%,transparent_74%)]">
        <div className="absolute -top-48 left-1/2 h-[34rem] w-[150vw] -translate-x-1/2 rounded-full blur-3xl
                        bg-gradient-to-r from-silver-400/25 via-white/15 to-denim-400/25" />
      </div>

      {/* Wider + taller hero */}
      <div className="section max-w-7xl xl:max-w-[96rem] flex min-h-[110svh] flex-col items-center justify-center py-20 sm:py-28 lg:py-32 text-center">
        {/* Card */}
        <div className="relative card backdrop-blur-md px-10 py-16 sm:px-16 sm:py-22 lg:px-20 lg:py-24 border-2 border-silver-300/50 w-full max-w-6xl xl:max-w-7xl overflow-hidden">
          {/* crystal sparkle overlay ON the card */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,.22) 1px, transparent 1.6px), radial-gradient(rgba(173,216,230,.18) .6px, transparent 1.2px)",
              backgroundSize: "28px 28px, 22px 22px",
              backgroundPosition: "0 0, 12px 8px",
            }}
          />

          {/* diamond studs ON the card edges */}
          <Diamond className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 w-6 opacity-90 rotate-45 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-twinkle" />
          <Diamond className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 opacity-90 -rotate-45 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] animate-twinkle [animation-delay:.7s]" />
          <Diamond className="pointer-events-none absolute top-3 left-3 w-5 opacity-85 drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]" />
          <Diamond className="pointer-events-none absolute top-3 right-3 w-5 opacity-85 drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]" />
          <Diamond className="pointer-events-none absolute bottom-3 left-3 w-5 opacity-85 drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]" />
          <Diamond className="pointer-events-none absolute bottom-3 right-3 w-5 opacity-85 drop-shadow-[0_0_8px_rgba(255,255,255,0.55)]" />
          <Diamond className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-85 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] animate-twinkle [animation-delay:1.4s]" />
          <Diamond className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 opacity-85 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] animate-twinkle [animation-delay:2.1s]" />

          {/* header line */}
          <div className="mx-auto mb-6 inline-flex items-center gap-3 text-silver-200/90 relative">
            <span className="h-px w-16 bg-silver-500/50" />
            <span className="tracking-[0.32em] text-xs sm:text-sm uppercase">Denim • Diamonds</span>
            <span className="h-px w-16 bg-silver-500/50" />
          </div>

          {/* diamond row divider ON the card */}
          <StudRow className="mb-6" count={13} />

          <h1 className={`${display.className} font-semibold leading-[1.03]`}>
            <span className="block text-5xl md:text-7xl lg:text-8xl">Olasubomi&apos;s</span>
            <span className={`${script.className} block text-6xl md:text-8xl lg:text-9xl -mt-1`}>21st</span>
          </h1>

          {/* another diamond row under the title */}
          <StudRow className="mt-6" count={11} />

          <p className="mt-7 text-silver-200/90 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto">
            You’re cordially invited to an elegant evening of sparkle and love.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#rsvp" className="btn text-base sm:text-lg px-7 py-4">RSVP Now</a>
            <a href="#details" className="btn bg-denim-600 text-silver-100 hover:bg-denim-500 text-base sm:text-lg px-7 py-4">
              Event Details
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-3 text-silver-300/85 text-sm sm:text-base">
            <span className="h-px w-10 bg-silver-500/40" />
            <span>Dress code: Blue Denim • Diamonds</span>
            <span className="h-px w-10 bg-silver-500/40" />
          </div>
        </div>
      </div>
    </header>
  );
}
