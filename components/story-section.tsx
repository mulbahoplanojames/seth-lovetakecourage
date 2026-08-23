"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

export function StorySection() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Set up scroll observer for timeline chapters when opened
  useEffect(() => {
    if (!isOpen) return;

    const chapters = document.querySelectorAll(".story-chapter");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [isOpen]);

  const toggleStory = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section
      id="story"
      className="story-section relative scroll-mt-24 overflow-hidden bg-[#f4ece1]/40 px-6 py-28 sm:py-36 lg:px-10"
      aria-label="Our story"
    >
      <div className="story-ambient" aria-hidden="true" />

      <div className="story-reveal mx-auto max-w-6xl">
        {/* Story Fold Trigger */}
        <button
          type="button"
          onClick={toggleStory}
          className="story-fold group"
          aria-expanded={isOpen}
          aria-controls="story-timeline"
        >
          <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Our Story</p>
          <blockquote className="story-quote mx-auto mt-10 max-w-2xl font-serif text-xl italic leading-[1.85] text-foreground/90 sm:mt-14 sm:text-2xl lg:text-[1.65rem] lg:leading-[1.9]">
            {weddingData.quote.storyIntro}
          </blockquote>
          <p
            className={`story-hint mx-auto mt-12 text-[0.65rem] uppercase tracking-editorial text-[#a89988] sm:mt-16 group-hover:text-foreground ${
              isOpen ? "story-hint--open" : ""
            }`}
          >
            {isOpen ? "Close story ↑" : "Click to reveal our story ↓"}
          </p>
        </button>

        {/* Expanding Timeline Content */}
        <div
          id="story-timeline"
          ref={contentRef}
          className={`story-expand ${isOpen ? "is-open" : ""}`}
          style={{
            maxHeight: isOpen ? "8000px" : "0px",
          }}
          aria-hidden={!isOpen}
        >
          <div className="story-expand-inner">
            <div className="relative mx-auto max-w-6xl pt-10 sm:pt-16">
              {/* Center vertical thread */}
              <span aria-hidden="true" className="story-timeline-thread hidden md:block" />

              <ol className="space-y-28 sm:space-y-36 md:space-y-44">
                {weddingData.story.map((milestone, index) => {
                  const isEven = index % 2 === 1;
                  const isFinale = milestone.isFinale;

                  return (
                    <li
                      key={milestone.title}
                      className={`story-chapter relative grid items-center gap-12 md:grid-cols-2 md:gap-20 ${
                        isEven ? "md:[direction:rtl]" : ""
                      } ${isFinale ? "proposal-finale" : ""}`}
                    >
                      {/* Image container with tone and parallax styling */}
                      <figure
                        className={`relative md:[direction:ltr] ${isFinale ? "proposal-glow" : ""}`}
                        style={{ aspectRatio: "4 / 5" }}
                      >
                        <div
                          className={`story-photo story-grain relative h-full w-full rounded-sm ${
                            milestone.tone || "tone-faded"
                          }`}
                        >
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </figure>

                      {/* Text content */}
                      <div className="story-chapter-text md:[direction:ltr]">
                        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">
                          {milestone.date}
                        </p>
                        <h3
                          className={`mt-4 font-serif leading-[1.06] tracking-[-0.01em] ${
                            isFinale
                              ? "text-4xl sm:text-5xl lg:text-[3.25rem]"
                              : "text-3xl sm:text-4xl lg:text-5xl"
                          }`}
                        >
                          {milestone.title}
                        </h3>

                        {isFinale ? (
                          <>
                            <p className="mt-6 max-w-md leading-relaxed font-serif text-xl italic text-foreground/85 sm:text-2xl">
                              {milestone.description}
                            </p>
                            <p className="mt-8 text-[0.65rem] uppercase tracking-editorial text-[#a89988]">
                              {weddingData.quote.storyConclusion}
                            </p>
                          </>
                        ) : (
                          <p className="mt-6 max-w-md leading-relaxed text-sm text-[#7b6f66] sm:text-base">
                            {milestone.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Story Conclusion */}
              <div className="mx-auto mt-28 max-w-md pb-8 text-center flex flex-col items-center sm:mt-36 sm:pb-12">
                <p className="font-serif text-2xl italic text-foreground/75 sm:text-3xl">
                  {weddingData.quote.storyFinalWords}
                </p>
                <div className="inline-flex items-center justify-center mt-8">
                  <div className="relative h-20 w-32">
                    <Image
                      src={weddingData.couple.monogramUrl}
                      alt="C & A Monogram"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
