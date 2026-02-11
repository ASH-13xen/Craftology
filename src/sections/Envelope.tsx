/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Modal from "@/components/Modal";

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 8;
const WHATSAPP_LINK = "https://wa.me/919876543210";
const API_URL = "https://craftology-backend.onrender.com/api/envelope";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
  WHITE: "#FFFFFF",
};

const FILTERS = {
  OCCASION: [
    "Diwali",
    "Raksha Bandhan",
    "Wedding",
    "Birthday",
    "Anniversary",
    "Baby Shower",
    "Shagun",
    "House Warming",
  ],
  DESIGN: [
    "Handcrafted",
    "Floral",
    "Modern",
    "Traditional",
    "Minimalist",
    "Royal",
    "Packet Envelope",
  ],
};

// --- HELPER: CONVERT DRIVE LINKS TO IMAGE SRC ---
// Converts "https://drive.google.com/file/d/ID/view" -> "https://drive.google.com/uc?export=view&id=ID"
const getGoogleDriveImage = (url: string) => {
  if (!url) return "/placeholder.jpg"; // Fallback image if empty
  if (!url.includes("drive.google.com")) return url; // Return as-is if not a Drive link

  // Extract ID
  const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
  const fileId = idMatch ? idMatch[1] || idMatch[2] : null;

  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
};

// --- INTERFACE ---
export interface EnvelopeItem {
  _id?: string;
  id?: string | number;
  title: string;
  price: number;
  image: string;
  tags: string[];
  insta_reel?: string;
  video_link?: string;
  description?: string;
}

interface EnvelopeProps {
  onBack?: () => void;
}

