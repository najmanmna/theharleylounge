"use client";

import { useRef, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent hydration mismatch

  // 1. Detect Mobile Once on Mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); // Reduced distance for smoother scroll
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // 3. Mouse Parallax (Optimized)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Stiff spring for responsive yet smooth feel
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 }); 
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Completely skip logic if mobile to save CPU
    if (isMobile) return; 

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate percentage (-0.5 to 0.5)
    const xPct = (clientX / innerWidth - 0.5);
    const yPct = (clientY / innerHeight - 0.5);
    
    // Move range: 20px
    mouseX.set(xPct * 20);
    mouseY.set(yPct * 20);
  };

  const handleVideoEnd = () => {
    setLoopKey((prev) => prev + 1);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative h-[100vh] sm:h-[110vh] w-full overflow-hidden bg-[#02120b]"
      >
        
        {/* --- LAYER 1: Video Background --- */}
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
                // OPTIMIZATION: Only scale on Desktop. Mobile GPUs struggle to scale video.
                initial={{ scale: 1.05 }}
                animate={isMobile ? { scale: 1.05 } : { scale: 1.12 }} 
                transition={{ duration: 15, ease: "linear" }}
                
                onEnded={handleVideoEnd}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                // OPTIMIZATION: Removed filters (brightness/contrast) which kill mobile FPS
                // Added will-change-transform to force GPU layer promotion
                className="object-cover w-full h-full opacity-50 will-change-transform"
              >
                <source src="/harley_final.mp4" type="video/mp4" />
              </m.video>
            </m.div>
          </AnimatePresence>

          {/* Overlays - Using opacity instead of mix-blend-mode for performance */}
          <div className="absolute inset-0 bg-[#02120b]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02120b]/20 to-[#02120b] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* --- LAYER 2: Content --- */}
        <m.div 
          style={{ y: textY, opacity }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 pt-12 sm:pt-0"
        >
          {/* Top Tagline */}
          <m.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-[#eebb4d]/60 text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-10 block font-medium"
          >
            Private & Uninterrupted
          </m.span>

          {/* Main Title */}
          <m.h1 
            style={{ x: smoothX, y: smoothY }} 
            // OPTIMIZATION: Removed heavy blur filter animation on enter
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Custom easing for "premium" feel
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#eae8dc] mb-8 md:mb-10 tracking-tight leading-[1.1] md:leading-none will-change-transform"
          >
            The Harley <br />
            <span className="italic font-extralight text-white/20 relative inline-block">
              Lounge
              {/* Reduced blur radius for better mobile performance */}
              <span className="absolute inset-0 blur-xl md:blur-2xl bg-[#eebb4d]/10 -z-10" />
            </span>
          </m.h1>

          {/* Separator */}
          <m.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "60px", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#eebb4d]/50 to-transparent mb-8 md:mb-10"
          />

          {/* Bottom Text */}
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="max-w-[280px] sm:max-w-md text-[#eae8dc]/50 text-[10px] sm:text-xs md:text-sm font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-relaxed"
          >
            Escape the noise <span className="text-[#eebb4d] mx-2">•</span> Entry by invitation
          </m.p>

          {/* Button */}
          <m.a
            href="https://apply.theharleylounge.com/"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(238, 187, 77, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 md:mt-12 px-6 md:px-8 py-3 md:py-4 border border-[#eebb4d]/20 text-[#eebb4d]/80 text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] 
                       hover:bg-[#eebb4d]/5 hover:text-[#eebb4d] transition-all duration-500 backdrop-blur-sm inline-block cursor-pointer select-none"
          >
            Request Access
          </m.a>
        </m.div>

        {/* --- LAYER 3: Scroll Indicator --- */}
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-widest text-white/40">Scroll</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </m.div>

      </section>
    </LazyMotion>
  );
}