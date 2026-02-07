"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const content = `We are not just a club. We are a sanctuary for the curious, the brave, and the bold. 
In a city of noise, we offer silence. In a world of digital connections, we offer a handshake. 
Here, status is left at the door, and character is the only currency. 
This is not for everyone. It is for you. Welcome to the new standard.`;

const highlights = ["sanctuary", "curious,", "brave,", "bold.", "silence.", "handshake.", "character", "currency.", "you.", "standard."];

export default function Manifesto() {
  const container = useRef(null);
  // Trigger animation when 20% of the component is visible
  const isInView = useInView(container, { amount: 0.2, once: true });

  const words = content.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, // Fast, smooth stagger
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0.1, 
      y: 10,
      filter: "blur(4px)" // Keep blur in initial state (cheap)
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)", // Remove blur on animate (cheap)
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={container} 
      className="relative min-h-[60vh] flex items-center justify-center py-24 px-6 md:px-20 overflow-hidden bg-[#02120b]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,31,22,0.4)_0%,#02120b_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left">
        <motion.p 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center md:justify-start gap-x-2 md:gap-x-4 gap-y-2 md:gap-y-3 text-2xl md:text-5xl font-serif leading-[1.4] tracking-tight"
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