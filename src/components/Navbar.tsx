/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import gsap from "gsap";

const COLORS = {
  LINEN: "#F9F0EB",
  CHAMPAGNE: "#F2E6D8",
  ESPRESSO: "#371E10",
  GOLD: "#CD9860",
};

export type ViewState =
  | "home"
  | "categories"
  | "products"
  | "contact"
  | "workshop"
  | "envelopes"
  | "gaddi"
  | "coin"
  | "resin"
  | "scrapbook";

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Collection", id: "categories" },
  { label: "Contact", id: "contact" },
  { label: "Workshop", id: "workshop" },
] as const;

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // --- 1. ROBUST POSITION CALCULATION ---
  const updateIndicator = useCallback(() => {
    if (!containerRef.current) return;

    // Check if the current view matches one of the NAV_ITEMS
    const activeIndex = NAV_ITEMS.findIndex((item) => item.id === currentView);

    // IF ACTIVE INDEX IS -1 (Meaning we are on a product page), HIDE INDICATOR
    if (activeIndex === -1) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeItem = itemsRef.current[activeIndex];
    const container = containerRef.current;

    if (activeItem && container) {
      const itemRect = activeItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeLeft = itemRect.left - containerRect.left;

      setIndicatorStyle({
        left: relativeLeft,
        width: itemRect.width,
        opacity: 1,
      });
    }
  }, [currentView]);

  // --- 2. ENTRANCE ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // --- 3. EVENT LISTENERS ---
  useEffect(() => {
    updateIndicator();
    document.fonts.ready.then(() => {
      updateIndicator();
    });

    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(updateIndicator, 200);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [currentView, updateIndicator]);

  return (
    <nav
      ref={navRef}
      // Changed justify-between to justify-center since elements were removed
      className="fixed top-[-20] left-0 w-full z-50 flex items-center justify-center px-4 md:px-8 py-4 md:py-6 select-none pointer-events-none"
    >
      {/* NAV CONTAINER */}
      <div
        ref={containerRef}
        className="pointer-events-auto relative px-1 py-1 md:px-2 md:py-2 rounded-full border shadow-sm backdrop-blur-md transition-all duration-300 flex items-center"
        style={{
          backgroundColor: `${COLORS.LINEN}CC`, // ~80% opacity
          borderColor: COLORS.CHAMPAGNE,
        }}
      >
        {/* SLIDING PILL (Background) */}
        <div
          className="absolute top-0 bottom-0 my-auto h-full rounded-full pointer-events-none"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
            backgroundColor: COLORS.ESPRESSO,
            transition:
              "left 0.5s cubic-bezier(0.23, 1, 0.32, 1), width 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease",
          }}
        />

        {/* ITEMS */}
        <ul className="flex items-center relative gap-0">
          {NAV_ITEMS.map((item, index) => {
            const isActive = currentView === item.id;

            return (
              <li
                key={item.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                onClick={() => onNavigate(item.id as ViewState)}
                className="relative z-10 cursor-pointer px-4 md:px-6 py-2 rounded-full overflow-hidden group"
              >
                <div className="relative overflow-hidden flex flex-col items-center justify-center">
                  {/* LAYER 1: Standard Text */}
                  <span
                    className="block text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 delay-75"
                    style={{
                      color: isActive ? COLORS.LINEN : COLORS.ESPRESSO,
                    }}
                  >
                    {item.label}
                  </span>

                  {/* LAYER 2: Gold Hover Text */}
                  {!isActive && (
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs font-bold tracking-widest uppercase translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"
                      style={{ color: COLORS.GOLD }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
