"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    title: "Hidden Gem",
    subtitle: "In the Heart of Harley Street",
    description: "Welcome to an exclusive haven of tranquillity. Nestled deep within the historic fabric of Cavendish Square, this is not just a lounge—it is London's best-kept secret.",
    image: "/harley_street.jpg", // Replace with your actual image path
    accent: "from-[#02120b] to-[#052e1f]", // Deep Emerald
    id: "01"
  },
  {
    title: "The Sanctuary",
    subtitle: "Elegance Meets Comfort",
    description: "A private retreat designed for the few. Escape the city's noise and step into a world of velvet shadows, warm amber light, and uncompromising luxury.",
    image: "/about2.jpeg", // Replace with your actual image path
    accent: "from-[#020403] to-[#1a1500]", // Deep Amber
    id: "02"
  },
  {
    title: "The Community",
    subtitle: "Distinguished Company",
    description: "Where distinguished medical professionals and visionary creatives converge. A space curated for connection, conversation, and the exchange of brilliant ideas.",
    image: "/about3.webp",
    accent: "from-[#050505] to-[#0f0f1a]", // Midnight Blue
    id: "03"
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-[#02120b]">
      
      {/* =======================
          DESKTOP LAYOUT (Unchanged)
      ======================== */}
      <div className="hidden md:flex">
        {/* ... (Previous Desktop Code remains here for reference/completeness) ... */}
        {/* LEFT COLUMN: STICKY CONTENT */}
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center p-12 z-20">
          {chapters.map((chapter, i) => {
             const start = i / chapters.length;
             const end = (i + 1) / chapters.length;
             const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
             return (
               <motion.div 
                 key={i}
                 style={{ opacity }}
                 className={`absolute inset-0 bg-gradient-to-br ${chapter.accent} opacity-40 transition-colors duration-1000`} 
               />
             );
          })}
          
          <div className="absolute left-12 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-white/5 hidden lg:block overflow-hidden">
            <motion.div 
              style={{ scaleY: scrollYProgress }} 
              className="w-full h-full bg-[#eebb4d] origin-top shadow-[0_0_10px_#eebb4d]"
            />
          </div>

          <div className="max-w-2xl relative w-full pl-16"> 
            {chapters.map((chapter, index) => {
              const rangeStart = index * (1 / chapters.length);
              const rangeEnd = (index + 1) * (1 / chapters.length);
              
              const opacity = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.2, rangeEnd], [0, 1, 1, 0]);
              const y = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.2, rangeEnd], [50, 0, 0, -50]);
              const filter = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.2, rangeEnd], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

              return (
                <motion.div 
                  key={index} 
                  style={{ opacity, y, filter, display: index === 0 ? 'block' : undefined }}
                  className="absolute inset-0 top-1/2 -translate-y-1/2 w-full flex flex-col justify-center"
                >
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "40px" }}
                    transition={{ duration: 0.8 }}
                    className="h-[1px] bg-[#eebb4d] mb-8"
                  />
                  <h3 className="text-[#eebb4d] text-xs tracking-[0.4em] uppercase mb-6 font-sans font-medium">
                    {chapter.id} — {chapter.subtitle}
                  </h3>
                  <h2 className="text-5xl lg:text-7xl font-serif text-[#eae8dc] mb-8 leading-[1.1]">
                    {chapter.title}
                  </h2>
                  <p className="text-[#eae8dc]/60 text-lg font-light leading-relaxed font-sans max-w-md">
                    {chapter.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE PARALLAX IMAGES */}
        <div className="w-1/2 z-10">
          {chapters.map((chapter, index) => (
             <ParallaxImage key={index} src={chapter.image} alt={chapter.title} index={index} />
          ))}
        </div>
      </div>

      {/* =======================
          MOBILE LAYOUT (Optimized)
      ======================== */}
      <div className="md:hidden flex flex-col">
        {chapters.map((chapter, index) => (
           <MobileChapterCard key={index} chapter={chapter} index={index} total={chapters.length} />
        ))}
      </div>
    </section>
  );
}

// --- DESKTOP SUB-COMPONENT (Unchanged) ---
function ParallaxImage({ src, alt, index }: { src: string, alt: string, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const curtainY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div ref={ref} className="h-screen w-full relative flex items-center justify-center border-l border-white/5 bg-[#050505] overflow-hidden group">
       <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
       <div className="relative w-[75%] h-[65%] overflow-hidden shadow-2xl">
         <motion.div style={{ y: imageY, scale }} className="relative w-full h-full grayscale-[100%] group-hover:grayscale-0 transition-all duration-1000 ease-out">
            <Image src={src} alt={alt} fill className="object-cover" />
         </motion.div>
         <motion.div style={{ y: curtainY }} className="absolute inset-0 z-20 bg-[#02120b]">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#eebb4d] shadow-[0_0_20px_#eebb4d]" />
         </motion.div>
         <div className="absolute inset-4 border border-white/10 pointer-events-none z-30" />
       </div>
       <div className="absolute bottom-10 right-10 text-[15rem] font-serif text-[#eebb4d]/[0.02] leading-none select-none pointer-events-none">
         0{index + 1}
       </div>
    </div>
  );
}

// --- NEW MOBILE SUB-COMPONENT ---
function MobileChapterCard({ chapter, index, total }: { chapter: any, index: number, total: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  // Stacking logic: Each card sticks slightly below the previous one to show the "stack"
  const topOffset = 80 + (index * 10); 

  return (
    <div 
      ref={ref}
      className="sticky min-h-[85vh] flex flex-col bg-[#02120b] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
      style={{ top: 0, zIndex: index + 10 }} // Simple sticky top 0 for standard stacking
    >
      {/* Background Gradient matching the chapter theme */}
      <div className={`absolute inset-0 bg-gradient-to-b ${chapter.accent} opacity-20 pointer-events-none`} />
      
      {/* Top Bar / Chapter Indicator */}
      <div className="w-full flex justify-between items-center px-6 py-6 border-b border-white/5 bg-[#02120b]/90 backdrop-blur-md z-20">
         <span className="text-[#eebb4d] text-[10px] tracking-[0.2em] uppercase">
            Chapter {chapter.id}
         </span>
         <span className="text-white/20 text-[10px] tracking-widest">
            {index + 1} / {total}
         </span>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6 pb-20 relative z-10">
        
        {/* Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-[4/3] overflow-hidden rounded-sm shadow-2xl mb-10"
        >
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Inner Border */}
          <div className="absolute inset-3 border border-white/20 pointer-events-none" />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-40" />
        </motion.div>

        {/* Text Content */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-[#eebb4d]/80 text-xs tracking-[0.2em] uppercase block mb-3">
             {chapter.subtitle}
          </span>
          <h2 className="text-4xl font-serif text-[#eae8dc] mb-4 leading-tight">
             {chapter.title}
          </h2>
          <div className="w-12 h-[1px] bg-[#eebb4d]/50 mb-6" />
          <p className="text-[#eae8dc]/60 font-light leading-relaxed text-sm">
             {chapter.description}
          </p>
        </motion.div>

      </div>
    </div>
  );
}