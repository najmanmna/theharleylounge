"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- MOUSE TRACKING FOR "TORCH" EFFECT ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      // Update CSS variables for the spotlight
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-obsidian flex items-center justify-center"
    >
      {/* 1. BACKGROUND LAYERS */}
      
      {/* Base Dark Layer (The "Unlit" Room) */}
      <div className="absolute inset-0 bg-neutral-950 z-0" />

      {/* The Texture Layer (Revealed by Mouse) */}
      {/* Note: In production, replace the url below with a high-res photo of the lounge interior. */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 z-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571508601891-ca5e7a713859?q=80&w=2070&auto=format&fit=crop')", // Placeholder: Dark Moody Interior
          backgroundSize: "cover",
          backgroundPosition: "center",
          // The Magic: We mask this image so it only shows under the mouse
          maskImage: "radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 80%)",
          opacity: 1 // We keep opacity 1, but the mask hides it
        }} 
      />

      {/* 2. THE GOLD SCRIBBLE ANIMATION (Logo Mimic) */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            d="M100,500 C200,300 400,100 600,500 S 900,900 300,500 S 100,100 500,100 S 900,500 500,900" // Abstract loops
            fill="transparent"
            stroke="#D4AF37"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* 3. HERO CONTENT */}
      <div className="relative z-30 text-center px-4 max-w-4xl">
        
        {/* Animated Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-sans"
        >
          15 Cavendish Square • London
        </motion.p>

        {/* Main Title - Split for impact */}
        <div className="overflow-hidden mb-2">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif text-cream leading-[0.9]"
          >
            THE HARLEY
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.0, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-serif text-cream italic opacity-80 leading-[0.9]"
          >
            LOUNGE
          </motion.h1>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <button className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-gold transition-colors duration-500 overflow-hidden">
            {/* Button Fill Effect */}
            <div className="absolute inset-0 bg-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            
            <div className="relative z-10 flex items-center gap-4">
              <span className="text-sm uppercase tracking-widest text-cream group-hover:text-obsidian transition-colors">
                Request Access
              </span>
              <ArrowRight className="w-4 h-4 text-cream group-hover:text-obsidian transition-colors" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* 4. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>

    </section>
  );
}