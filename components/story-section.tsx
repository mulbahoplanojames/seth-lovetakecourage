"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export function StorySection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStory = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section
      id="story"
      className="relative scroll-mt-24 w-full overflow-hidden bg-[#f4ece1]/40 px-6 py-36 sm:py-48 lg:py-56 flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(100% 70% at 50% 0, rgba(249, 245, 236, 0.8), transparent 60%), #fdfaf4' }}
      aria-label="Our story"
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(60% 40% at 50% 20%, rgba(247, 233, 213, 0.4), transparent 70%)' }} aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-5xl flex flex-col items-center text-center">
        {/* Story Fold Trigger */}
        <motion.button
          type="button"
          onClick={toggleStory}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="group w-full flex flex-col items-center cursor-pointer text-center w-full color-inherit font-inherit bg-transparent border-none p-[clamp(1rem,3vw,2rem)_clamp(1rem,4vw,2rem)_clamp(2.5rem,6vw,3.5rem)] transition-opacity duration-400 ease-out block"
          aria-expanded={isOpen}
          aria-controls="story-timeline"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]"
          >
            Our Story
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mx-auto mt-12 max-w-2xl font-serif text-xl italic leading-[1.85] text-foreground/90 sm:mt-16 sm:text-2xl lg:text-[1.65rem] lg:leading-[1.9] transition-opacity duration-400 ease-out"
          >
            {weddingData.quote.storyIntro}
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`mx-auto mt-14 text-[0.65rem] uppercase tracking-editorial text-[#a89988] sm:mt-16 group-hover:text-foreground transition-colors duration-400 ease-out transition-opacity duration-400 ease-out ${isOpen ? "opacity-70" : ""
              }`}
          >
            {isOpen ? "Close story ↑" : "Click to reveal our story ↓"}
          </motion.p>
        </motion.button>

        {/* Expanding Timeline Content via Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="story-timeline"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden text-left"
            >
              <div className="bg-gradient-to-b from-transparent via-[rgba(251,248,241,0.4)_8%] to-transparent pb-[clamp(2rem,5vw,3rem)]">
                <div className="relative mx-auto max-w-5xl pt-16 sm:pt-24">
                  {/* Center vertical thread */}
                  <span aria-hidden="true" className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[rgba(123,111,102,0.2)_8%] via-[rgba(185,159,140,0.35)] via-[rgba(224,170,134,0.45)_92%] to-transparent" />

                  <ol className="space-y-36 sm:space-y-44 md:space-y-52">
                    {weddingData.story.map((milestone, index) => {
                      const isEven = index % 2 === 1;
                      const isFinale = milestone.isFinale;

                      return (
                        <motion.li
                          key={milestone.title}
                          initial={{ opacity: 0, y: 45 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`relative grid items-center gap-12 md:grid-cols-2 md:gap-20 ${isEven ? "md:[direction:rtl]" : ""
                            } ${isFinale ? "p-[clamp(2rem,5vw,3rem)_0] relative" : ""}`}
                        >
                          {/* Milestone image */}
                          <figure
                            className={`relative md:[direction:ltr] ${isFinale ? "relative" : ""}`}
                            style={{ aspectRatio: "4 / 5" }}
                          >
                            {isFinale && (
                              <div className="pointer-events-none absolute inset-[-20%] z-[-1] blur-[40px] bg-[radial-gradient(at_50%_40%,rgba(255,205,157,0.35),transparent_65%)] animate-[proposal-pulse_8s_ease-in-out_infinite]" />
                            )}
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.6 }}
                              className={`relative h-full w-full rounded-sm overflow-hidden shadow-[var(--shadow-soft)] will-change-transform transition-shadow duration-600 ease-out ${milestone.tone || "tone-faded"
                                }`}
                            >
                              <Image
                                src={milestone.image}
                                alt={milestone.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={`object-cover w-full h-full block transition-transform duration-[2.4s] ease-[cubic-bezier(0.22,1,0.36,1)] transition-filter duration-[1.8s] ease-out scale-[1.08] ${milestone.tone === "tone-mono" ? "grayscale-[100%] contrast-[1.06] brightness-[0.94]" : milestone.tone === "tone-faded" ? "grayscale-[45%] sepia-[28%] saturate-[85%] contrast-[1.02] brightness-[0.98]" : milestone.tone === "tone-warm" ? "sepia-[22%] saturate-[108%] contrast-[1.04] brightness-[1.03]" : milestone.tone === "tone-full" ? "saturate-[118%] contrast-[1.06] brightness-[1.05]" : "grayscale-[45%] sepia-[28%] saturate-[85%] contrast-[1.02] brightness-[0.98]"}`}
                              />
                              <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay after:content-[''] after:pointer-events-none after:opacity-[0.05] after:mix-blend-overlay after:bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/></svg>')] after:absolute after:inset-0" />
                            </motion.div>
                          </figure>

                          {/* Milestone text */}
                          <div className="md:[direction:ltr]">
                            <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">
                              {milestone.date}
                            </p>
                            <h3
                              className={`mt-4 font-serif leading-[1.06] tracking-[-0.01em] text-[#2b2520] ${isFinale
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
                        </motion.li>
                      );
                    })}
                  </ol>

                  {/* Story Finale */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mx-auto mt-36 max-w-md pb-12 text-center flex flex-col items-center sm:mt-44"
                  >
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
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
