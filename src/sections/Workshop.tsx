/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";

// --- DARK THEME PALETTE ---
const COLORS = {
  LINEN: "#1a0f0a", // Deepest Brown (Map Background)
  CHAMPAGNE: "#2C1810", // Rich Dark Brown (Main Card Background)
  ESPRESSO: "#F9F0EB", // Light Cream (Text Color)
  GOLD: "#CD9860", // Accent
};

// --- HELPER: CONVERT DRIVE LINKS TO IMAGE SRC ---
const getGoogleDriveImage = (url: string) => {
  if (!url) return "/placeholder.jpg";
  if (!url.includes("drive.google.com")) return url;

  const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
  const fileId = idMatch ? idMatch[1] || idMatch[2] : null;

  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
};

// --- INTERFACE ---
interface WorkshopItem {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number | string;
  features: string[];
  image: string;
  locationName: string;
  locationAddress: string;
  mapEmbedUrl: string;
  mapLink: string;
}

interface WorkshopProps {
  // Accepts raw data from Server Component
  data: any[];
}

export default function Workshop({ data: serverData }: WorkshopProps) {
  // --- REFS ---
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // --- DATA PROCESSING (Replaces Fetching) ---
  const workshop: WorkshopItem | null = useMemo(() => {
    // 1. Safety check
    if (!Array.isArray(serverData) || serverData.length === 0) {
      return null;
    }

    // 2. Logic: Get the MOST RECENT workshop (Last item in the array)
    const item = serverData[serverData.length - 1];

    // 3. Map backend fields to UI fields
    return {
      id: item._id || item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      time: item.time,
      price: item.price,
      features: item.features || [],
      image: item.image || "",
      locationName: item.location_name || item.locationName || "Venue",
      locationAddress: item.location_address || item.locationAddress || "",
      mapEmbedUrl: item.map_embed_url || item.mapEmbedUrl || "",
      mapLink: item.map_link || item.mapLink || "",
    };
  }, [serverData]);

  // --- ANIMATIONS ---
  useEffect(() => {
    // Only run animation if workshop exists and refs exist
    if (workshop && contentRef.current && mapRef.current) {
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
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.4,
          },
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [workshop]);

  // --- RENDER: EMPTY STATE ---
  if (!workshop) {
    return (
      <div
        className="w-full h-full flex items-center justify-center rounded-2xl"
        style={{ backgroundColor: COLORS.CHAMPAGNE }}
      >
        <div className="text-[#F9F0EB] font-serif text-center p-6">
          <p className="mb-2">No upcoming workshops scheduled.</p>
        </div>
      </div>
    );
  }

  // --- RENDER: MAIN ---
  return (
    <section
      ref={containerRef}
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
                Workshop
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-7xl font-serif leading-[0.9] mb-4 lg:mb-6 text-[#F9F0EB]">
              {workshop.title}
            </h1>

            {/* Body Text */}
            <p className="text-sm lg:text-lg leading-relaxed opacity-80 font-serif font-light max-w-md mb-6 lg:mb-8 text-[#F9F0EB]/80">
              {workshop.description}
            </p>

            {/* Features List */}
            {workshop.features.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                {workshop.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-[#CD9860]" />
                    <span className="text-[10px] lg:text-xs uppercase font-bold tracking-wider opacity-70">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="mt-auto pt-6 lg:pt-8 border-t border-[#F9F0EB]/10">
            <div className="flex items-end justify-between mb-4 lg:mb-6">
              <div>
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-50 mb-1">
                  Date & Time
                </p>
                <p className="font-serif text-base lg:text-xl">
                  {workshop.date}
                </p>
                <p className="font-mono text-[10px] lg:text-sm opacity-70">
                  {workshop.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-50 mb-1">
                  Price
                </p>
                <p className="font-serif text-2xl lg:text-3xl text-[#CD9860]">
                  ₹{workshop.price}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/919876543210?text=I want to book a slot for ${workshop.title}`,
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
            src={getGoogleDriveImage(workshop.image)}
            alt={workshop.title}
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
                {workshop.locationName}
              </p>
              <p className="text-[10px] lg:text-xs opacity-60 max-w-[200px] mt-1 text-[#F9F0EB]">
                {workshop.locationAddress}
              </p>
            </div>
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-[#F9F0EB]/20 flex items-center justify-center text-[#F9F0EB]">
              <span className="text-sm lg:text-lg">↗</span>
            </div>
          </div>

          {/* EMBEDDED MAP CONTAINER */}
          <div className="relative flex-grow w-full rounded-lg overflow-hidden border border-[#F9F0EB]/10 shadow-inner bg-[#2C1810] group cursor-pointer">
            {workshop.mapEmbedUrl ? (
              <iframe
                src={workshop.mapEmbedUrl}
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
            ) : (
              <div className="w-full h-full flex items-center justify-center opacity-30 text-xs">
                Map not available
              </div>
            )}

            {workshop.mapLink && (
              <a
                href={workshop.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 hover:bg-black/40 transition-colors"
              >
                <span className="px-3 py-2 lg:px-4 lg:py-2 bg-[#F9F0EB] text-[#2C1810] text-[9px] lg:text-[10px] font-bold uppercase tracking-widest shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Open in Google Maps
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
