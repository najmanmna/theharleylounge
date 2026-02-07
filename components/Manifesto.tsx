"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform, useSpring, MotionValue } from "framer-motion";

const content = `We are not just a club. We are a sanctuary for the curious, the brave, and the bold. 
In a city of noise, we offer silence. In a world of digital connections, we offer a handshake. 
Here, status is left at the door, and character is the only currency. 
This is not for everyone. It is for you. Welcome to the new standard.`;

// Words to automatically highlight in Gold
const highlights = ["sanctuary", "curious,", "brave,", "bold.", "silence.", "handshake.", "character", "currency.", "you.", "standard."];

export default function Manifesto() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.2"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.2
  });

  const words = content.split(" ");

  return (
    <section 
      ref={container} 
      className="relative min-h-[80vh] flex items-center justify-center py-32 px-6 md:px-20 overflow-hidden bg-[#02120b]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,31,22,0.4)_0%,#02120b_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left">
        <p className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-3 text-3xl md:text-6xl font-serif leading-[1.3] tracking-tight">
          {words.map((word, i) => {
            // FIX: Compress the total timeline to 0.9 (90%) so the animation finishes early
            const step = 0.9 / words.length; 
            const start = i * step;
            // Overlap slightly, but ensure it doesn't exceed 1.0 easily
            const end = start + step * 2.5; 

            const isHighlight = highlights.includes(word.toLowerCase());

            return (
              <Word 
                key={i} 
                progress={smoothProgress} 
                range={[start, end]} 
                isHighlight={isHighlight}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

const Word = ({ 
  children, 
  progress, 
  range, 
  isHighlight 
}: { 
  children: string, 
  progress: MotionValue<number>, 
  range: [number, number],
  isHighlight: boolean 
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const blur = useTransform(progress, range, [10, 0]);
  const y = useTransform(progress, range, [20, 0]);
  const scale = useTransform(progress, range, [0.9, 1]);
  
  // FIX: Ensure color transform handles the 'clamped' range correctly
  const color = useTransform(
    progress, 
    range, 
    ['#071f16', isHighlight ? '#eebb4d' : '#eae8dc'] 
  );

  return (
    <span className="relative inline-block mr-1">
      <span className="absolute inset-0 text-[#0b3d2e] opacity-20 blur-[2px] select-none">
        {children}
      </span>

      <motion.span 
        style={{ 
          opacity, 
          filter: useTransform(blur, (v) => `blur(${v}px)`), 
          y,
          scale,
          color,
          // FIX: Only apply shadow when fully visible to prevent flickering artifacts
          textShadow: isHighlight 
            ? useTransform(opacity, [0.9, 1], ["none", "0 0 20px rgba(238,187,77,0.3)"]) 
            : "none" 
        }} 
        className={`relative inline-block transition-colors duration-500 ${isHighlight ? 'font-medium' : 'font-light'}`}
      >
        {children}
      </motion.span>
    </span>
  );
};