"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. Lock scroll on mount
    document.body.style.overflow = "hidden";
    
    // 2. Unlock scroll when the curtain finishes (delayed)
    if (isFinished) {
      const timer = setTimeout(() => {
        document.body.style.overflow = "unset";
      }, 1000);
      return () => clearTimeout(timer);
    }

    // 3. SAFETY CLEANUP: If this component unmounts, ALWAYS unlock scroll
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFinished]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay: i * 0.2, duration: 0.01 },
      },
    }),
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isFinished ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9999] bg-obsidian flex flex-col items-center justify-center p-4"
    >
      <div className="relative w-full max-w-lg h-64 flex items-center justify-center">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(400, 250)">
            <motion.path
              d="M-100,-50 C-150,-100 0,-150 50,-50 C150,50 100,150 0,100 C-100,50 -150,150 -50,200 C50,250 150,200 200,100 C250,0 150,-100 50,-150 C-50,-200 -150,-150 -200,-50 C-250,50 -150,200 0,250"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
              variants={draw}
              initial="hidden"
              animate="visible"
              custom={0}
            />
            <motion.path
              d="M0,0 C-100,100 100,200 200,0 C300,-200 -200,-200 -100,0 C0,200 -300,100 -200,-100"
              stroke="#D4AF37"
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
        className="relative z-50 text-center -mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        onAnimationComplete={() => {
            setTimeout(() => setIsFinished(true), 2000); 
        }}
      >
        <h1 className="text-4xl md:text-6xl font-serif text-cream tracking-widest font-bold">
          THE HARLEY
        </h1>
        <p className="text-gold text-sm md:text-lg font-sans tracking-[0.5em] mt-2 uppercase">
          Lounge • London
        </p>
      </motion.div>
    </motion.div>
  );
}