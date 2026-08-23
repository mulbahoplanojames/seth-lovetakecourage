"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export function Registry() {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDrawer();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDrawer]);

  return (
    <section
      id="registry"
      className="scroll-mt-24 w-full px-6 py-36 sm:py-48 lg:py-56 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-20 max-w-2xl text-center flex flex-col items-center"
      >
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">With Gratitude</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl text-[#2b2520]">
          Registry
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mx-auto max-w-2xl text-center leading-relaxed text-[#7b6f66]"
      >
        {weddingData.registry.intro}
      </motion.p>

      {/* Centered Action Cards */}
      <div className="mx-auto mt-16 grid w-full max-w-4xl gap-6 sm:grid-cols-2">
        {/* The Home Card */}
        <motion.button
          type="button"
          onClick={openDrawer}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.99 }}
          className="group flex flex-col items-center border border-border bg-white p-12 text-center shadow-soft transition-shadow duration-300 hover:shadow-lift cursor-pointer text-left w-full rounded-sm"
        >
          <h3 className="font-serif text-3xl text-foreground">The Home</h3>
          <p className="mt-4 text-sm leading-relaxed text-[#7b6f66]">
            Helping us turn a house into a home.
          </p>
          <span className="mt-8 text-[0.65rem] uppercase tracking-editorial text-foreground transition-colors group-hover:text-[#a89988]">
            View →
          </span>
        </motion.button>

        {/* The Honeymoon Card */}
        <motion.a
          href="#gifting"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.99 }}
          className="group flex flex-col items-center border border-border bg-white p-12 text-center shadow-soft transition-shadow duration-300 hover:shadow-lift rounded-sm"
        >
          <h3 className="font-serif text-3xl text-foreground">The Honeymoon</h3>
          <p className="mt-4 text-sm leading-relaxed text-[#7b6f66]">
            A contribution toward our honeymoon getaway.
          </p>
          <span className="mt-8 text-[0.65rem] uppercase tracking-editorial text-foreground transition-colors group-hover:text-[#a89988]">
            Visit →
          </span>
        </motion.a>
      </div>

      {/* Slide-over Drawer for The Home Registry with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#292420]/40 backdrop-blur-sm"
              onClick={closeDrawer}
            />

            {/* Slide-in Sheet */}
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-screen max-w-2xl bg-[#fdfaf4] shadow-2xl flex flex-col"
              >
                {/* Header */}
                <div className="p-8 sm:p-10 border-b border-border flex items-start justify-between bg-[#fdfaf4]">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">
                      With Gratitude
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl text-[#2b2520] mt-1">
                      The Home Registry
                    </h2>
                  </div>
                  <button
                    onClick={closeDrawer}
                    aria-label="Close registry"
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-[#f4ece1] transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Scrollable body with categorized items */}
                <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-12">
                  <p className="text-sm leading-relaxed text-[#7b6f66]">
                    {weddingData.registry.intro}
                  </p>

                  {weddingData.registry.categories.map((category, idx) => (
                    <section key={category.label} className="space-y-6">
                      <div className="border-b border-border/60 pb-3">
                        <p className="text-[0.6rem] uppercase tracking-editorial text-[#a89988]">
                          Category {idx + 1} of {weddingData.registry.categories.length}
                        </p>
                        <h3 className="font-serif text-2xl text-[#2b2520] mt-1">{category.label}</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                        {category.items.map((item) => (
                          <motion.article
                            key={item.name}
                            whileHover={{ y: -4 }}
                            className="bg-white border border-border rounded-lg overflow-hidden flex flex-col shadow-sm"
                          >
                            <div className="relative aspect-square w-full bg-[#f4ece1]/40">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="200px"
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                              <span className="text-[0.55rem] uppercase tracking-editorial text-[#a89988]">
                                {item.category}
                              </span>
                              <h4 className="font-serif text-base text-[#2b2520] mt-1 leading-snug">
                                {item.name}
                              </h4>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
