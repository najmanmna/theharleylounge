"use client";

import { useRef, useState } from "react";
import { 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  LazyMotion, 
  domAnimation, 
  m, 
  AnimatePresence 
} from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);
  const [loopKey, setLoopKey] = useState(0);

  // 1. Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 2. Mouse Parallax (The "Floating" Effect)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement so it feels like floating in water
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate movement relative to center (ranges from -20 to 20 pixels)
    mouseX.set((clientX / innerWidth - 0.5) * -30);
    mouseY.set((clientY / innerHeight - 0.5) * -30);
  };

  const handleVideoEnd = () => {
    setLoopKey((prev) => prev + 1);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative h-[110vh] w-full overflow-hidden bg-[#02120b]" // Deep Emerald Base
      >
        
        {/* --- LAYER 1: The Cinematic "Ken Burns" Video --- */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <m.div
              key={loopKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <m.video
                // The Scale Animation: Slowly zooms from 1.05 to 1.15 over the video duration
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 15, ease: "linear" }} // Adjust duration to match your video length roughly
                onEnded={handleVideoEnd}
                autoPlay
                muted
                playsInline
                className="object-cover w-full h-full opacity-50 brightness-[0.7] contrast-[1.1] saturate-[0.8]"
              >
                <source src="/harley_lounge.mp4" type="video/mp4" />
              </m.video>
            </m.div>
          </AnimatePresence>

          {/* Atmospheric Tints */}
          <div className="absolute inset-0 bg-[#061a12]/40 mix-blend-color pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02120b]/20 to-[#02120b] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* --- LAYER 2: Floating Content --- */}
        <m.div 
          style={{ y: textY, x: smoothX, opacity }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
        >
          {/* Top Tagline */}
          <m.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="text-[#eebb4d]/60 text-[10px] md:text-xs uppercase tracking-[0.6em] mb-10 block font-medium"
          >
            Private & Uninterrupted
          </m.span>

          {/* Main Title with "Liquid Gold" Gradient */}
          <m.h1 
            style={{ x: smoothX }} // Parallax effect specifically on the text
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "circOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#eae8dc] mb-10 tracking-tight leading-none"
          >
            The Harley <br />
            <span className="italic font-extralight text-white/20 relative inline-block">
              Lounge
              {/* Subtle Glow behind the word "Lounge" */}
              <span className="absolute inset-0 blur-2xl bg-[#eebb4d]/10 -z-10" />
            </span>
          </m.h1>

          {/* The Separator Line */}
          <m.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "60px", opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#eebb4d]/50 to-transparent mb-10"
          />

          {/* Bottom Text */}
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="max-w-md text-[#eae8dc]/50 text-xs md:text-sm font-light tracking-[0.2em] uppercase leading-loose"
          >
            Escape the noise <span className="text-[#eebb4d] mx-2">•</span> Entry by invitation
          </m.p>

          {/* Interactive Button */}
          <m.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(238, 187, 77, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-8 py-4 border border-[#eebb4d]/20 text-[#eebb4d]/80 text-[10px] uppercase tracking-[0.3em] 
                       hover:bg-[#eebb4d]/5 hover:text-[#eebb4d] transition-all duration-500 backdrop-blur-sm"
          >
            Request Access
          </m.button>
        </m.div>

        {/* --- LAYER 3: Scroll Indicator --- */}
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-widest text-white/40">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </m.div>

      </section>
    </LazyMotion>
  );
}