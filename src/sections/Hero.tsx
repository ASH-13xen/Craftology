"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
  WHITE: "#ffffff",
};

interface HeroProps {
  onExplore: () => void;
  onViewThemes: () => void;
  isActive: boolean; // <--- 1. Added Prop
}

export default function Hero({ onExplore, onViewThemes, isActive }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const bigRingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const actualVideoRef = useRef<HTMLVideoElement>(null);

  // --- AUDIO STATE ---
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (actualVideoRef.current) {
      actualVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // --- 2. NEW LOGIC: Play/Pause based on Active State ---
  useEffect(() => {
    if (actualVideoRef.current) {
      if (isActive) {
        // If we are on the Home view, play the video
        actualVideoRef.current.play().catch((e) => {
          console.log("Autoplay prevented or interrupted", e);
        });
      } else {
        // If we navigated away, pause the video
        actualVideoRef.current.pause();
      }
    }
  }, [isActive]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Video Fade In
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.0 },
      );

      // 2. Glow Fade In
      tl.fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 2.0 },
        "-=1.5",
      );

      // 3. Big Ring Entrance
      tl.fromTo(
        bigRingRef.current,
        { scale: 0.8, opacity: 0, rotation: -15 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1.5",
      );

      // 4. Text Slide Up
      tl.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        "-=1.0",
      );

      // 5. Corner Tags Fade In
      tl.fromTo(
        tagsRef.current?.children || [],
        { opacity: 0 },
        { opacity: 0.5, duration: 1.5, stagger: 0.2 },
        "-=0.5",
      );

      // Continuous rotation for the Big Ring
      gsap.to(bigRingRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden flex items-center"
      style={{ backgroundColor: COLORS.LINEN }}
    >
      {/* --- 1. ORGANIC BACKGROUND & GLOW --- */}

      {/* Top Left Blob */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] rounded-full blur-[100px] opacity-40 pointer-events-none"
        style={{ backgroundColor: COLORS.CHAMPAGNE }}
      />

      {/* Left Side Warm Glow */}
      <div
        ref={glowRef}
        className="absolute left-[-10%] top-[20%] w-[50vw] h-[50vw] rounded-full blur-[120px] pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(circle, ${COLORS.GOLD} 0%, transparent 70%)`,
          opacity: 0.4,
        }}
      />

      {/* The Golden Ring (Bottom Left) */}
      <div
        ref={bigRingRef}
        className="absolute -bottom-[20vh] -left-[20vh] w-[80vh] h-[80vh] pointer-events-none opacity-0 z-0"
      >
        {/* Main Outer Ring */}
        <div
          className="absolute inset-0 rounded-full border border-dashed"
          style={{ borderColor: COLORS.GOLD, opacity: 0.4 }}
        />
        {/* Inner Solid Ring for Depth */}
        <div
          className="absolute inset-8 rounded-full border"
          style={{ borderColor: COLORS.ESPRESSO, opacity: 0.1 }}
        />
      </div>

      {/* --- 2. THE VIDEO PORTAL --- */}
      <div
        ref={videoRef}
        className="absolute right-0 top-0 bottom-0 w-full md:w-[50%] h-full z-0 opacity-0"
        style={{
          maskImage: "linear-gradient(to right, transparent 5%, black 40%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 5%, black 40%)",
        }}
      >
        <div className="relative w-full h-full overflow-hidden group">
          <video
            ref={actualVideoRef}
            className="absolute w-full h-full object-cover grayscale-[20%]"
            style={{ objectPosition: "center center" }}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            src="hero-reel.mp4"
          />
          <div
            className="absolute inset-0 mix-blend-color"
            style={{ backgroundColor: COLORS.ESPRESSO, opacity: 0.3 }}
          ></div>
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className="absolute bottom-3 right-2 md:bottom-8 md:right-8 z-30 p-3 rounded-full border border-white/30 bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- 3. THE CONTENT (Left Side) --- */}
      <div className="relative z-10 w-full max-w-8xl px-8 md:px-35 grid grid-cols-1 md:grid-cols-2 h-full pointer-events-none">
        {/* Left Column Wrapper */}
        <div className="flex flex-col h-full justify-start pt-10 md:pt-29 relative md:pr-25">
          {/* CORNER TAGS */}
          <div ref={tagsRef}></div>

          {/* Main Center Block */}
          <div className="flex flex-col items-start md:items-start space-y-8 md">
            {/* TEXT SECTION */}
            <div
              ref={textRef}
              className="text-center md:text-left space-y-4 md:space-y-6 md:top-10"
            >
              <h2
                className="text-[40px] md:text-8xl font-serif font-light tracking-tighter leading-[0.9]"
                style={{ color: COLORS.ESPRESSO }}
              >
                Craftology <br />
                <span className="italic font-normal opacity-70">with</span>{" "}
                Anupama
              </h2>

              <p
                className="max-w-md pt-30 font-semibold md:pt-0 text-sm md:text-base leading-relaxed"
                style={{ color: COLORS.ESPRESSO }}
              >
                Where raw materials meet refined vision. Explore our curated
                selection of handmade ceramics and ethically sourced textiles
                designed for the modern home.
              </p>

              <button
                onClick={onExplore}
                // UPDATED CLASS: Default (mobile) has bg-espresso/text-gold, md (desktop) reverts to transparent/text-espresso
                className="pointer-events-auto inline-block px-10 py-3 mt-4 rounded-full border text-xs font-bold tracking-widest uppercase transition-all duration-300 border-[#371E10] bg-[#371E10] text-[#CD9860] md:bg-transparent md:text-[#371E10] hover:bg-[#371E10] hover:text-[#CD9860]"
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
