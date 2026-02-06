"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      
      {/* DESKTOP LAYOUT (Split Screen) */}
      <div className="hidden md:flex">
        
        {/* LEFT COLUMN: STICKY CONTENT */}
        {/* Changed max-w-xl to max-w-3xl and reduced padding slightly to give text more room */}
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center p-8 lg:p-12 z-10">
          <div className="max-w-3xl relative w-full px-6"> 
            {chapters.map((chapter, index) => {
              const rangeStart = index * (1 / chapters.length);
              const rangeEnd = (index + 1) * (1 / chapters.length);
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(
                scrollYProgress,
                [rangeStart, rangeStart + 0.1, rangeEnd - 0.1, rangeEnd],
                [0, 1, 1, 0]
              );
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(
                scrollYProgress,
                [rangeStart, rangeStart + 0.1, rangeEnd - 0.1, rangeEnd],
                [50, 0, 0, -50]
              );

              return (
                <motion.div 
                  key={index} 
                  style={{ opacity, y }}
                  className="absolute inset-0 top-1/2 -translate-y-1/2 w-full"
                >
                  <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6 font-sans">
                    {chapter.subtitle}
                  </p>
                  <h2 className="text-6xl lg:text-8xl font-serif text-cream mb-10 leading-[0.9]">
                    {chapter.title}
                  </h2>
                  <p className="text-gray-400 text-xl lg:text-2xl font-light leading-relaxed font-sans max-w-2xl">
                    {chapter.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLING IMAGES */}
        <div className="w-1/2">
          {chapters.map((chapter, index) => (
            <div key={index} className="h-screen w-full relative flex items-center justify-center border-l border-white/5 bg-neutral-900 overflow-hidden">
               <motion.div 
                 initial={{ scale: 1.2 }}
                 whileInView={{ scale: 1 }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className="relative w-[80%] h-[70%] grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
               >
                 <Image
                   src={chapter.image}
                   alt={chapter.title}
                   fill
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian opacity-60" />
                 <div className="absolute inset-0 mix-blend-multiply bg-amber-900/20" />
               </motion.div>
               
               <div className="absolute bottom-10 right-10 text-[10rem] font-serif text-white/5 leading-none select-none">
                 0{index + 1}
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden">
        {chapters.map((chapter, index) => (
           <div key={index} className="min-h-screen py-20 px-6 flex flex-col justify-center border-b border-white/5">
             <div className="mb-10 relative h-[300px] w-full overflow-hidden grayscale">
               <Image
                 src={chapter.image}
                 alt={chapter.title}
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-black/20" />
             </div>
             <p className="text-gold text-xs tracking-widest uppercase mb-2">{chapter.subtitle}</p>
             <h2 className="text-5xl font-serif text-cream mb-6">{chapter.title}</h2>
             <p className="text-gray-400 font-light leading-relaxed">{chapter.description}</p>
           </div>
        ))}
      </div>
      
    </section>
  );
}