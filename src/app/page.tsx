"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";

// --- DYNAMIC IMPORTS (Lazy Loading) ---
const Collection = dynamic(() => import("@/sections/Collection"));
const Envelope = dynamic(() => import("@/sections/Envelope"));
const Gaddi = dynamic(() => import("@/sections/Gaddi"));
const Coin = dynamic(() => import("@/sections/Coin"));
const Resin = dynamic(() => import("@/sections/Resin"));
const Scrapbook = dynamic(() => import("@/sections/Scrapbook"));
const Contact = dynamic(() => import("@/sections/Contact"));
const Workshop = dynamic(() => import("@/sections/Workshop"));

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
};

// --- THE MASTER STACK ---
const LAYERS = [
  { id: "home", x: -100 },
  { id: "categories", x: -75 },
  { id: "products", x: -50 },
  { id: "contact", x: -25 },
  { id: "workshop", x: 0 },
  { id: "envelopes", x: 0 },
  { id: "gaddi", x: 0 },
  { id: "coin", x: 0 },
  { id: "resin", x: 0 },
  { id: "scrapbook", x: 0 },
] as const;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<(HTMLDivElement | null)[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentView, setCurrentView] = useState<any>("home");

  // --- NAVIGATION LOGIC ---
  const handleNavigate = (view: string) => {
    setCurrentView(view);

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 1.2 },
    });

    if (view === "home") {
      LAYERS.forEach((layer, index) => {
        const element = pagesRef.current[index];
        if (!element) return;
        const targetX = isDesktop ? layer.x : 0;
        tl.to(element, { y: 0, x: targetX, opacity: 1, scale: 1 }, 0);
      });
      return;
    }

    const targetIndex = LAYERS.findIndex((l) => l.id === view);
    if (targetIndex === -1) return;

    LAYERS.forEach((layer, index) => {
      const element = pagesRef.current[index];
      if (!element) return;

      const restingX = isDesktop ? layer.x : 0;

      if (index < targetIndex) {
        tl.to(
          element,
          { y: -window.innerHeight * 1.5, x: restingX, opacity: 1, scale: 1 },
          0,
        );
      } else if (index === targetIndex) {
        tl.to(element, { y: 0, x: 0, opacity: 1, scale: 1 }, 0);
      } else {
        tl.to(element, { y: 0, x: restingX, opacity: 1, scale: 1 }, 0);
      }
    });
  };

  // --- INITIAL FLY-IN ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions || {};
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          LAYERS.forEach((config, i) => {
            const element = pagesRef.current[i];
            if (!element) return;

            const targetX = isDesktop ? config.x : 0;

            tl.fromTo(
              element,
              {
                x: -window.innerWidth * 1.5,
                y: -window.innerHeight * 1.5,
                rotation: -15,
                opacity: 0,
              },
              {
                x: targetX,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.6,
                delay: 0.2 + (LAYERS.length - i) * 0.1,
                transformOrigin: "50% 100%",
              },
              0,
            );
          });
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- RENDER CONTENT ---
  const renderContent = (id: string) => {
    const isLazyComponent = [
      "categories",
      "contact",
      "workshop",
      "envelopes",
      "gaddi",
      "coin",
      "resin",
      "scrapbook",
    ].includes(id);

    if (isLazyComponent && currentView !== id) {
      return null;
    }

    switch (id) {
      case "home":
        return (
          <Hero
            onExplore={() => handleNavigate("categories")}
            onViewThemes={() => handleNavigate("products")}
            isActive={currentView === "home"} // <--- Pass the check here
          />
        );
      case "categories":
        return (
          <Collection
            onProductSelect={(productId) => handleNavigate(productId)}
          />
        );
      case "contact":
        return <Contact />;
      case "workshop":
        return <Workshop />;
      case "envelopes":
        return <Envelope onBack={() => handleNavigate("categories")} />;
      case "gaddi":
        return <Gaddi onBack={() => handleNavigate("categories")} />;
      case "coin":
        return <Coin onBack={() => handleNavigate("categories")} />;
      case "resin":
        return <Resin onBack={() => handleNavigate("categories")} />;
      case "scrapbook":
        return <Scrapbook onBack={() => handleNavigate("categories")} />;
      default:
        return null;
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: COLORS.LINEN, color: COLORS.ESPRESSO }}
    >
      {/* --- GRID BACKGROUND --- */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${COLORS.ESPRESSO} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.ESPRESSO} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <Navbar
        currentView={currentView}
        onNavigate={(view) => handleNavigate(view)}
      />

      <div className="relative w-full h-full flex items-center justify-center right-0 md:right-[-50]">
        {LAYERS.map((layer, index) => {
          const zIndex = LAYERS.length - index;

          const isFullPage = [
            "home",
            "categories",
            "contact",
            "workshop",
            "envelopes",
            "gaddi",
            "coin",
            "resin",
            "scrapbook",
          ].includes(layer.id);

          return (
            <div
              key={layer.id}
              ref={(el) => {
                pagesRef.current[index] = el;
              }}
              className="absolute w-[90vw] h-[85vh] shadow-2xl will-change-transform rounded-2xl overflow-hidden border border-white/20"
              style={{ zIndex: zIndex, backgroundColor: COLORS.CHAMPAGNE }}
            >
              <div
                className={
                  isFullPage
                    ? "relative w-full h-full"
                    : "relative w-full h-full p-12 flex flex-col justify-center items-center"
                }
              >
                {!isFullPage && (
                  <>
                    <div
                      className="absolute inset-4 border-2 pointer-events-none opacity-20 rounded-xl"
                      style={{ borderColor: COLORS.ESPRESSO }}
                    />
                    <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] mix-blend-multiply" />
                  </>
                )}

                <div
                  className={
                    isFullPage
                      ? "w-full h-full z-10"
                      : "relative z-10 text-center"
                  }
                >
                  {renderContent(layer.id)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
