"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
    <section id="registry" className="scroll-mt-24 px-6 py-28 sm:py-36 lg:px-10">
      <div className="mx-auto mb-20 max-w-2xl text-center fade-up">
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">With Gratitude</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl">
          Registry
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </div>

      <p className="fade-up mx-auto max-w-2xl text-center leading-relaxed text-[#7b6f66]">
        {weddingData.registry.intro}
      </p>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {/* The Home Card */}
        <button
          type="button"
          onClick={openDrawer}
          className="fade-up group flex flex-col items-center border border-border bg-white p-10 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift cursor-pointer text-left w-full"
        >
          <h3 className="font-serif text-2xl text-foreground">The Home</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#7b6f66]">
            Helping us turn a house into a home.
          </p>
          <span className="mt-6 text-[0.65rem] uppercase tracking-editorial text-foreground transition-colors group-hover:text-[#a89988]">
            View →
          </span>
        </button>

        {/* The Honeymoon Card */}
        <a
          href="#gifting"
          className="fade-up group flex flex-col items-center border border-border bg-white p-10 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
        >
          <h3 className="font-serif text-2xl text-foreground">The Honeymoon</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#7b6f66]">
            A contribution toward our honeymoon getaway.
          </p>
          <span className="mt-6 text-[0.65rem] uppercase tracking-editorial text-foreground transition-colors group-hover:text-[#a89988]">
            Visit →
          </span>
        </a>
      </div>

      {/* Slide-over Drawer for The Home Registry */}
      <div
        className={`reg-backdrop ${isOpen ? "reg-backdrop--in" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="The Home Registry"
        onClick={closeDrawer}
      >
        <div
          className={`reg-sheet ${isOpen ? "reg-sheet--in" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="reg-header">
            <p className="reg-header__eyebrow">With Gratitude</p>
            <h2 className="reg-header__title">The Home Registry</h2>
            <button
              className="reg-close"
              onClick={closeDrawer}
              aria-label="Close registry"
              type="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable body with categorized items */}
          <div className="reg-body">
            <div className="reg-intro">
              <p className="reg-intro__text">{weddingData.registry.intro}</p>
            </div>

            {weddingData.registry.categories.map((category, idx) => (
              <section key={category.label} className="reg-cat">
                <div className="reg-cat__header">
                  <p className="reg-cat__eyebrow">
                    Category {idx + 1} of {weddingData.registry.categories.length}
                  </p>
                  <h3 className="reg-cat__title">{category.label}</h3>
                </div>

                <div className="reg-grid">
                  {category.items.map((item) => (
                    <article key={item.name} className="reg-card">
                      <div className="relative aspect-square w-full bg-[#f4ece1]/50 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="200px"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="reg-card__body">
                        <span className="reg-card__cat">{item.category}</span>
                        <h4 className="reg-card__name">{item.name}</h4>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
