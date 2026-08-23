


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#schedule", label: "Schedule" },
  { href: "#venue", label: "Venue" },
  { href: "#registry", label: "Registry" },
  { href: "#gifting", label: "Gifting" },
  { href: "#attire", label: "Attire" },
  { href: "#rsvp", label: "RSVP" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-[#fdfaf4]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-6.5"
        : "bg-transparent py-6.5"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#home"
          className="inline-flex items-center gap-2 font-serif text-lg tracking-wide text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="sr-only">Home</span>
          <div className="relative h-7 w-7">
            <Image
              src={weddingData.couple.monogramUrl}
              alt="C & A Monogram"
              fill
              className="object-contain"
            />
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.7rem] uppercase tracking-wide-sm text-foreground/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative py-2 transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-foreground after:transition-all ${isActive ? "text-foreground after:w-full" : "after:w-0 hover:after:w-full"
                      }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5 focus:outline-none"
        >
          <span
            className={`block h-px w-5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile dropdown drawer */}
      <div
        className={`lg:hidden overflow-hidden bg-[#fdfaf4]/95 backdrop-blur-md transition-[max-height] duration-500 ease-in-out ${mobileMenuOpen ? "max-h-96 border-b border-border/60 shadow-lg" : "max-h-0"
          }`}
      >
        <ul className="flex flex-col px-6 py-4 text-[0.78rem] uppercase tracking-wide-sm">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-border/40 last:border-b-0">
              <a
                href={link.href}
                onClick={closeMobileMenu}
                className="block py-3.5 text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}