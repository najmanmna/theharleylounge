"use client";

import { motion, AnimatePresence, Variants } from "framer-motion"; // <--- 1. Import Variants
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
        setIsFinished(true);
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAnimationComplete = () => {
    document.body.style.overflow = "auto";
    onComplete();
  };

  // 2. Add the ': Variants' type annotation here
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.3, type: "spring", duration: 2.5, bounce: 0 },
        opacity: { delay: i * 0.3, duration: 0.01 },
      },
    }),
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!isFinished && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-obsidian flex flex-col items-center justify-center p-4"
        >
          
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

          {/* THE LOGO CONTAINER */}
          <div className="relative w-full max-w-lg h-64 flex items-center justify-center">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 800 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(400, 250) scale(1.2)">
                <motion.path
                  d="M-100,-50 C-150,-100 0,-150 50,-50 C150,50 100,150 0,100 C-100,50 -150,150 -50,200 C50,250 150,200 200,100 C250,0 150,-100 50,-150 C-50,-200 -150,-150 -200,-50 C-250,50 -150,200 0,250"
                  stroke="#D4AF37"
                  strokeWidth="4"
                  strokeLinecap="round"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                />
                <motion.path
                  d="M0,0 C-100,100 100,200 200,0 C300,-200 -200,-200 -100,0 C0,200 -300,100 -200,-100"
                  stroke="#D4AF37"
                  strokeWidth="3"
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
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-center -mt-4 relative z-10"
          >
            <h1 className="text-3xl md:text-5xl font-serif text-cream tracking-widest font-bold">
              THE HARLEY
            </h1>
            <p className="text-gold text-xs font-sans tracking-[0.6em] mt-3 uppercase opacity-80">
              Lounge & Concierge
            </p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}