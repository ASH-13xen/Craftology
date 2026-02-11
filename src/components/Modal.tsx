/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { getDirectDriveUrl } from "@/utils/driveHelper";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
};

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

  const getMediaUrl = (item: EnvelopeItem) => {
    if (item.insta_reel && item.insta_reel.trim() !== "") {
      const cleanUrl = item.insta_reel.split("?")[0];
      return cleanUrl.endsWith("/") ? `${cleanUrl}embed` : `${cleanUrl}/embed`;
    }

    if (item.video_link && item.video_link.trim() !== "") {
      if (item.video_link.includes("drive.google.com")) {
        return getDirectDriveUrl(item.video_link, "video");
      }
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
      );
    } else {
      document.body.style.overflow = "auto";
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-[#371E10]/60 backdrop-blur-sm opacity-0 cursor-pointer"
      ></div>

      {/* Modal Content */}
      <div
        ref={modalRef}
        // Reduced height to 80vh and width to 94% on mobile for a tighter look
        className="relative w-[94%] max-w-5xl h-[80vh] md:h-[85vh] bg-[#F9F0EB] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row opacity-0"
        style={{ color: COLORS.ESPRESSO }}
      >
        {/* Close Button - More compact on mobile */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 md:top-4 md:right-4 z-50 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-[#371E10] hover:text-white transition-colors border border-[#371E10]/10 shadow-lg text-xs"
        >
          ✕
        </button>

        {/* LEFT SIDE: Media - Increased height to 55% on mobile */}
        <div className="w-full md:w-1/2 h-[55%] md:h-full bg-black flex items-center justify-center relative shrink-0">
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
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover opacity-80"
            />
          )}
        </div>

        {/* RIGHT SIDE: Product Details - Reduced padding and text sizes */}
        <div className="w-full md:w-1/2 flex-1 md:h-full p-4 sm:p-8 md:p-12 overflow-y-auto flex flex-col">
          <div className="mb-3 md:mb-0">
            <h2 className="text-xl md:text-5xl font-serif mb-1 leading-tight md:leading-[0.9]">
              {product.title}
            </h2>
            <p className="font-mono text-sm md:text-xl mb-3 md:mb-8 opacity-100 text-[#CD9860]">
              ₹{product.price}
            </p>
          </div>

          <div className="hidden md:block w-12 h-[1px] bg-[#371E10]/20 mb-8"></div>
          <div className="block md:hidden w-full h-[1px] bg-[#371E10]/10 mb-4"></div>

          <div className="mb-4 md:mb-8">
            <h3 className="font-bold text-[9px] md:text-xs tracking-[0.2em] mb-1.5 md:mb-3 uppercase opacity-60">
              Description
            </h3>
            <p className="text-[13px] md:text-lg leading-relaxed opacity-80 font-serif font-light">
              {product.description ? (
                product.description
              ) : (
                <>
                  This handcrafted item adds a touch of elegance to your{" "}
                  {product.tags && product.tags.length > 0
                    ? product.tags[0]
                    : "special occasion"}
                  . Made with premium materials and designed to leave a lasting
                  impression.
                </>
              )}
            </p>
          </div>

          <div className="mt-auto pt-2">
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/919876543210?text=Hi, I am interested in ${product.title} (ID: ${product.id || product._id})`,
                  "_blank",
                )
              }
              className="w-full py-3 md:py-4 bg-[#371E10] text-[#F9F0EB] font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-[#CD9860] transition-colors rounded-lg md:rounded-sm shadow-md"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
