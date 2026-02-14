"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import Modal from "@/components/Modal";
import ProductCard, { CoinItem } from "@/components/ProductCard";

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 12;
const WHATSAPP_LINK = "https://wa.me/919876543210";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
  WHITE: "#FFFFFF",
};

// --- INTERFACES ---
export type GaddiItem = CoinItem;

interface GaddiProps {
  onBack?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]; // Accepts raw data from Server Component
}

export default function Gaddi({ onBack, data: serverData }: GaddiProps) {
  // --- STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<GaddiItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- REFS ---
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  // --- DATA SANITIZATION ---
  // Process server data to match UI requirements
  const formattedData: GaddiItem[] = useMemo(() => {
    if (!Array.isArray(serverData)) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return serverData.map((item: any) => ({
      ...item,
      id: item.id || item._id, // Handle MongoDB _id
      tags: item.tags || [],
      insta_reel: item.insta_reel || "",
      video_link: item.video_link || "",
      description: item.description || "",
      image: item.image || "",
      title: item.title || "Untitled Gaddi",
      price: item.price || 0,
    }));
  }, [serverData]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(formattedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = formattedData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // --- ANIMATIONS ---

  // 1. Grid Entrance
  useEffect(() => {
    if (gridRef.current && currentItems.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" },
      );
    }
  }, [currentItems]);

  // 2. Marquee Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeTrackRef.current) {
        gsap.fromTo(
          marqueeTrackRef.current,
          { xPercent: 0 },
          {
            xPercent: -50,
            repeat: -1,
            duration: 40,
            ease: "linear",
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openModal = (product: GaddiItem) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // --- PAGINATION HELPER ---
  const getVisiblePages = () => {
    const maxVisible = 4;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - 1;
    if (start < 1) start = 1;

    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // --- RENDER ---
  return (
    <section
      ref={containerRef}
      className="w-full h-full overflow-y-auto relative selection:bg-[#CD9860] selection:text-white"
      style={{ backgroundColor: COLORS.LINEN, color: COLORS.ESPRESSO }}
    >
      {/* --- ACTIVE BACKGROUND TEXTURE --- */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.3] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* --- TOP MARQUEE (FIXED) --- */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="block sticky top-0 z-[60] overflow-hidden py-3 cursor-pointer hover:bg-[#2a160c] transition-colors shadow-sm"
        style={{ backgroundColor: COLORS.ESPRESSO }}
      >
        <div className="flex w-full overflow-hidden">
          <div ref={marqueeTrackRef} className="flex whitespace-nowrap w-max">
            {[1, 2].map((set) => (
              <div
                key={set}
                className="flex items-center gap-16 px-8 flex-shrink-0"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={`${set}-${i}`}
                    className="text-[#F9F0EB] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-4"
                  >
                    <span>Ceremonial Luxury</span> •{" "}
                    <span>Chat on WhatsApp to Order</span> •{" "}
                    <span>Handcrafted Heritage</span> •
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </a>

      {/* --- BACK BUTTON --- */}
      <div className="absolute top-24 left-4 md:top-20 md:left-6 z-50">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-[#371E10] text-[#F9F0EB] rounded-full shadow-xl hover:scale-105 transition-all duration-300"
        >
          <span className="text-lg md:text-xl leading-none pb-1 group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
            Back
          </span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 min-h-full flex flex-col pt-36 md:pt-24 relative z-10">
        {/* --- HEADER --- */}
        <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif leading-[0.9] text-[#371E10]">
            Gaddi Box
          </h1>
          <p className="opacity-80 max-w-lg mx-auto text-sm md:text-lg leading-relaxed font-light text-[#371E10]">
            Traditional velvet-lined boxes for festive gifting. A royal way to
            present sweets, dry fruits, or jewelry.
          </p>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-20 min-h-[400px]"
        >
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <ProductCard key={item.id} item={item} onClick={openModal} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10 opacity-50 space-y-4">
              <div className="w-12 h-[2px] bg-[#371E10]/20"></div>
              <p className="text-lg font-serif italic text-[#371E10]">
                No items available.
              </p>
            </div>
          )}
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="mt-auto flex justify-center items-center gap-2 md:gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-[#371E10]/20 rounded-full hover:bg-[#371E10] hover:text-[#F9F0EB] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#371E10] transition-colors"
            >
              ←
            </button>

            {getVisiblePages().map((page) => {
              const isActive = currentPage === page;
              const pageNum = page < 10 ? `0${page}` : page;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#371E10] text-[#F9F0EB] shadow-lg scale-105"
                      : "text-[#371E10] hover:bg-[#371E10]/5"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-[#371E10]/20 rounded-full hover:bg-[#371E10] hover:text-[#F9F0EB] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#371E10] transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
}
