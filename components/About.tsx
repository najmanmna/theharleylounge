"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    title: "Hidden Gem",
    subtitle: "In the Heart of Harley Street",
    description: "Welcome to an exclusive haven of tranquillity. Nestled deep within the historic fabric of Cavendish Square, this is not just a lounge—it is London's best-kept secret.",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "The Sanctuary",
    subtitle: "Elegance Meets Comfort",
    description: "A private retreat designed for the few. Escape the city's noise and step into a world of velvet shadows, warm amber light, and uncompromising luxury.",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "The Community",
    subtitle: "Distinguished Company",
    description: "Where distinguished medical professionals and visionary creatives converge. A space curated for connection, conversation, and the exchange of brilliant ideas.",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-obsidian">
      
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex">
        
        {/* LEFT COLUMN: STICKY CONTENT */}
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center p-12 z-10">
          
          {/* THE PROGRESS LINE - Visual Continuity */}
          <div className="absolute left-12 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-white/10 hidden lg:block">
            <motion.div 
              style={{ scaleY: scrollYProgress }} 
              className="w-full h-full bg-gold origin-top"
            />
          </div>

          <div className="max-w-2xl relative w-full pl-10"> 
            {chapters.map((chapter, index) => {
              const rangeStart = index * (1 / chapters.length);
              const rangeEnd = (index + 1) * (1 / chapters.length);
              
              // More precise timing for the text reveal
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.2, rangeEnd], [0, 1, 1, 0]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.2, rangeEnd], [20, 0, 0, -20]);

              return (
                <motion.div 
                  key={index} 
                  style={{ opacity, y, display: index === 0 ? 'block' : undefined }} // Ensure first is visible initially if needed
                  className={`absolute inset-0 top-1/2 -translate-y-1/2 w-full flex flex-col justify-center ${index !== 0 ? '' : ''}`}
                >
                  <motion.p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-sans border-l-2 border-gold pl-4">
                    0{index + 1} &mdash; {chapter.subtitle}
                  </motion.p>
                  
                  <h2 className="text-6xl lg:text-7xl font-serif text-cream mb-8 leading-[1]">
                    {chapter.title}
                  </h2>
                  
                  <p className="text-gray-400 text-lg font-light leading-relaxed font-sans max-w-lg">
                    {chapter.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLING IMAGES WITH PARALLAX */}
        <div className="w-1/2">
          {chapters.map((chapter, index) => (
             <ParallaxImage key={index} src={chapter.image} alt={chapter.title} index={index} />
          ))}
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden">
        {chapters.map((chapter, index) => (
            <div key={index} className="min-h-screen py-20 px-6 flex flex-col justify-center border-b border-white/5 bg-obsidian">
              <div className="mb-10 relative h-[400px] w-full overflow-hidden">
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <p className="text-gold text-xs tracking-widest uppercase mb-4">0{index + 1} / {chapter.subtitle}</p>
              <h2 className="text-5xl font-serif text-cream mb-6">{chapter.title}</h2>
              <p className="text-gray-400 font-light leading-relaxed">{chapter.description}</p>
            </div>
        ))}
      </div>
      
    </section>
  );
}

// Sub-component for the Parallax Effect on Images
function ParallaxImage({ src, alt, index }: { src: string, alt: string, index: number }) {
  const ref = useRef(null);
  
  // Track this specific image container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // The image moves slightly SLOWER than the scroll, creating depth
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className="h-screen w-full relative flex items-center justify-center border-l border-white/5 bg-neutral-900 overflow-hidden">
        
       {/* Mask Container */}
       <div className="relative w-[80%] h-[70%] overflow-hidden">
         <motion.div style={{ y, scale }} className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
            />
         </motion.div>
         
         {/* Overlays */}
         <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-40 pointer-events-none" />
       </div>

       {/* Large Background Number */}
       <div className="absolute bottom-20 right-10 text-[12rem] font-serif text-white/[0.03] leading-none select-none pointer-events-none">
         0{index + 1}
       </div>
    </div>
  );
}