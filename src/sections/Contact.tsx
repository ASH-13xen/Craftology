/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
  WHITE: "#FFFFFF",
};

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Info Column
      gsap.fromTo(
        infoRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // Animate Form Inputs
      gsap.fromTo(
        formRef.current?.children || [],
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section
      ref={containerRef}
      className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden rounded-2xl relative"
      style={{ backgroundColor: COLORS.CHAMPAGNE, color: COLORS.ESPRESSO }}
    >
      {/* --- DECORATIVE NOISE TEXTURE (Covers Entire Section) --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* --- LEFT COLUMN: INFO (40%) --- */}
      <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col gap-8 md:justify-between border-b md:border-b-0 md:border-r border-[#371E10]/10 relative z-10 shrink-0">
        <div ref={infoRef}>
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <span className="text-[#CD9860] text-[10px] font-bold tracking-[0.25em] uppercase block mb-3">
              Get in Touch
            </span>
            {/* Reduced Headline Size */}
            <h1 className="text-3xl md:text-5xl font-serif leading-[0.9] mb-4">
              Let's Craft <br /> Your Story.
            </h1>
            {/* Reduced Body Text Size */}
            <p className="opacity-70 text-sm md:text-base leading-relaxed font-light max-w-xs">
              Have a custom idea? Looking for bulk gifting? Or just want to say
              hello? We are all ears.
            </p>
          </div>

          {/* Details Grid */}
          <div className="space-y-6">
            {/* Address */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">
                Visit The Studio
              </h4>
              <p className="font-serif text-base md:text-lg leading-snug">
                12, Craftology Lane,
                <br />
                Hauz Khas Village,
                <br />
                New Delhi - 110016
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-1">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">
                Direct Contact
              </h4>
              <a
                href="tel:+919876543210"
                className="font-mono text-sm md:text-base hover:text-[#CD9860] transition-colors w-fit"
              >
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@craftology.in"
                className="font-mono text-sm md:text-base hover:text-[#CD9860] transition-colors w-fit"
              >
                hello@craftology.in
              </a>
            </div>
          </div>
        </div>

        {/* --- Social Icons Footer (SVG Icons) --- */}
        <div className="mt-4 md:mt-12 flex gap-6 items-center">
          {/* Instagram */}
          <a
            href="#"
            className="group transition-transform hover:scale-110"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#371E10] group-hover:text-[#CD9860] transition-colors"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            className="group transition-transform hover:scale-110"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#371E10] group-hover:text-[#CD9860] transition-colors"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* Pinterest */}
          <a
            href="#"
            className="group transition-transform hover:scale-110"
            aria-label="Pinterest"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#371E10] group-hover:text-[#CD9860] transition-colors"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {/* Note: Standard Pinterest SVG path varies, using a generic placeholder or you can use: */}
            {/* <path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0" /> ... */}
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-transform hover:scale-110"
            aria-label="WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#371E10] group-hover:text-[#CD9860] transition-colors"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            </svg>
          </a>
        </div>
      </div>

      {/* --- RIGHT COLUMN: FORM (60%) --- */}
      <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col justify-center relative z-10 bg-[#371E10]/[0.02]">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 h-full justify-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="group relative">
              <input
                type="text"
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-[#371E10]/20 py-3 text-base font-serif text-[#371E10] focus:outline-none focus:border-[#371E10] transition-colors"
              />
              <label className="absolute left-0 top-3 text-[#371E10]/40 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all peer-focus:-top-2 peer-focus:text-[9px] peer-focus:text-[#CD9860] peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-[#CD9860] pointer-events-none">
                Your Name
              </label>
            </div>

            <div className="group relative">
              <input
                type="email"
                required
                placeholder=" "
                className="peer w-full bg-transparent border-b border-[#371E10]/20 py-3 text-base font-serif text-[#371E10] focus:outline-none focus:border-[#371E10] transition-colors"
              />
              <label className="absolute left-0 top-3 text-[#371E10]/40 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all peer-focus:-top-2 peer-focus:text-[9px] peer-focus:text-[#CD9860] peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-[#CD9860] pointer-events-none">
                Email Address
              </label>
            </div>
          </div>

          <div className="group relative">
            <input
              type="text"
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b border-[#371E10]/20 py-3 text-base font-serif text-[#371E10] focus:outline-none focus:border-[#371E10] transition-colors"
            />
            <label className="absolute left-0 top-3 text-[#371E10]/40 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all peer-focus:-top-2 peer-focus:text-[9px] peer-focus:text-[#CD9860] peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-[#CD9860] pointer-events-none">
              Subject
            </label>
          </div>

          <div className="group relative flex-grow">
            <textarea
              required
              placeholder=" "
              className="peer w-full h-full min-h-[120px] bg-transparent border border-[#371E10]/10 p-3 text-base font-serif text-[#371E10] focus:outline-none focus:border-[#371E10]/40 transition-colors resize-none rounded-sm"
            />
            <label className="absolute left-3 top-3 text-[#371E10]/40 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all peer-focus:-top-2.5 peer-focus:left-0 peer-focus:text-[9px] peer-focus:text-[#CD9860] peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-0 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-[#CD9860] pointer-events-none bg-[#F2E6D8] px-1">
              Tell us about your requirement...
            </label>
          </div>

          <button
            type="submit"
            disabled={formStatus !== "idle"}
            className="w-full py-4 bg-[#371E10] text-[#F9F0EB] text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[#CD9860] disabled:bg-[#371E10]/50 transition-all duration-300 mt-2 flex items-center justify-center gap-3"
          >
            {formStatus === "idle" && (
              <>
                <span>Send Message</span>
                <span className="text-base">→</span>
              </>
            )}
            {formStatus === "sending" && <span>Sending...</span>}
            {formStatus === "sent" && <span>Message Sent!</span>}
          </button>
        </form>
      </div>
    </section>
  );
}
