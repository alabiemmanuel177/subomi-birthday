import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import TimelineCarousel from "@/components/TimelineCarousel";
import OutfitInspoTabs from "@/components/OutfitInspoTabs";
import RSVPSection from "@/components/RSVPSection";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* New dedicated section: Event Details */}
      <EventDetails />
      <RSVPSection />
      <TimelineCarousel />
      <OutfitInspoTabs />

      <footer className="section pb-10 text-center text-silver-300/80">
        Built with 💙 for Olasubomi.
      </footer>
    </main>
  );
}
