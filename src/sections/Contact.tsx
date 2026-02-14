/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef, useEffect } from "react";
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
  const infoRef = useRef<HTMLDivElement>(null);
  const customSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Info Column (Left)
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

      // Animate Customization Section (Right)
      gsap.fromTo(
        customSectionRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          delay: 0.4,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden rounded-2xl relative"
      style={{ backgroundColor: COLORS.CHAMPAGNE, color: COLORS.ESPRESSO }}
    >
      {/* Decorative Noise Texture */}
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
          <div className="mb-8 md:mb-12">
            <span className="text-[#CD9860] text-[10px] font-bold tracking-[0.25em] uppercase block mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-5xl font-serif leading-[0.9] mb-4">
              Let's Craft <br /> Your Story.
            </h1>
            <p className="opacity-70 text-sm md:text-base leading-relaxed font-light max-w-xs">
              Have a general inquiry or just want to say hello? We are all ears.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">
                Visit The Studio
              </h4>
              <p className="font-serif text-base md:text-lg leading-snug">
                Walfort City, Bhatagaon, Raipur
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">
                Direct Contact
              </h4>
              <a
                href="tel:+919303410393"
                className="font-mono text-sm md:text-base hover:text-[#CD9860] transition-colors w-fit"
              >
                +91 93034 10393
              </a>
              <a
                href="mailto:hello@email.com"
                className="font-mono text-sm md:text-base hover:text-[#CD9860] transition-colors w-fit"
              >
                craftologywithanupama01@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-4 md:mt-12 flex gap-6 items-center flex-wrap">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/craftologywithanupama?igsh=MXVpcW1uZGVpM2Nv"
            className="group transition-transform hover:scale-110"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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

          {/* Pinterest */}
          <a
            href="https://in.pinterest.com/agarwalanupama78/"
            className="group transition-transform hover:scale-110"
            aria-label="Pinterest"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#371E10] group-hover:text-[#CD9860] transition-colors"
            >
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.852-2.433-4.587 0-3.725 2.705-7.149 7.824-7.149 4.105 0 7.296 2.926 7.296 6.845.033 4.106-2.581 7.412-6.164 7.412-1.205 0-2.336-.625-2.724-1.365l-.74 2.82c-.266 1.026-.992 2.308-1.474 3.09 1.107.331 2.274.509 3.476.509 6.621 0 11.987-5.367 11.987-11.987C23.97 5.39 18.594.026 12.017 0z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@craftologywithanupama"
            className="group transition-transform hover:scale-110"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#371E10] group-hover:text-[#CD9860] transition-colors"
            >
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/craftologywithanupama"
            className="group transition-transform hover:scale-110"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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
        </div>
      </div>

      {/* --- RIGHT COLUMN: CUSTOMIZATION SECTION (60%) --- */}
      <div
        ref={customSectionRef}
        className="w-full md:w-3/5 p-8 md:p-20 flex flex-col justify-center items-center text-center relative z-10"
        style={{ backgroundColor: COLORS.ESPRESSO }}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

        <div className="relative z-10 max-w-md">
          <span className="text-[#CD9860] text-xs font-bold tracking-[0.3em] uppercase block mb-6">
            Custom Orders & Bulk Gifting
          </span>

          <h2 className="text-4xl md:text-6xl font-serif text-[#F9F0EB] leading-[1.1] mb-8">
            Customize <br /> Your Gifts.
          </h2>

          <p className="text-[#F9F0EB] opacity-70 text-base md:text-lg font-light leading-relaxed mb-12">
            From bespoke scrapbooks to wedding envelopes, we specialize in
            making your gifts personal. Chat with us directly.
          </p>

          <a
            href="https://wa.me/919303410393?text=Hi! I'm interested in customizing a gift."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-4 bg-[#CD9860] text-[#371E10] py-5 px-10 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F9F0EB] transition-all duration-500 shadow-2xl hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            </svg>
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
