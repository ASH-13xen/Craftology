"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
};

// IDs must match the 'id' fields in your LAYERS array in page.tsx
const PRODUCTS = [
  {
    id: "envelopes",
    title: "Envelopes",
    subtitle: "The Art of Correspondence",
    description:
      "Handcrafted paper designed to hold your most precious words. Textured, heavy-weight, and sealed with intention.",
    img: "/envelope.jpg",
  },
  {
    id: "gaddi",
    title: "Gaddi Box",
    subtitle: "Ceremonial Luxury",
    description:
      "Traditional velvet-lined boxes for festive gifting. A royal way to present sweets, dry fruits, or jewelry.",
    img: "/gaddibox.jpg",
  },
  {
    id: "coin",
    title: "Coin Box",
    subtitle: "Tokens of Prosperity",
    description:
      "Compact, elegant casings for silver and gold coins. The perfect favor for weddings and Diwali.",
    img: "/coinbox.jpg",
  },
  {
    id: "resin",
    title: "Resin Art",
    subtitle: "Fluid Beauty",
    description:
      "Preserving nature in time. Coasters, trays, and bookmarks made with real flowers and high-clarity resin.",
    img: "/resin.jpg",
  },
  {
    id: "scrapbook",
    title: "Scrapbook",
    subtitle: "Memory Keepers",
    description:
      "Bound volumes waiting for your stories. Premium varied papers ready for photos, ink, and nostalgia.",
    img: "/scrapbook.webp",
  },
];

// Define the prop interface to accept the navigation handler from page.tsx
interface CollectionProps {
  onProductSelect: (id: string) => void;
}

export default function Collection({ onProductSelect }: CollectionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for Content Reveal (Text & Image Scale)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text sliding up
      gsap.fromTo(
        `.active-text`,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      );
      // Animate image zooming out slightly
      gsap.fromTo(
        `.active-img`,
        { scale: 1.2 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      // Dark Gradient Background for high contrast
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center py-20 px-4 md:py-24 md:px-16 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${COLORS.ESPRESSO}, #2a160c)`,
      }}
    >
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left - Gold */}
        <div
          className="absolute -top-[20%] -left-[20%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40"
          style={{
            background: `radial-gradient(circle, ${COLORS.GOLD}, transparent 70%)`,
          }}
        />
        {/* Top Right - Champagne */}
        <div
          className="absolute -top-[20%] -right-[20%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-30"
          style={{
            background: `radial-gradient(circle, ${COLORS.CHAMPAGNE}, transparent 70%)`,
          }}
        />
        {/* Bottom Left - Champagne */}
        <div
          className="absolute -bottom-[20%] -left-[20%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-30"
          style={{
            background: `radial-gradient(circle, ${COLORS.CHAMPAGNE}, transparent 70%)`,
          }}
        />
        {/* Bottom Right - Gold */}
        <div
          className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40"
          style={{
            background: `radial-gradient(circle, ${COLORS.GOLD}, transparent 70%)`,
          }}
        />
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] mix-blend-overlay" />
      </div>

      {/* --- THE ACCORDION CONTAINER --- */}
      {/* MOBILE: flex-col (Vertical stack) | DESKTOP: flex-row (Horizontal row) */}
      <div className="flex flex-col md:flex-row w-full h-[75vh] md:h-[70vh] gap-3 md:gap-4 z-10">
        {PRODUCTS.map((product, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={product.id}
              // Handle hover on desktop, click/tap on mobile to expand
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              // FLEX LOGIC: Active item grows to flex-4, others shrink to flex-1
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-[flex, border-radius] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive ? "flex-[4]" : "flex-[1]"
              }`}
              style={{
                backgroundColor: isActive ? COLORS.LINEN : COLORS.ESPRESSO,
                border: isActive
                  ? `1px solid ${COLORS.ESPRESSO}`
                  : `1px solid ${COLORS.ESPRESSO}44`,
              }}
            >
              {/* --- BACKGROUND IMAGE --- */}
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    isActive ? "opacity-100 active-img" : "opacity-40 grayscale"
                  }`}
                />
                {/* Tint Overlay */}
                <div
                  className="absolute inset-0 transition-colors duration-500"
                  style={{
                    backgroundColor: isActive
                      ? `rgba(249, 240, 235, 0.1)` // Light tint active
                      : `rgba(55, 30, 16, 0.7)`, // Dark tint inactive
                  }}
                />
                {/* Text Readability Gradient */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                )}
              </div>

              {/* --- CONTENT CONTAINER --- */}
              <div className="relative z-10 w-full h-full p-6 md:p-8 flex flex-col justify-end">
                {/* INACTIVE STATE: Label */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h3
                      // MOBILE: Horizontal text | DESKTOP: Vertical text
                      className="text-lg md:text-4xl font-serif tracking-widest text-center whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180"
                      style={{
                        color: COLORS.CHAMPAGNE,
                      }}
                    >
                      {product.title}
                    </h3>
                  </div>
                )}

                {/* ACTIVE STATE: Horizontal Expanded Content */}
                {isActive && (
                  <div className="active-text max-w-lg">
                    {/* Subtitle Line */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-[1px] w-8 bg-[#CD9860]" />
                      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#CD9860]">
                        {product.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-7xl font-serif text-[#F9F0EB] mb-4 md:mb-6 leading-none">
                      {product.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[#F2E6D8] text-xs md:text-base leading-relaxed opacity-90 mb-6 md:mb-8 max-w-sm line-clamp-3 md:line-clamp-none">
                      {product.description}
                    </p>

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent re-triggering flex animation
                        // Call parent navigation logic
                        onProductSelect(product.id);
                      }}
                      className="px-5 py-2 md:px-6 md:py-3 border border-[#F2E6D8] rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#F2E6D8] hover:bg-[#F2E6D8] hover:text-[#371E10] transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
