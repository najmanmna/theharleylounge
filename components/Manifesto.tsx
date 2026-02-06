"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

const content = `We are not just a club. We are a sanctuary for the curious, the brave, and the bold. 
In a city of noise, we offer silence. In a world of digital connections, we offer a handshake. 
Here, status is left at the door, and character is the only currency. 
This is not for everyone. It is for you. Welcome to the new standard.`;

export default function Manifesto() {
  const container = useRef(null);
  
  // Track scroll relative to this specific container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"], 
  });

  const words = content.split(" ");

  return (
    <section 
      ref={container} 
      className="bg-obsidian min-h-[60vh] flex items-center justify-center py-20 px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <p className="flex flex-wrap gap-x-3 gap-y-2 text-2xl md:text-5xl font-serif leading-[1.4]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  // 1. Opacity: Fade in from 0 to 1
  const opacity = useTransform(progress, range, [0, 1]);
  
  // 2. Blur: Start blurry (10px) and become sharp (0px)
  const filter = useTransform(progress, range, ['blur(10px)', 'blur(0px)']);
  
  // 3. Slide: Slide up slightly from 20px down to 0px
  const y = useTransform(progress, range, [20, 0]);
  
  return (
    <span className="relative mr-2 mt-2 inline-block">
      {/* Ghost text for layout stability */}
      <span className="absolute opacity-10 text-cream/20">{children}</span> 
      
      {/* The Animated Word */}
      <motion.span 
        style={{ opacity, filter, y }} 
        className="text-cream inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};