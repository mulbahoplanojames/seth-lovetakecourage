import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

export function Venue() {
  return (
    <section id="venue" className="scroll-mt-24 px-6 py-28 sm:py-36 lg:px-10">
      <div className="mx-auto mb-16 max-w-2xl text-center fade-up">
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">The Place</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl">
          Where it happens.
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </div>

      <p className="fade-up mx-auto max-w-xl text-center font-serif italic text-lg leading-relaxed text-[#7b6f66]">
        The celebration will take place at
      </p>

      <div className="mx-auto mt-16 grid max-w-5xl items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Venue Details Card */}
        <article className="fade-up flex flex-col items-center justify-center rounded-2xl border border-[#292420]/15 bg-white p-10 sm:p-14 text-center shadow-soft transition-all duration-500 hover:shadow-lift">
          {/* Decorative floral diamond motif */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="mb-8 h-10 w-10 text-[#292420]/40"
            aria-hidden="true"
          >
            <path
              d="M24 4C24 4 20 12 12 16C12 16 20 18 24 28C28 18 36 16 36 16C28 12 24 4 24 4Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M24 28C24 28 18 34 10 32C10 32 16 38 24 44C32 38 38 32 38 32C30 34 24 28 24 28Z"
              fill="currentColor"
              opacity="0.4"
            />
            <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.8" />
          </svg>

          <p className="text-[0.6rem] uppercase tracking-editorial text-[#7b6f66]">
            {weddingData.venue.type}
          </p>
          <h3 className="mt-4 font-serif text-4xl uppercase tracking-[0.06em] sm:text-5xl">
            {weddingData.venue.name}
          </h3>
          <p className="mt-3 font-serif text-lg italic text-[#7b6f66]">
            {weddingData.venue.city}
          </p>
          <p className="mt-2 text-sm text-[#7b6f66]/80">
            {weddingData.venue.address}
          </p>

          <a
            href={weddingData.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#292420] bg-white px-8 py-3.5 text-[0.65rem] uppercase tracking-editorial text-[#292420] transition-all hover:bg-[#292420] hover:text-white"
          >
            Open in Maps
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </article>

        {/* Right Venue Imagery */}
        <figure className="fade-up overflow-hidden rounded-2xl shadow-soft relative min-h-[28rem]">
          <Image
            src={weddingData.venue.image}
            alt="Jalia Hall wedding venue"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </figure>
      </div>
    </section>
  );
}
