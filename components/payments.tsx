"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export function Payments() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2200);
  };

  const toggleReveal = () => {
    setIsRevealed((prev) => !prev);
  };

  return (
    <section
      id="gifting"
      className="scroll-mt-24 w-full px-6 py-36 sm:py-48 lg:py-56 bg-[#f4ece1]/40 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-20 max-w-2xl text-center flex flex-col items-center"
      >
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">A Gentle Note</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl text-[#2b2520]">
          Payment Methods
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </motion.div>

      {/* Centered Collapsible Card */}
      <motion.div
        onClick={toggleReveal}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="mx-auto w-full max-w-xl cursor-pointer rounded-xl bg-[#fdfaf4] p-10 sm:p-14 text-center transition-shadow duration-500 shadow-soft hover:shadow-lift border border-[#292420]/20"
      >
        <h3 className="text-[0.7rem] uppercase tracking-editorial text-[#7b6f66]">Payment Methods</h3>

        {/* Collapsed prompt */}
        <AnimatePresence initial={false}>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 overflow-hidden"
            >
              <p className="font-script text-3xl sm:text-4xl text-[#292420]/75">Tap to reveal →</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded accounts */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 overflow-hidden text-left"
            >
              {/* MOMO */}
              <p className="text-[0.6rem] uppercase tracking-editorial text-[#7b6f66] mb-3">MOMO</p>
              <div className="grid gap-4 pl-3 border-l border-[#292420]/20 mb-8">
                {weddingData.paymentMethods.momo.map((momo, idx) => {
                  const key = `momo-${idx}`;
                  const isCopied = copiedKey === key;
                  return (
                    <div key={momo.name}>
                      <span className="block text-[0.65rem] text-[#7b6f66]/80">{momo.name}</span>
                      <span className="mt-0.5 flex items-center font-mono text-sm tracking-wide text-foreground">
                        {momo.phone}
                        <button
                          type="button"
                          aria-label={`Copy ${momo.phone}`}
                          onClick={(e) => copyToClipboard(momo.phone.replace(/\s+/g, ""), key, e)}
                          className="ml-3 inline-flex items-center text-[0.6rem] uppercase tracking-editorial transition-colors text-[#a89988] hover:text-foreground"
                        >
                          {isCopied ? "Copied ✓" : "Copy"}
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* PayPal */}
              <p className="text-[0.6rem] uppercase tracking-editorial text-[#7b6f66] mb-3">PayPal</p>
              <div className="pl-3 border-l border-[#292420]/20 mb-8">
                <span className="flex items-center font-mono text-sm tracking-wide text-foreground">
                  {weddingData.paymentMethods.paypal.email}
                  <button
                    type="button"
                    aria-label="Copy PayPal email"
                    onClick={(e) =>
                      copyToClipboard(weddingData.paymentMethods.paypal.email, "paypal", e)
                    }
                    className="ml-3 inline-flex items-center text-[0.6rem] uppercase tracking-editorial transition-colors text-[#a89988] hover:text-foreground"
                  >
                    {copiedKey === "paypal" ? "Copied ✓" : "Copy"}
                  </button>
                </span>
              </div>

              {/* Account Details */}
              <p className="text-[0.6rem] uppercase tracking-editorial text-[#7b6f66] mb-3">
                Account Details
              </p>
              <div className="pl-3 border-l border-[#292420]/20 grid gap-1.5 mb-8">
                <span className="flex items-center font-mono text-sm tracking-wide text-foreground">
                  {weddingData.paymentMethods.ecobank.name}
                </span>
                <span className="flex items-center font-mono text-sm tracking-wide text-foreground">
                  {weddingData.paymentMethods.ecobank.accountNumber}
                  <button
                    type="button"
                    aria-label="Copy account number"
                    onClick={(e) =>
                      copyToClipboard(weddingData.paymentMethods.ecobank.accountNumber, "account", e)
                    }
                    className="ml-3 inline-flex items-center text-[0.6rem] uppercase tracking-editorial transition-colors text-[#a89988] hover:text-foreground"
                  >
                    {copiedKey === "account" ? "Copied ✓" : "Copy"}
                  </button>
                </span>
                <span className="block text-[0.6rem] text-[#7b6f66]/70 mt-0.5">
                  {weddingData.paymentMethods.ecobank.bankName}
                </span>
              </div>

              {/* UK Bank Transfer */}
              <p className="text-[0.6rem] uppercase tracking-editorial text-[#7b6f66] mb-3">
                UK Bank Transfer
              </p>
              <div className="pl-3 border-l border-[#292420]/20 grid gap-1.5">
                <span className="block font-mono text-sm tracking-wide text-foreground">
                  {weddingData.paymentMethods.ukBank.name}
                </span>
                <div className="flex items-center">
                  <span className="font-mono text-sm tracking-wide text-foreground">
                    {weddingData.paymentMethods.ukBank.iban}
                  </span>
                  <button
                    type="button"
                    aria-label="Copy IBAN"
                    onClick={(e) =>
                      copyToClipboard(weddingData.paymentMethods.ukBank.iban, "iban", e)
                    }
                    className="ml-3 inline-flex items-center text-[0.6rem] uppercase tracking-editorial transition-colors text-[#a89988] hover:text-foreground"
                  >
                    {copiedKey === "iban" ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="font-mono text-sm tracking-wide text-foreground">
                    {weddingData.paymentMethods.ukBank.bicSwift}
                  </span>
                  <button
                    type="button"
                    aria-label="Copy BIC/SWIFT"
                    onClick={(e) =>
                      copyToClipboard(weddingData.paymentMethods.ukBank.bicSwift, "bic", e)
                    }
                    className="ml-3 inline-flex items-center text-[0.6rem] uppercase tracking-editorial transition-colors text-[#a89988] hover:text-foreground"
                  >
                    {copiedKey === "bic" ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <span className="block text-[0.6rem] text-[#7b6f66]/70 mt-0.5">IBAN · BIC/SWIFT</span>
                <span className="block text-[0.6rem] text-[#7b6f66]/70 mt-2 leading-relaxed">
                  {weddingData.paymentMethods.ukBank.bankName},{" "}
                  {weddingData.paymentMethods.ukBank.address}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
