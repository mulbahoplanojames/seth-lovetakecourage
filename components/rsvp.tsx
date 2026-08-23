"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export function Rsvp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attending: "",
    message: "",
    website: "", // honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.attending) {
      setErrorMessage("Please complete all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // Simulate reliable submission
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      attending: "",
      message: "",
      website: "",
    });
    setStatus("idle");
  };

  return (
    <section
      id="rsvp"
      className="scroll-mt-24 w-full px-6 py-36 sm:py-48 lg:py-56 bg-[#f4ece1]/40 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-16 max-w-2xl text-center flex flex-col items-center"
      >
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Kindly Reply</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl text-[#2b2520]">
          RSVP
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </motion.div>

      <div className="mx-auto w-full max-w-2xl flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-lg italic leading-relaxed text-[#7b6f66]"
        >
          We cannot wait to celebrate with you.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 text-center text-sm leading-relaxed text-[#7b6f66]"
        >
          Please respond by {weddingData.rsvp.deadline}.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 w-full space-y-12"
          noValidate
        >
          {/* Honeypot field for bot protection */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {/* Full Name */}
          <div className="relative group">
            <label htmlFor="name" className="block mb-3 text-[0.6rem] uppercase tracking-[0.32em] text-[#7b6f66] transition-colors duration-[350ms] ease-out group-focus-within:text-[#2b2520]">
              Full Name<span className="sr-only"> (required)</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="e.g. Astride Umutesi"
              value={formData.name}
              onChange={handleChange}
              className="border-none border-b border-[#e3d9cc] w-full text-[#2b2520] bg-transparent outline-none py-[0.85rem] text-base font-light transition-border-color duration-[400ms] ease-out transition-box-shadow duration-[400ms] ease-out transition-transform duration-[400ms] ease-out placeholder:text-[#ada29a] placeholder:italic placeholder:font-serif focus:border-b-[#2b2520] focus:-translate-y-px focus:shadow-[0_1px_rgba(123,111,102,0.15)]"
            />
          </div>

          {/* Email Address */}
          <div className="relative group">
            <label htmlFor="email" className="block mb-3 text-[0.6rem] uppercase tracking-[0.32em] text-[#7b6f66] transition-colors duration-[350ms] ease-out group-focus-within:text-[#2b2520]">
              Email Address<span className="sr-only"> (required)</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="e.g. name@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="border-none border-b border-[#e3d9cc] w-full text-[#2b2520] bg-transparent outline-none py-[0.85rem] text-base font-light transition-border-color duration-[400ms] ease-out transition-box-shadow duration-[400ms] ease-out transition-transform duration-[400ms] ease-out placeholder:text-[#ada29a] placeholder:italic placeholder:font-serif focus:border-b-[#2b2520] focus:-translate-y-px focus:shadow-[0_1px_rgba(123,111,102,0.15)]"
            />
          </div>

          {/* Phone Number */}
          <div className="relative group">
            <label htmlFor="phone" className="block mb-3 text-[0.6rem] uppercase tracking-[0.32em] text-[#7b6f66] transition-colors duration-[350ms] ease-out group-focus-within:text-[#2b2520]">
              Phone Number (optional)
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+250 ..."
              value={formData.phone}
              onChange={handleChange}
              className="border-none border-b border-[#e3d9cc] w-full text-[#2b2520] bg-transparent outline-none py-[0.85rem] text-base font-light transition-border-color duration-[400ms] ease-out transition-box-shadow duration-[400ms] ease-out transition-transform duration-[400ms] ease-out placeholder:text-[#ada29a] placeholder:italic placeholder:font-serif focus:border-b-[#2b2520] focus:-translate-y-px focus:shadow-[0_1px_rgba(123,111,102,0.15)]"
            />
          </div>

          {/* Attendance */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="relative group">
              <label htmlFor="attending" className="block mb-3 text-[0.6rem] uppercase tracking-[0.32em] text-[#7b6f66] transition-colors duration-[350ms] ease-out group-focus-within:text-[#2b2520]">
                Attendance<span className="sr-only"> (required)</span>
              </label>
              <select
                id="attending"
                name="attending"
                required
                value={formData.attending}
                onChange={handleChange}
                className="border-none border-b border-[#e3d9cc] w-full text-[#2b2520] bg-transparent outline-none py-[0.85rem] text-base font-light transition-border-color duration-[400ms] ease-out transition-box-shadow duration-[400ms] ease-out transition-transform duration-[400ms] ease-out placeholder:text-[#ada29a] placeholder:italic placeholder:font-serif focus:border-b-[#2b2520] focus:-translate-y-px focus:shadow-[0_1px_rgba(123,111,102,0.15)] cursor-pointer appearance-none"
                style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 50%, var(--taupe) 50%), linear-gradient(135deg, var(--taupe) 50%, transparent 50%)',
                  backgroundPosition: 'calc(100% - 18px) calc(50% + 2px), calc(100% - 12px) calc(50% + 2px)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '6px 6px, 6px 6px'
                }}
              >
                <option value="" disabled>
                  Select…
                </option>
                <option value="yes">Joyfully attending</option>
                <option value="no">Regretfully declining</option>
              </select>
            </div>
          </div>

          {/* Message to Couple */}
          <div className="relative group">
            <label htmlFor="message" className="block mb-3 text-[0.6rem] uppercase tracking-[0.32em] text-[#7b6f66] transition-colors duration-[350ms] ease-out group-focus-within:text-[#2b2520]">
              A Message to the Couple
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={weddingData.rsvp.messagePrompt}
              value={formData.message}
              onChange={handleChange}
              className="border-none border-b border-[#e3d9cc] w-full text-[#2b2520] bg-transparent outline-none py-[0.85rem] text-base font-light transition-border-color duration-[400ms] ease-out transition-box-shadow duration-[400ms] ease-out transition-transform duration-[400ms] ease-out placeholder:text-[#ada29a] placeholder:italic placeholder:font-serif focus:border-b-[#2b2520] focus:-translate-y-px focus:shadow-[0_1px_rgba(123,111,102,0.15)] resize-y min-h-[5rem] leading-[1.7]"
            />
          </div>

          {status === "error" && (
            <p className="text-center">{errorMessage}</p>
          )}

          {/* Submit CTA */}
          <div className="pt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "submitting"}
              className="border border-[#2b2520] tracking-[0.32em] uppercase text-[#2b2520] cursor-pointer bg-transparent px-10 py-4 text-[0.7rem] transition-background-color duration-[450ms] ease-out transition-color duration-[450ms] ease-out transition-opacity duration-[350ms] ease-out group inline-flex items-center gap-4 disabled:opacity-60 hover:bg-[#2b2520] hover:text-[#fdfaf4]"
            >
              {status === "submitting" ? (
                <>
                  <span className="border border-current border-r-transparent rounded-full w-[0.85rem] h-[0.85rem] animate-[rsvp-spin_0.8s_linear_infinite] inline-block" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send Reply</span>
                  <span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Success Modal Confirmation via Framer Motion */}
      <AnimatePresence>
        {status === "success" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#292420]/40 backdrop-blur-sm"
              onClick={resetForm}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-xl bg-[#fdfaf4] p-10 text-center shadow-2xl border border-border"
            >
              <h3 className="font-serif text-3xl text-foreground">Thank You</h3>
              <p className="mt-4 font-serif text-lg italic text-[#7b6f66] leading-relaxed">
                {formData.attending === "yes"
                  ? "We look forward to celebrating with you!"
                  : "Thank you for letting us know. You will be missed dearly."}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-8 inline-flex items-center justify-center border border-foreground px-8 py-3 text-[0.65rem] uppercase tracking-editorial text-foreground hover:bg-foreground hover:text-background transition-colors rounded-sm"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
