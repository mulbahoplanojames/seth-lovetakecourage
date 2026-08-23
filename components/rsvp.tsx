"use client";

import { useState } from "react";
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
    <section id="rsvp" className="scroll-mt-24 px-6 py-28 sm:py-36 lg:px-10 bg-[#f4ece1]/40">
      <div className="mx-auto mb-16 max-w-2xl text-center fade-up">
        <p className="text-[0.65rem] uppercase tracking-editorial text-[#7b6f66]">Kindly Reply</p>
        <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.08em] sm:text-5xl lg:text-6xl">
          RSVP
        </h2>
        <div className="mx-auto mt-8 h-px w-16 bg-foreground/30" />
      </div>

      <div className="mx-auto max-w-2xl">
        <p className="text-center font-serif text-lg italic leading-relaxed text-[#7b6f66]">
          We cannot wait to celebrate with you.
        </p>
        <p className="mt-3 text-center text-sm leading-relaxed text-[#7b6f66]">
          Please respond by {weddingData.rsvp.deadline}.
        </p>

        <form onSubmit={handleSubmit} className="fade-up mt-12 space-y-10" noValidate>
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
          <div className="rsvp-field group">
            <label htmlFor="name" className="rsvp-field__label">
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
              className="rsvp-input"
            />
          </div>

          {/* Email Address */}
          <div className="rsvp-field group">
            <label htmlFor="email" className="rsvp-field__label">
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
              className="rsvp-input"
            />
          </div>

          {/* Phone Number */}
          <div className="rsvp-field group">
            <label htmlFor="phone" className="rsvp-field__label">
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
              className="rsvp-input"
            />
          </div>

          {/* Attendance */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="rsvp-field group">
              <label htmlFor="attending" className="rsvp-field__label">
                Attendance<span className="sr-only"> (required)</span>
              </label>
              <select
                id="attending"
                name="attending"
                required
                value={formData.attending}
                onChange={handleChange}
                className="rsvp-input rsvp-select"
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
          <div className="rsvp-field group">
            <label htmlFor="message" className="rsvp-field__label">
              A Message to the Couple
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder={weddingData.rsvp.messagePrompt}
              value={formData.message}
              onChange={handleChange}
              className="rsvp-input rsvp-textarea"
            />
          </div>

          {status === "error" && (
            <p className="rsvp-field__error text-center">{errorMessage}</p>
          )}

          {/* Submit CTA */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rsvp-submit group inline-flex items-center gap-4 disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <span className="rsvp-spinner" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send Reply</span>
                  <span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal Confirmation */}
      {status === "success" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#292420]/40 backdrop-blur-sm p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-xl bg-[#fdfaf4] p-10 text-center shadow-2xl border border-border">
            <h3 className="font-serif text-3xl text-foreground">Thank You</h3>
            <p className="mt-4 font-serif text-lg italic text-[#7b6f66] leading-relaxed">
              {formData.attending === "yes"
                ? "We look forward to celebrating with you!"
                : "Thank you for letting us know. You will be missed dearly."}
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-8 inline-flex items-center justify-center border border-foreground px-8 py-3 text-[0.65rem] uppercase tracking-editorial text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
