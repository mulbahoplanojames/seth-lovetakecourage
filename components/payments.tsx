"use client";

import { useState } from "react";
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
    <section id="gifting" className="scroll-mt-24 px-6 py-28 sm:py-36 lg:px-10 bg-[#f4ece1]/40">
      <div className="mx-auto mb-20 max-w-2xl text-center fade-up">
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">A Gentle Note</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl">
          Payment Methods
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </div>

      <div
        onClick={toggleReveal}
        className="mx-auto max-w-xl cursor-pointer rounded-xl bg-[#fdfaf4] p-10 sm:p-14 text-center transition-all duration-500 ease-out shadow-soft hover:shadow-lift border border-[#292420]/20"
      >
        <h3 className="text-[0.7rem] uppercase tracking-editorial text-[#7b6f66]">Payment Methods</h3>

        {/* Collapsed view prompt */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            isRevealed ? "max-h-0 opacity-0 mt-0" : "max-h-40 opacity-100 mt-6"
          }`}
        >
          <p className="font-script text-3xl text-[#292420]/70">Tap to reveal →</p>
        </div>

        {/* Expanded detailed payment accounts */}
        <div
          className={`overflow-hidden text-left transition-all duration-500 ease-out ${
            isRevealed ? "max-h-[60rem] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
          }`}
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

          {/* Ecobank Account Details */}
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
        </div>
      </div>
    </section>
  );
}
