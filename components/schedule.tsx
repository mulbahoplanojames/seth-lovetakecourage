"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export function Schedule() {
  return (
    <section
      id="schedule"
      className="scroll-mt-24 w-full px-6 py-36 sm:py-48 lg:py-56 bg-[#f4ece1]/40 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-20 max-w-2xl text-center flex flex-col items-center"
      >
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">The Weekend</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl text-[#2b2520]">
          Schedule
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </motion.div>

      {/* Centered Schedule Cards */}
      <div className="mx-auto grid w-full max-w-5xl gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 md:grid-cols-3 shadow-soft rounded-sm">
        {weddingData.schedule.map((item, idx) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ backgroundColor: "#fdfbf7" }}
            className="flex flex-col gap-3.5 bg-background p-10 sm:p-12 transition-colors"
          >
            <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">{item.day}</p>
            <p className="font-serif text-2xl italic text-foreground">{item.time}</p>
            <h3 className="font-serif text-2xl text-[#2b2520]">{item.title}</h3>
            <p className="text-sm text-[#7b6f66]">{item.location}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
