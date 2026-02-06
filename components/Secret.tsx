"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Secret() {
  const [keys, setKeys] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const secretCode = "GOLD";

  // 1. LISTEN FOR THE CODE
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setKeys((prev) => {
        const newKeys = [...prev, key].slice(-4);
        if (newKeys.join("") === secretCode) {
          setIsActive(true);
        }
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-[10000] pointer-events-none">
          
          {/* 2. THE NOTIFICATION TOAST */}
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-10 left-0 right-0 flex justify-center pointer-events-auto"
          >
            <div className="bg-obsidian/90 border border-gold/50 px-8 py-4 rounded-full flex items-center gap-4 shadow-[0_0_30px_rgba(212,175,55,0.3)] backdrop-blur-md">
              <span className="text-gold font-serif tracking-widest uppercase text-sm">
                ✨ VIP Atmosphere: Unlocked
              </span>
              <button 
                onClick={() => setIsActive(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* 3. THE GOLD RAIN */}
          {/* We generate 50 particles with random properties */}
          {Array.from({ length: 50 }).map((_, i) => (
            <Particle key={i} />
          ))}
          
        </div>
      )}
    </AnimatePresence>
  );
}

// Sub-component for individual gold flakes
function Particle() {
  // Randomize starting position (left 0-100%)
  const randomLeft = Math.random() * 100;
  // Randomize animation duration (fall speed)
  const randomDuration = Math.random() * 3 + 2; // Between 2s and 5s
  // Randomize delay so they don't all start at once
  const randomDelay = Math.random() * 2;
  // Randomize size
  const randomSize = Math.random() * 8 + 4; // 4px to 12px

  return (
    <motion.div
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={{ 
        y: "110vh", 
        opacity: [0, 1, 1, 0], // Fade in, stay visible, fade out at bottom
        rotate: 360 // Spin as it falls
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity, // Keep raining until closed
        ease: "linear"
      }}
      style={{
        left: `${randomLeft}%`,
        width: randomSize,
        height: randomSize,
      }}
      className="absolute top-0 bg-gradient-to-tr from-[#D4AF37] to-[#F7E7CE] rounded-sm shadow-[0_0_10px_rgba(212,175,55,0.5)]"
    />
  );
}