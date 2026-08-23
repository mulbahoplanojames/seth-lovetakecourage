"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export function Attire() {
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);

  const handleSwatchClick = (name: string) => {
    setSelectedSwatch((curr) => (curr === name ? null : name));
  };

  return (
    <section
      id="attire"
      className="scroll-mt-24 w-full px-6 py-36 sm:py-48 lg:py-56 bg-[#f4ece1]/40 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-20 max-w-2xl text-center flex flex-col items-center"
      >
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Dress Code</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl text-[#2b2520]">
          Attire
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-5xl flex flex-col items-center text-center">
        <div className="pointer-events-none absolute inset-x-0 -top-[10%] h-1/2 bg-[radial-gradient(80%_60%_at_50%_0,rgba(238,219,193,0.25),transparent_70%)] animate-[attire-glow-anim_12s_ease-in-out_infinite]" aria-hidden="true" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto max-w-xl text-center font-serif text-lg italic leading-relaxed text-[#7b6f66] sm:text-xl"
        >
          {weddingData.attire.statement}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl text-center font-serif text-xl italic leading-[1.8] text-foreground/90 sm:mt-16 sm:text-2xl"
        >
          {weddingData.attire.description}
        </motion.p>

        {/* The Palette with organic swatches */}
        <div className="mx-auto mt-20 w-full max-w-4xl sm:mt-24 flex flex-col items-center">
          <p className="text-center text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">
            The palette
          </p>

          <ul
            className="attire-palette mt-12 flex flex-wrap items-end justify-center gap-x-8 gap-y-12 sm:gap-x-12 lg:gap-x-16"
            role="list"
            aria-label="Dress code color palette"
          >
            {weddingData.attire.palette.map((swatch, idx) => {
              const isSelected = selectedSwatch === swatch.name;
              return (
                <motion.li
                  key={swatch.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <motion.button
                    type="button"
                    whileHover={{ y: -6, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSwatchClick(swatch.name)}
                    className="relative cursor-pointer will-change-transform border border-[rgba(123,111,102,0.2)] rounded-[50%_48%_52%_50%_/_48%_50%_50%_52%] w-[5.25rem] h-[5.25rem] p-0 transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] transition-box-shadow duration-[500ms] ease-out shadow-[inset_0_1px_4px_rgba(255,255,255,0.35),0_12px_32px_-12px_rgba(49,38,32,0.16)] hover:shadow-[inset_0_1px_6px_rgba(255,255,255,0.4),0_0_0_1px_#ddd6cf,0_0_36px_-6px_var(--swatch),0_20px_44px_-16px_rgba(49,38,32,0.2)] hover:-translate-y-5 hover:outline-none focus-visible:shadow-[inset_0_1px_6px_rgba(255,255,255,0.4),0_0_0_1px_#ddd6cf,0_0_36px_-6px_var(--swatch),0_20px_44px_-16px_rgba(49,38,32,0.2)] focus-visible:-translate-y-5 focus-visible:outline-none aria-pressed:shadow-[inset_0_1px_6px_rgba(255,255,255,0.4),0_0_0_1px_#ddd6cf,0_0_36px_-6px_var(--swatch),0_20px_44px_-16px_rgba(49,38,32,0.2)] aria-pressed:-translate-y-5 aria-pressed:outline-none"
                    style={
                      {
                        "--swatch": swatch.hex,
                        backgroundColor: swatch.hex,
                      } as React.CSSProperties
                    }
                    aria-label={`${swatch.name} — ${swatch.hex}`}
                    aria-pressed={isSelected}
                  >
                    <span className="rounded-[inherit] pointer-events-none bg-gradient-to-br from-[rgba(255,255,255,0.4)] to-transparent absolute inset-0" aria-hidden="true" />
                    <span className="rounded-[inherit] opacity-[0.25] pointer-events-none bg-[repeating-linear-gradient(-24deg,transparent_0%_4px,rgba(67,56,49,0.04)_4px_5px)] absolute inset-0" aria-hidden="true" />
                  </motion.button>
                  <span className="mt-4 text-center text-[0.65rem] uppercase tracking-editorial text-[#7b6f66] font-medium">
                    {swatch.name}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Guidelines for Women & Men */}
        <div className="mx-auto mt-24 grid w-full max-w-4xl gap-px overflow-hidden border border-border bg-border sm:mt-28 sm:grid-cols-2 shadow-soft rounded-sm text-left">
          {/* Women */}
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background p-10 sm:p-14"
          >
            <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Women</p>
            <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#2b2520]">
              {weddingData.attire.women.title}
            </h3>
            <div className="mt-6 h-px w-10 bg-border" />
            <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#7b6f66]">
              {weddingData.attire.women.guidelines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>

          {/* Men */}
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background p-10 sm:p-14"
          >
            <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Men</p>
            <h3 className="mt-4 font-serif text-2xl sm:text-3xl text-[#2b2520]">
              {weddingData.attire.men.title}
            </h3>
            <div className="mt-6 h-px w-10 bg-border" />
            <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-[#7b6f66]">
              {weddingData.attire.men.guidelines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        </div>

        {/* Note on tones to avoid */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-16 max-w-md text-center text-[0.65rem] uppercase tracking-editorial text-[#a89988] sm:mt-20"
        >
          {weddingData.attire.note}
        </motion.p>
      </div>
    </section>
  );
}
