"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    title: "Hidden Gem",
    subtitle: "In the Heart of Harley Street",
    description: "Welcome to an exclusive haven of tranquillity. Nestled deep within the historic fabric of Cavendish Square, this is not just a lounge—it is London's best-kept secret.",
    image: "/harley_street.jpg",
    accent: "from-[#02120b] to-[#052e1f]",
    id: "01"
  },
  {
    title: "The Sanctuary",
    subtitle: "Elegance Meets Comfort",
    description: "A private retreat designed for the few. Escape the city's noise and step into a world of velvet shadows, warm amber light, and uncompromising luxury.",
    image: "/about2.jpeg",
    accent: "from-[#020403] to-[#1a1500]",
    id: "02"
  },
  {
    title: "The Community",
    subtitle: "Distinguished Company",
    description: "Where distinguished medical professionals and visionary creatives converge. A space curated for connection, conversation, and the exchange of brilliant ideas.",
    image: "/about3.webp",
    accent: "from-[#050505] to-[#0f0f1a]",
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
          DESKTOP LAYOUT
      ======================== */}
      <div className="hidden md:flex">
        
        {/* LEFT COLUMN: STICKY TEXT */}
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center p-12 z-20">
          
          {/* Background Gradients */}
          {chapters.map((chapter, i) => {
             const step = 1 / chapters.length;
             const start = i * step;
             const end = start + step;
             
             // Logic: Standard fade in/out for background
             // eslint-disable-next-line react-hooks/rules-of-hooks
             const opacity = useTransform(scrollYProgress, [start, start + 0.2, end - 0.2, end], [0, 1, 1, 0]);
             
             return (
               <motion.div 
                 key={i}
                 style={{ opacity }}
                 className={`absolute inset-0 bg-gradient-to-br ${chapter.accent} opacity-30 transition-colors duration-1000`} 
               />
             );
          })}

          {/* Gold Progress Line */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-white/5 hidden lg:block overflow-hidden">
            <motion.div 
              style={{ scaleY: scrollYProgress }} 
              className="w-full h-full bg-[#eebb4d] origin-top shadow-[0_0_10px_#eebb4d]"
            />
          </div>

          {/* Text Content */}
          <div className="max-w-xl relative w-full pl-20"> 
            {chapters.map((chapter, index) => {
              const step = 1 / chapters.length;
              const start = index * step;
              const end = start + step;
              const isFirst = index === 0;
              const isLast = index === chapters.length - 1;

              let opacity, y;

              // === THE FIX: HANDLE EDGES DIFFERENTLY ===
              if (isFirst) {
                  // Chapter 1: Visible immediately (0), fades out at the end
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  opacity = useTransform(scrollYProgress, [0, 0, end - 0.2, end], [1, 1, 1, 0]);
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  y = useTransform(scrollYProgress, [0, 0, end - 0.2, end], [0, 0, 0, -30]);
              } else if (isLast) {
                  // Chapter 3: Fades in, then stays visible until the very end (1)
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  opacity = useTransform(scrollYProgress, [start, start + 0.2, 1, 1], [0, 1, 1, 1]);
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  y = useTransform(scrollYProgress, [start, start + 0.2, 1, 1], [30, 0, 0, 0]);
              } else {
                  // Chapter 2 (Middle): Standard Fade In -> Hold -> Fade Out
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  opacity = useTransform(scrollYProgress, [start, start + 0.2, end - 0.2, end], [0, 1, 1, 0]);
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  y = useTransform(scrollYProgress, [start, start + 0.2, end - 0.2, end], [30, 0, 0, -30]);
              }
              
              return (
                <motion.div 
                  key={index} 
                  style={{ opacity, y, display: index === 0 ? 'block' : undefined }}
                  className="absolute inset-0 top-1/2 -translate-y-1/2 w-full flex flex-col justify-center"
                >
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "40px" }}
                    transition={{ duration: 0.8 }}
                    className="h-[1px] bg-[#eebb4d] mb-6"
                  />
                  <h3 className="text-[#eebb4d] text-xs tracking-[0.4em] uppercase mb-4 font-sans font-medium">
                    {chapter.id} — {chapter.subtitle}
                  </h3>
                  <h2 className="text-5xl lg:text-6xl font-serif text-[#eae8dc] mb-6 leading-[1.1]">
                    {chapter.title}
                  </h2>
                  <p className="text-[#eae8dc]/60 text-base font-light leading-relaxed font-sans max-w-sm">
                    {chapter.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLING IMAGES */}
        <div className="w-1/2 z-10 bg-[#050505] border-l border-white/5">
          {chapters.map((chapter, index) => (
             <ParallaxImage key={index} src={chapter.image} alt={chapter.title} index={index} />
          ))}
        </div>
      </div>

      {/* =======================
          MOBILE LAYOUT (Unchanged)
      ======================== */}
      <div className="md:hidden flex flex-col">
        {chapters.map((chapter, index) => (
           <MobileChapterCard key={index} chapter={chapter} index={index} total={chapters.length} />
        ))}
      </div>
    </section>
  );
}

// --- DESKTOP SUB-COMPONENT ---
function ParallaxImage({ src, alt, index }: { src: string, alt: string, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Subtle Parallax
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [1.1, 1]);

  return (
    <div ref={ref} className="h-screen w-full flex items-center justify-center p-16 lg:p-24 overflow-hidden relative">
       
       <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
       
       <div className="relative w-full h-full max-h-[70vh] overflow-hidden shadow-2xl border border-white/5">
         <motion.div style={{ y, scale }} className="relative w-full h-[120%] -top-[10%] grayscale-[100%] hover:grayscale-0 transition-all duration-1000 ease-out">
            <Image src={src} alt={alt} fill className="object-cover" />
         </motion.div>

         <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-30 pointer-events-none" />
         <div className="absolute inset-4 border border-white/10 pointer-events-none z-30" />
       </div>

       <div className="absolute bottom-20 right-10 lg:right-16 text-[10rem] font-serif text-[#eebb4d]/[0.05] leading-none select-none pointer-events-none z-0">
         0{index + 1}
       </div>
    </div>
  );
}

// --- MOBILE SUB-COMPONENT ---
function MobileChapterCard({ chapter, index, total }: { chapter: any, index: number, total: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  return (
    <div 
      ref={ref}
      className="sticky min-h-[85vh] flex flex-col bg-[#02120b] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
      style={{ top: 0, zIndex: index + 10 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${chapter.accent} opacity-20 pointer-events-none`} />
      
      <div className="w-full flex justify-between items-center px-6 py-6 border-b border-white/5 bg-[#02120b]/90 backdrop-blur-md z-20">
         <span className="text-[#eebb4d] text-[10px] tracking-[0.2em] uppercase">
            Chapter {chapter.id}
         </span>
         <span className="text-white/20 text-[10px] tracking-widest">
            {index + 1} / {total}
         </span>
      </div>

      <div className="flex-1 flex flex-col px-6 pt-6 pb-20 relative z-10">
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
          <div className="absolute inset-3 border border-white/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-40" />
        </motion.div>

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