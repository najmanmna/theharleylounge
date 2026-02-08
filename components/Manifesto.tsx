"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";

const content = `We are not just a club. We are a sanctuary for the curious, the brave, and the bold. 
In a city of noise, we offer silence. In a world of digital connections, we offer a handshake. 
Here, status is left at the door, and character is the only currency. 
This is not for everyone. It is for you. Welcome to the new standard.`;

const highlights = ["sanctuary", "curious,", "brave,", "bold.", "silence.", "handshake.", "character", "currency.", "you.", "standard."];

export default function Manifesto() {
  const container = useRef(null);
  const isInView = useInView(container, { amount: 0.2, once: true });
  const [isMobile, setIsMobile] = useState(true); // Default true for safety

  // 1. Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const words = content.split(" ");

  // 2. Optimized Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // No stagger on mobile = instant render
        staggerChildren: isMobile ? 0 : 0.02,
        delayChildren: isMobile ? 0 : 0.1
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { 
      // On mobile, start fully visible (no blur/translate) to save GPU
      opacity: isMobile ? 1 : 0.1, 
      y: isMobile ? 0 : 10,
      filter: isMobile ? "blur(0px)" : "blur(4px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        // Instant duration on mobile
        duration: isMobile ? 0 : 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={container} 
      className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center py-16 md:py-24 px-6 md:px-20 overflow-hidden bg-[#02120b]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,31,22,0.4)_0%,#02120b_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left">
        <motion.p 
          variants={containerVariants}
          // OPTIMIZATION: On mobile, start 'visible' immediately to avoid flash of invisible text
          initial={isMobile ? "visible" : "hidden"}
          animate={isMobile ? "visible" : (isInView ? "visible" : "hidden")}
          className="flex flex-wrap justify-center md:justify-start gap-x-1.5 md:gap-x-4 gap-y-1 md:gap-y-3 text-xl md:text-5xl font-serif leading-[1.4] tracking-tight"
        >
          {words.map((word, i) => {
            const isHighlight = highlights.includes(word.toLowerCase());
            
            return (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className={`relative inline-block ${isHighlight ? 'text-[#eebb4d] font-medium' : 'text-[#eae8dc] font-light'}`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.p>
      </div>
    </section>
  );
}