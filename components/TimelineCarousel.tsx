"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

const TOTAL = 20;

export default function TimelineCarousel() {
  const items = useMemo(
    () => Array.from({ length: TOTAL }, (_, i) => i + 1),
    []
  );

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to a given slide
  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(`[data-slide="${i}"]`);
    slide?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    setIndex(i);
  }

  function prev() {
    const i = (index - 1 + TOTAL) % TOTAL;
    goTo(i);
  }

  function next() {
    const i = (index + 1) % TOTAL;
    goTo(i);
  }

  // Track the centered slide while scrolling
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let rAF = 0;
    const onScroll = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const slides = Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
        const center = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDelta = Infinity;
        slides.forEach((s) => {
          const mid = (s.offsetLeft + s.offsetWidth / 2);
          const d = Math.abs(mid - center);
          if (d < bestDelta) {
            bestDelta = d;
            best = Number(s.dataset.slide!);
          }
        });
        setIndex(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rAF);
    };
  }, []);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll functionality - only when section is visible
  useEffect(() => {
    if (lightboxOpen || isPaused || !isVisible) return;
    
    const interval = setInterval(() => {
      next();
    }, 3000); // Auto-advance every 3 seconds
    
    return () => clearInterval(interval);
  }, [lightboxOpen, isPaused, isVisible, index]);

  // Lightbox: keyboard (Esc / arrows) + body scroll lock
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.documentElement.style.overflow;
    if (lightboxOpen) document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, index]);

  return (
    <section ref={sectionRef} id="timeline" className="section py-16">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold">From 1 to 21</h2>
        <p className="text-silver-200/90 mt-2">Auto-scrolls every 3s • Hover to pause • Tap to view full screen</p>
      </div>

      <div className="relative">
        {/* Prev/Next controls */}
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-silver-400/30 bg-denim-900/50 backdrop-blur px-3 py-2 hover:brightness-110"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full border border-silver-400/30 bg-denim-900/50 backdrop-blur px-3 py-2 hover:brightness-110"
        >
          ›
        </button>

        {/* Scroller */}
        <div
          ref={scrollerRef}
          className="no-scrollbar relative flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {items.map((y, i) => (
            <figure
              key={y}
              data-slide={i}
              className={clsx(
                "snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[28vw]",
                "card overflow-hidden cursor-pointer group"
              )}
              onClick={() => {
                setIndex(i);
                setLightboxOpen(true);
              }}
              aria-label={`Open Age ${y} photo`}
            >
              <img
                src={`/images/timeline/Year ${y}${y === 5 || y === 8 ? '.jpg' : '.png'}`}
                alt={`Age ${y}`}
                className="w-full aspect-[3/4] object-cover bg-denim-700 transition group-hover:scale-[1.02]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `/placeholders/placeholder_${(y % 4) + 1}.svg`;
                }}
              />
              <figcaption className="p-3 text-center text-sm">
                Age {y}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={clsx(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-silver-100" : "w-2.5 bg-silver-500/50 hover:bg-silver-400"
              )}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // click outside image closes
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full border border-silver-400/30 bg-denim-900/50 px-3 py-1.5"
          >
            ✕
          </button>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-silver-400/30 bg-denim-900/50 px-3 py-2"
          >
            ‹
          </button>
          <img
            src={`/images/timeline/Year ${index + 1}${(index + 1) === 5 || (index + 1) === 8 ? '.jpg' : '.png'}`}
            alt={`Age ${index + 1} (full view)`}
            className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl shadow-diamond"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `/placeholders/placeholder_${((index + 1) % 4) + 1}.svg`;
            }}
          />
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-silver-400/30 bg-denim-900/50 px-3 py-2"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
