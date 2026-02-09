"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { nextWorkshop } from "@/data/workshopdata";

// --- DARK THEME PALETTE ---
const COLORS = {
  LINEN: "#1a0f0a", // Deepest Brown (Map Background)
  CHAMPAGNE: "#2C1810", // Rich Dark Brown (Main Card Background)
  ESPRESSO: "#F9F0EB", // Light Cream (Text Color)
  GOLD: "#CD9860", // Accent
};

export default function Workshop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Content Slide Up
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );

      // Animate Map Reveal
      gsap.fromTo(
        mapRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // MOBILE: flex-col, overflow-y-auto | DESKTOP: flex-row, overflow-hidden
      className="w-full h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden rounded-2xl relative"
      style={{ backgroundColor: COLORS.CHAMPAGNE, color: COLORS.ESPRESSO }}
    >
      {/* --- BACKGROUND TEXTURE --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* --- LEFT COLUMN: DETAILS (50%) --- */}
      {/* MOBILE: w-full, p-6 | DESKTOP: w-1/2, p-12 */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center relative z-10 border-b lg:border-b-0 lg:border-r border-[#F9F0EB]/10 shrink-0">
        <div
          ref={contentRef}
          className="flex flex-col h-full justify-between gap-8 lg:gap-0"
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#F9F0EB] text-[#2C1810] text-[9px] lg:text-[10px] font-bold tracking-widest uppercase rounded-full">
                Upcoming
              </span>
              <span className="text-[#CD9860] text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase">
                Workshop 01
              </span>
            </div>

            {/* Responsive Title Size */}
            <h1 className="text-3xl lg:text-7xl font-serif leading-[0.9] mb-4 lg:mb-6 text-[#F9F0EB]">
              {nextWorkshop.title}
            </h1>

            {/* Responsive Body Text */}
            <p className="text-sm lg:text-lg leading-relaxed opacity-80 font-serif font-light max-w-md mb-6 lg:mb-8 text-[#F9F0EB]/80">
              {nextWorkshop.description}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
              {nextWorkshop.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-[#CD9860]" />
                  <span className="text-[10px] lg:text-xs uppercase font-bold tracking-wider opacity-70">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-auto pt-6 lg:pt-8 border-t border-[#F9F0EB]/10">
            <div className="flex items-end justify-between mb-4 lg:mb-6">
              <div>
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-50 mb-1">
                  Date & Time
                </p>
                <p className="font-serif text-base lg:text-xl">
                  {nextWorkshop.date}
                </p>
                <p className="font-mono text-[10px] lg:text-sm opacity-70">
                  {nextWorkshop.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-50 mb-1">
                  Price
                </p>
                <p className="font-serif text-2xl lg:text-3xl text-[#CD9860]">
                  ₹{nextWorkshop.price}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/919876543210?text=I want to book a slot for ${nextWorkshop.title}`,
                  "_blank",
                )
              }
              className="w-full py-3 lg:py-4 bg-[#F9F0EB] text-[#2C1810] text-[10px] lg:text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#CD9860] hover:text-[#2C1810] transition-colors rounded-sm shadow-lg"
            >
              Book Your Slot
            </button>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: LOCATION & MAP (50%) --- */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col shrink-0 min-h-[400px] lg:min-h-0">
        {/* Top Image Half */}
        <div className="h-1/2 relative bg-[#1a0f0a] overflow-hidden border-b border-[#F9F0EB]/10">
          <Image
            src={nextWorkshop.image}
            alt="Workshop Vibe"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Bottom Map Half */}
        <div
          ref={mapRef}
          className="h-1/2 relative p-6 flex flex-col"
          style={{ backgroundColor: COLORS.LINEN }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-[10px] lg:text-sm font-bold uppercase tracking-widest text-[#CD9860]">
                Location
              </h3>
              <p className="font-serif text-base lg:text-xl mt-1 text-[#F9F0EB]">
                {nextWorkshop.locationName}
              </p>
              <p className="text-[10px] lg:text-xs opacity-60 max-w-[200px] mt-1 text-[#F9F0EB]">
                {nextWorkshop.locationAddress}
              </p>
            </div>
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-[#F9F0EB]/20 flex items-center justify-center text-[#F9F0EB]">
              <span className="text-sm lg:text-lg">↗</span>
            </div>
          </div>

          {/* EMBEDDED MAP CONTAINER */}
          <div className="relative flex-grow w-full rounded-lg overflow-hidden border border-[#F9F0EB]/10 shadow-inner bg-[#2C1810] group cursor-pointer">
            <iframe
              src={nextWorkshop.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{
                border: 0,
                opacity: 0.6,
                filter: "grayscale(100%) invert(90%) contrast(80%)",
              }}
              loading="lazy"
              className="transition-all duration-500 group-hover:opacity-90 group-hover:filter-none"
            ></iframe>

            <a
              href={nextWorkshop.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 hover:bg-black/40 transition-colors"
            >
              <span className="px-3 py-2 lg:px-4 lg:py-2 bg-[#F9F0EB] text-[#2C1810] text-[9px] lg:text-[10px] font-bold uppercase tracking-widest shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Open in Google Maps
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
