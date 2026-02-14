/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
};

export interface ProductItem {
  _id?: string;
  id?: string | number;
  title: string;
  price: string | number;
  image: string;
  image2?: string;
  image3?: string;
  tags?: string[];
  insta_reel?: string;
  video_link?: string;
  description?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
}

// --- HELPERS ---

// 1. For IMAGES: Use the thumbnail endpoint (prevents 403s and timeouts)
const getGoogleDriveImageUrl = (url: string | undefined) => {
  if (!url) return "/placeholder.jpg";
  if (!url.includes("drive.google.com")) return url;

  const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
  const fileId = idMatch ? idMatch[1] || idMatch[2] : null;

  return fileId
    ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w1920`
    : url;
};

// 2. For VIDEOS: Use the preview endpoint (required for iframes)
const getGoogleDriveVideoUrl = (url: string) => {
  const idMatch = url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/);
  const fileId = idMatch ? idMatch[1] || idMatch[2] : null;
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
};

export default function Modal({ isOpen, onClose, product }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset index when modal opens or product changes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, product]);

  // --- MEMOIZED URL LOGIC ---

  const videoSrc = useMemo(() => {
    if (!product?.video_link?.trim()) return null;
    const link = product.video_link;

    if (link.includes("drive.google.com")) {
      return getGoogleDriveVideoUrl(link);
    }
    if (link.includes("youtube.com/watch?v=")) {
      return `https://www.youtube.com/embed/${link.split("v=")[1]?.split("&")[0]}`;
    }
    if (link.includes("youtu.be/")) {
      return `https://www.youtube.com/embed/${link.split("youtu.be/")[1]?.split("?")[0]}`;
    }
    return link;
  }, [product]);

  const instaSrc = useMemo(() => {
    if (!product?.insta_reel?.trim()) return null;
    // If video exists, we ignore insta
    if (videoSrc) return null;

    const cleanUrl = product.insta_reel.split("?")[0];
    return cleanUrl.endsWith("/") ? `${cleanUrl}embed` : `${cleanUrl}/embed`;
  }, [product, videoSrc]);

  const productImages = useMemo(() => {
    if (!product) return [];
    // If we have a video or insta, we might not show images in the main slot,
    // but we still calculate them just in case logic changes
    const rawImages = [product.image, product.image2, product.image3].filter(
      (img): img is string => !!img && img.trim() !== "",
    );
    return rawImages.length > 0
      ? rawImages.map(getGoogleDriveImageUrl)
      : ["/placeholder.jpg"];
  }, [product]);

  // --- HANDLERS ---

  const handleNextImage = (e: React.MouseEvent, total: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % total);
  };

  const handlePrevImage = (e: React.MouseEvent, total: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  // Close on Escape
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
      document.body.style.overflow = "hidden";
      if (overlayRef.current && modalRef.current) {
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" },
        );
      }
    } else {
      document.body.style.overflow = "auto";
      if (overlayRef.current && modalRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
        gsap.to(modalRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.2,
        });
      }
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // SAFETY CHECK
  const safeIndex =
    currentImageIndex >= productImages.length ? 0 : currentImageIndex;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8">
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-[#371E10]/60 backdrop-blur-sm opacity-0 cursor-pointer"
      />
      <div
        ref={modalRef}
        className="relative w-[94%] max-w-5xl h-[80vh] md:h-[85vh] bg-[#F9F0EB] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row opacity-0"
        style={{ color: COLORS.ESPRESSO }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2.5 right-2.5 md:top-4 md:right-4 z-50 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-[#371E10] hover:text-white transition-colors border border-[#371E10]/10 shadow-lg text-xs"
        >
          ✕
        </button>

        {/* LEFT SIDE: Media Display */}
        <div className="w-full md:w-1/2 h-[45%] md:h-full bg-[#E5DACE] flex items-center justify-center relative shrink-0 group p-6 md:p-10">
          {videoSrc ? (
            <iframe
              src={videoSrc}
              className="w-full h-full object-cover rounded-lg shadow-sm"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            />
          ) : instaSrc ? (
            <iframe
              src={instaSrc}
              className="w-full h-full object-cover rounded-lg shadow-sm"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <>
              {/* IMAGE CAROUSEL */}
              <div className="relative w-full h-full z-0">
                <Image
                  key={safeIndex}
                  src={productImages[safeIndex]}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  // --- CRITICAL FIXES FOR DRIVE IMAGES ---
                  unoptimized={true}
                  referrerPolicy="no-referrer"
                />
              </div>

              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => handlePrevImage(e, productImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleNextImage(e, productImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10"
                  >
                    →
                  </button>
                  {/* Progress Dots */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {productImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === safeIndex
                            ? "bg-white scale-125"
                            : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* RIGHT SIDE: Product Details */}
        <div className="w-full md:w-1/2 flex-1 md:h-full p-6 sm:p-8 md:p-12 overflow-y-auto flex flex-col">
          <h2 className="text-2xl md:text-5xl font-serif mb-2 leading-tight">
            {product.title}
          </h2>
          <p className="font-mono text-xl md:text-2xl mb-6 text-[#CD9860]">
            ₹{String(product.price)}
          </p>

          <div className="w-12 h-px bg-[#371E10]/20 mb-8" />

          <div className="mb-8">
            <h3 className="font-bold text-xs tracking-[0.2em] mb-3 uppercase opacity-60">
              Description
            </h3>
            <p className="text-sm md:text-lg leading-relaxed opacity-80 font-serif font-light">
              {product.description ||
                "Handcrafted with premium materials and designed to leave a lasting impression."}
            </p>
          </div>

          <div className="mt-auto">
            <button
              type="button"
              onClick={() =>
                window.open(
                  `https://wa.me/919876543210?text=Hi, I am interested in ${product.title} (ID: ${product.id || product._id})`,
                  "_blank",
                )
              }
              className="w-full py-4 bg-[#371E10] text-[#F9F0EB] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#CD9860] transition-colors rounded-lg shadow-md"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
