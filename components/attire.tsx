"use client";

import { useState } from "react";
import { weddingData } from "@/lib/wedding-data";

export function Attire() {
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);

  const handleSwatchClick = (name: string) => {
    setSelectedSwatch((curr) => (curr === name ? null : name));
  };

  return (
    <section id="attire" className="scroll-mt-24 px-6 py-28 sm:py-36 lg:px-10 bg-[#f4ece1]/40">
      <div className="mx-auto mb-20 max-w-2xl text-center fade-up">
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Dress Code</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl">
          Attire
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </div>

      <div className="attire-editorial relative mx-auto max-w-6xl">
        <div className="attire-glow" aria-hidden="true" />

        <p className="fade-up mx-auto max-w-xl text-center font-serif text-lg italic leading-relaxed text-[#7b6f66] sm:text-xl">
          {weddingData.attire.statement}
        </p>

        <p className="fade-up mx-auto mt-12 max-w-2xl text-center font-serif text-xl italic leading-[1.8] text-foreground/90 sm:mt-16 sm:text-2xl">
          {weddingData.attire.description}
        </p>

        {/* The Palette with organic swatches */}
        <div className="fade-up mx-auto mt-20 max-w-4xl sm:mt-24">
          <p className="text-center text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">
            The palette
          </p>

          <ul
            className="attire-palette mt-10 flex flex-wrap items-end justify-center gap-x-8 gap-y-10 sm:gap-x-10 lg:gap-x-14"
            role="list"
            aria-label="Dress code color palette"
          >
            {weddingData.attire.palette.map((swatch) => {
              const isSelected = selectedSwatch === swatch.name;
              return (
                <li key={swatch.name} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => handleSwatchClick(swatch.name)}
                    className="attire-swatch relative"
                    style={
                      {
                        "--swatch": swatch.hex,
                        backgroundColor: swatch.hex,
                      } as React.CSSProperties
                    }
                    aria-label={`${swatch.name} — ${swatch.hex}`}
                    aria-pressed={isSelected}
                  >
                    <span className="attire-swatch__sheen" aria-hidden="true" />
                    <span className="attire-swatch__texture" aria-hidden="true" />
                  </button>
                  <span className="mt-4 text-center text-[0.6rem] uppercase tracking-editorial text-[#7b6f66]">
                    {swatch.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Guidelines for Women & Men */}
        <div className="fade-up mx-auto mt-20 grid max-w-4xl gap-px overflow-hidden border border-border bg-border sm:mt-24 sm:grid-cols-2">
          {/* Women */}
          <article className="bg-background p-10 sm:p-12">
            <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Women</p>
            <h3 className="mt-4 font-serif text-2xl">{weddingData.attire.women.title}</h3>
            <div className="mt-6 h-px w-10 bg-border" />
            <ul className="mt-6 space-y-2 text-sm leading-relaxed text-[#7b6f66]">
              {weddingData.attire.women.guidelines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          {/* Men */}
          <article className="bg-background p-10 sm:p-12">
            <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Men</p>
            <h3 className="mt-4 font-serif text-2xl">{weddingData.attire.men.title}</h3>
            <div className="mt-6 h-px w-10 bg-border" />
            <ul className="mt-6 space-y-2 text-sm leading-relaxed text-[#7b6f66]">
              {weddingData.attire.men.guidelines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        {/* Note on tones to avoid */}
        <p className="fade-up mx-auto mt-16 max-w-md text-center text-[0.65rem] uppercase tracking-editorial text-[#a89988] sm:mt-20">
          {weddingData.attire.note}
        </p>
      </div>
    </section>
  );
}
