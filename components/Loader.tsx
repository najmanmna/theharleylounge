"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

declare global {
  interface Window {
    harleyLoaderShown: boolean;
  }
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isPresent, setIsPresent] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if loader was already shown
    if (typeof window !== "undefined" && window.harleyLoaderShown) {
      setShouldRender(false);
      onComplete();
      return;
    }

    // Lock scroll
    document.body.style.overflow = "hidden";
    
    // Timer
    const timer = setTimeout(() => {
      setIsPresent(false);
      
      if (typeof window !== "undefined") {
        window.harleyLoaderShown = true;
      }

      // Wait for the exit animation (0.8s) + a tiny buffer
      setTimeout(() => {
        onComplete();
        document.body.style.overflow = "unset";
      }, 1000); 
    }, 3500);

    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence mode="wait">
      {isPresent && (
        <motion.div
          key="loader-curtain"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", // The Curtain Lift Effect
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] // Custom "Luxury" Bezier Curve
            } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white will-change-transform"
        >
          {/* Inner Content Container - Fades out slightly as the curtain lifts */}
          <motion.div 
             exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
             className="relative flex items-center justify-center w-80 h-80 md:w-96 md:h-96"
          >
            
            {/* --- 1. The Double Diamond Border Animation --- */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Outer Border */}
              <motion.rect
                x="15" y="15" width="70" height="70"
                rx="0"
                fill="transparent"
                stroke="white"
                strokeWidth="0.8"
                initial={{ pathLength: 0, rotate: 45, opacity: 0 }}
                animate={{ pathLength: 1, rotate: 45, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="origin-center"
              />
              {/* Inner Border */}
              <motion.rect
                x="18" y="18" width="64" height="64"
                rx="0"
                fill="black"
                stroke="white"
                strokeWidth="0.5"
                initial={{ pathLength: 0, rotate: 45, opacity: 0 }}
                animate={{ pathLength: 1, rotate: 45, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="origin-center"
              />
            </svg>

            {/* --- 2. The Text Content --- */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center transform scale-90 md:scale-100">
              
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="font-serif text-xs md:text-sm tracking-widest mb-1"
              >
                THE
              </motion.span>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="h-[1px] bg-white w-32 mb-2"
              />

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="font-serif text-2xl md:text-3xl tracking-wide uppercase mb-2 px-4 whitespace-nowrap"
              >
                Harley Lounge
              </motion.h1>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="h-[1px] bg-white w-32 mb-2"
              />

              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 1 }}
                style={{ color: "#C5A059" }} 
                className="font-serif text-sm md:text-base font-semibold tracking-widest uppercase"
              >
                Concierge
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}