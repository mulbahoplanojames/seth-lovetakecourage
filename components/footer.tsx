"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-28 sm:py-36 text-center flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex flex-col items-center max-w-xl"
      >
        <div className="inline-flex items-center justify-center">
          <div className="relative h-24 w-36">
            <Image
              src={weddingData.couple.monogramUrl}
              alt="C & A monogram"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="mt-8 font-serif text-2xl italic text-[#7b6f66]">
          {weddingData.couple.partnerOne} &amp; {weddingData.couple.partnerTwo}
        </p>
        <p className="mt-3 text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">
          {weddingData.eventDate.displayDate} — {weddingData.eventDate.city}, {weddingData.eventDate.country}
        </p>
        <div className="mx-auto mt-10 h-px w-24 bg-border" />
        <p className="mt-10 text-[0.89rem] uppercase tracking-editorial text-[#a89988]">
          {weddingData.couple.hashtag}
        </p>
      </motion.div>
    </footer>
  );
}
