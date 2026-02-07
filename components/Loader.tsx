"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

// Extend the window interface to avoid TypeScript errors
declare global {
  interface Window {
    hasShownHarleyLoader?: boolean;
  }
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 1. Check a temporary window variable (Clears on refresh, Persists on navigation)
    if (typeof window !== "undefined" && window.hasShownHarleyLoader) {
      setShouldRender(false);
      onComplete();
      return;
    }

    // 2. Play Animation
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
        setIsFinished(true);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  const handleAnimationComplete = () => {
    // 3. Mark as shown in the current window instance
    if (typeof window !== "undefined") {
      window.hasShownHarleyLoader = true;
    }
    
    document.body.style.overflow = "auto";
    onComplete();
  };

  if (!shouldRender) return null;

  // ... (Rest of your animation variants and JSX remain exactly the same)
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, type: "tween", ease: "easeInOut", duration: 2 },
        opacity: { delay: i * 0.2, duration: 0.01 },
      },
    }),
  };

  const containerVariants: Variants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        when: "afterChildren",
      }
    }
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
      {!isFinished && (
        <motion.div
          key="loader"
          variants={containerVariants}
          initial={{ y: 0 }}
          exit="exit"
          className="fixed inset-0 z-[9999] bg-[#02120b] flex flex-col items-center justify-center p-4 will-change-transform"
        >
          
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

          {/* THE LOGO CONTAINER */}
          <div className="relative w-full max-w-[300px] md:max-w-lg h-48 md:h-64 flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 800 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(400, 250) scale(1.0)">
                <motion.path
                  d="M-100,-50 C-150,-100 0,-150 50,-50 C150,50 100,150 0,100 C-100,50 -150,150 -50,200 C50,250 150,200 200,100 C250,0 150,-100 50,-150 C-50,-200 -150,-150 -200,-50 C-250,50 -150,200 0,250"
                  stroke="#eebb4d"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                />
                <motion.path
                  d="M0,0 C-100,100 100,200 200,0 C300,-200 -200,-200 -100,0 C0,200 -300,100 -200,-100"
                  stroke="#eebb4d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                />
              </g>
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className="text-center -mt-8 md:-mt-4 relative z-10"
          >
            <h1 className="text-3xl md:text-5xl font-serif text-[#eae8dc] tracking-widest font-bold">
              THE HARLEY
            </h1>
            <p className="text-[#eebb4d] text-[10px] md:text-xs font-sans tracking-[0.4em] md:tracking-[0.6em] mt-3 uppercase opacity-90">
              Lounge & Concierge
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}