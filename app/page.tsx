"use client";

import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { ScratchReveal } from "@/components/scratch-reveal";
import { StorySection } from "@/components/story-section";
import { Schedule } from "@/components/schedule";
import { Venue } from "@/components/venue";
import { Registry } from "@/components/registry";
import { Payments } from "@/components/payments";
import { Attire } from "@/components/attire";
import { Rsvp } from "@/components/rsvp";
import { Footer } from "@/components/footer";
import { MusicPlayer } from "@/components/music-player";

export default function Home() {
  // Intersection Observer for all .fade-up elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfaf4] text-[#2b2520]">
      <Navigation />
      <main>
        <Hero />
        <ScratchReveal />
        <StorySection />
        <Schedule />
        <Venue />
        <Registry />
        <Payments />
        <Attire />
        <Rsvp />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}
