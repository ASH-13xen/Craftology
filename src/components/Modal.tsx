"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
// Removed import from data file
import { getDirectDriveUrl } from "@/utils/driveHelper";
// Theme Colors
const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
};

// Define Interface locally to match the passing prop
interface EnvelopeItem {
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: EnvelopeItem | null;
}

export default function Modal({ isOpen, onClose, product }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // --- HELPER: GET MEDIA URL ---
  // Returns the correct URL for the iframe (Insta > Video Link)
  const getMediaUrl = (item: EnvelopeItem) => {
    // 1. Priority: Instagram Reel
    if (item.insta_reel && item.insta_reel.trim() !== "") {
      const cleanUrl = item.insta_reel.split("?")[0];
      return cleanUrl.endsWith("/") ? `${cleanUrl}embed` : `${cleanUrl}/embed`;
    }

    // 2. Fallback: Video Link
    if (item.video_link && item.video_link.trim() !== "") {
      // HANDLE GOOGLE DRIVE VIDEO
      if (item.video_link.includes("drive.google.com")) {
        return getDirectDriveUrl(item.video_link, "video");
      }

      // Handle YouTube
      if (item.video_link.includes("youtube.com/watch?v=")) {
        const videoId = item.video_link.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (item.video_link.includes("youtu.be/")) {
        const videoId = item.video_link.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return item.video_link;
    }

    return "";
  };
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // GSAP Animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Lock scroll

      // Animate Overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate Modal Pop
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
      );
    } else {
      document.body.style.overflow = "auto"; // Unlock scroll

      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.2,
      });
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const mediaSrc = getMediaUrl(product);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-[#371E10]/60 backdrop-blur-sm opacity-0 cursor-pointer"
      ></div>

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl h-[85vh] bg-[#F9F0EB] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row opacity-0"
        style={{ color: COLORS.ESPRESSO }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-[#371E10] hover:text-white transition-colors border border-[#371E10]/10 shadow-lg"
        >
          ✕
        </button>

        {/* LEFT SIDE: Media (Insta or Video) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-black flex items-center justify-center relative">
          {mediaSrc ? (
            <iframe
              src={mediaSrc}
              className="w-full h-full object-cover"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              allowFullScreen={true}
            ></iframe>
          ) : (
            // Fallback if no video exists (show Image)
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover opacity-80"
            />
          )}
        </div>

        {/* RIGHT SIDE: Product Details */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto flex flex-col relative">
          <h2 className="text-4xl md:text-5xl font-serif mb-2 leading-[0.9]">
            {product.title}
          </h2>

          <p className="font-mono text-xl mb-8 opacity-100 text-[#CD9860]">
            ₹{product.price}
          </p>

          <div className="w-12 h-[1px] bg-[#371E10]/20 mb-8"></div>

          <div className="mb-8">
            <h3 className="font-bold text-xs tracking-[0.2em] mb-3 uppercase opacity-60">
              Description
            </h3>
            <p className="text-lg leading-relaxed opacity-80 font-serif font-light">
              {product.description ? (
                product.description
              ) : (
                <>
                  This handcrafted envelope adds a touch of elegance to your{" "}
                  {product.tags && product.tags.length > 0
                    ? product.tags[0]
                    : "special occasion"}
                  . Made with premium materials and designed to leave a lasting
                  impression.
                </>
              )}
            </p>
          </div>

          <div className="mt-auto pt-6">
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/919876543210?text=Hi, I am interested in ${product.title} (ID: ${product.id || product._id})`,
                  "_blank",
                )
              }
              className="w-full py-4 bg-[#371E10] text-[#F9F0EB] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#CD9860] transition-colors rounded-sm"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