export default function Envelope({ onBack }: EnvelopeProps) {
  // --- STATE ---
  const [data, setData] = useState<EnvelopeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [selectedDesign, setSelectedDesign] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<EnvelopeItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();

        // 1. DEBUG: Look at your browser console to see the real structure
        console.log("API Response from Backend:", jsonData);

        // 2. FIX: Check if it's an array, or inside a property like .data
        // If jsonData is an array, use it. If not, look for .data or default to empty []
        const itemsArray = Array.isArray(jsonData)
          ? jsonData
          : jsonData.data || jsonData.items || [];

        // Format incoming data
        const formattedData = itemsArray.map((item: any) => ({
          ...item,
          id: item.id || item._id,
          tags: item.tags || [],
          insta_reel: item.insta_reel || "",
          video_link: item.video_link || "",
          image: item.image || "",
          description: item.description || "",
        }));

        setData(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load envelopes.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FILTER LOGIC ---
  const filteredData = data.filter((item) => {
    const matchOccasion =
      selectedOccasion === "All" || item.tags.includes(selectedOccasion);
    const matchDesign =
      selectedDesign === "All" || item.tags.includes(selectedDesign);
    return matchOccasion && matchDesign;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // --- ANIMATIONS ---
  useEffect(() => {
    if (!loading && gridRef.current && currentItems.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" },
      );
    }
  }, [currentItems, loading]);

  useEffect(() => {
    if (filterPanelRef.current) {
      if (isFilterOpen) {
        gsap.to(filterPanelRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(filterPanelRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isFilterOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeTrackRef.current) {
        gsap.to(marqueeTrackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 40,
          ease: "linear",
        });
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

  const clearFilters = () => {
    setSelectedOccasion("All");
    setSelectedDesign("All");
    setCurrentPage(1);
  };

  const openModal = (product: EnvelopeItem) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // --- LOADING / ERROR UI ---
  if (loading) {
    return (
      <div
        className="flex h-screen w-full items-center justify-center"
        style={{ backgroundColor: COLORS.LINEN }}
      >
        <div className="text-[#371E10] animate-pulse font-serif tracking-widest uppercase">
          Loading Collection...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex h-screen w-full items-center justify-center"
        style={{ backgroundColor: COLORS.LINEN }}
      >
        <div className="text-[#371E10] font-serif">
          {error} <br />{" "}
          <span className="text-xs opacity-50">
            Check connection to backend
          </span>
        </div>
      </div>
    );
  }

  // --- RENDER ---
  return (
    <section
      ref={containerRef}
      className="w-full h-full overflow-y-auto relative selection:bg-[#CD9860] selection:text-white"
      style={{ backgroundColor: COLORS.LINEN, color: COLORS.ESPRESSO }}
    >
      {/* Background Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.3] mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Marquee */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="block sticky top-0 z-[60] overflow-hidden py-2 md:py-3 cursor-pointer hover:bg-[#2a160c] transition-colors shadow-sm"
        style={{ backgroundColor: COLORS.ESPRESSO }}
      >
        <div className="flex w-full overflow-hidden">
          <div ref={marqueeTrackRef} className="flex whitespace-nowrap">
            {[1, 2].map((set) => (
              <div
                key={set}
                className="flex items-center gap-8 md:gap-16 px-4 md:px-8 flex-shrink-0"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={`${set}-${i}`}
                    className="text-[#F9F0EB] text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-4"
                  >
                    <span>Customise Every Detail</span> •{" "}
                    <span>Chat on WhatsApp to Order</span> •{" "}
                    <span>Handcrafted with Love</span> •
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </a>

      {/* Back Button */}
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
        {/* Header */}
        <div className="text-center mb-8 md:mb-10 space-y-3 md:space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif leading-[0.9] text-[#371E10]">
            Envelopes
          </h1>
          <p className="opacity-80 max-w-lg mx-auto text-sm md:text-lg leading-relaxed font-light text-[#371E10]">
            Vessels for your blessings. Explore our range of handcrafted
            shaguns.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 md:mb-12 flex flex-col items-center z-40 relative">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase border transition-all duration-300 ${
                isFilterOpen
                  ? "bg-[#371E10] text-[#F9F0EB]"
                  : "border-[#371E10] text-[#371E10] hover:bg-[#371E10]/5"
              }`}
            >
              <span>Filters</span>
              <span
                className={`text-base md:text-lg leading-none transition-transform duration-300 ${isFilterOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>

            {(selectedOccasion !== "All" || selectedDesign !== "All") && (
              <button
                onClick={clearFilters}
                className="text-[10px] uppercase font-bold text-[#CD9860] hover:text-[#371E10] underline underline-offset-4"
              >
                Clear All
              </button>
            )}
          </div>

          <div
            ref={filterPanelRef}
            className="h-0 overflow-hidden w-[95%] md:w-full max-w-3xl opacity-0"
          >
            <div className="bg-[#FFFFFF] mt-4 md:mt-6 p-6 md:p-8 rounded-2xl shadow-xl border border-[#371E10]/10 flex flex-col md:flex-row gap-6 md:gap-16">
              <div className="flex-1">
                <h4 className="text-[#CD9860] text-[10px] font-bold tracking-widest uppercase mb-3 md:mb-4 border-b border-[#371E10]/10 pb-2">
                  Browse by Occasion
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedOccasion("All")}
                    className={`px-3 py-1 text-[10px] md:text-xs rounded-md transition-colors ${selectedOccasion === "All" ? "bg-[#371E10] text-white" : "hover:bg-[#371E10]/10"}`}
                  >
                    All
                  </button>
                  {FILTERS.OCCASION.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedOccasion(tag);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 text-[10px] md:text-xs rounded-md transition-colors ${selectedOccasion === tag ? "bg-[#371E10] text-white shadow-md" : "text-[#371E10]/70 hover:bg-[#371E10]/5"}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[#CD9860] text-[10px] font-bold tracking-widest uppercase mb-3 md:mb-4 border-b border-[#371E10]/10 pb-2">
                  Browse by Design
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedDesign("All")}
                    className={`px-3 py-1 text-[10px] md:text-xs rounded-md transition-colors ${selectedDesign === "All" ? "bg-[#371E10] text-white" : "hover:bg-[#371E10]/10"}`}
                  >
                    All
                  </button>
                  {FILTERS.DESIGN.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedDesign(tag);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 text-[10px] md:text-xs rounded-md transition-colors ${selectedDesign === tag ? "bg-[#371E10] text-white shadow-md" : "text-[#371E10]/70 hover:bg-[#371E10]/5"}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-20 min-h-[400px]"
        >
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div
                key={item._id || item.id}
                className="group flex flex-col cursor-pointer p-3 md:p-4 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white"
                style={{ border: `1px solid ${COLORS.ESPRESSO}10` }}
                onClick={() => openModal(item)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3 md:mb-4 bg-[#E5DACE] shadow-inner">
                  {/* --- GOOGLE DRIVE IMAGE HANDLER --- */}
                  <Image
                    src={getGoogleDriveImage(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-[#F9F0EB]/90 backdrop-blur-md px-2 py-1 rounded text-[9px] md:text-[10px] font-bold text-[#371E10] shadow-sm border border-[#371E10]/10">
                    ₹{item.price}
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="text-lg md:text-xl font-serif text-[#371E10] leading-tight group-hover:text-[#CD9860] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10 opacity-50 space-y-4">
              <div className="w-12 h-[2px] bg-[#371E10]/20"></div>
              <p className="text-lg font-serif italic text-[#371E10]">
                No items found matching these filters.
              </p>
              <button
                onClick={clearFilters}
                className="text-xs font-bold uppercase underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-auto flex justify-center items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-[#371E10]/20 rounded-full hover:bg-[#371E10] hover:text-[#F9F0EB] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#371E10] transition-colors"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 ${currentPage === page ? "bg-[#371E10] text-[#F9F0EB] shadow-lg scale-105" : "text-[#371E10] hover:bg-[#371E10]/5"}`}
              >
                {page < 10 ? `0${page}` : page}
              </button>
            ))}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
}
