"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

const chapters = [
  {
    title: "Hidden Gem",
    subtitle: "In the Heart of Harley Street",
    description: "Welcome to an exclusive haven of tranquillity. Nestled deep within the historic fabric of Cavendish Square, this is not just a lounge—it is London's best-kept secret.",
    image: "/harley_street.jpg",
    accent: "from-[#02120b] to-[#052e1f]" // Deep Emerald Gradient
  },
  {
    title: "The Sanctuary",
    subtitle: "Elegance Meets Comfort",
    description: "A private retreat designed for the few. Escape the city's noise and step into a world of velvet shadows, warm amber light, and uncompromising luxury.",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
    accent: "from-[#020403] to-[#1a1500]" // Deep Amber Gradient
  },
  {
    title: "The Community",
    subtitle: "Distinguished Company",
    description: "Where distinguished medical professionals and visionary creatives converge. A space curated for connection, conversation, and the exchange of brilliant ideas.",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2070&auto=format&fit=crop",
    accent: "from-[#050505] to-[#0f0f1a]" // Midnight Blue Gradient
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
      
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex">
        
        {/* LEFT COLUMN: STICKY CONTENT */}
        <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center p-12 z-20">
          
          {/* Ambient Background Gradient that shifts with scroll */}
          {chapters.map((chapter, i) => {
             // Logic to cross-fade background colors
             const start = i / chapters.length;
             const end = (i + 1) / chapters.length;
             // eslint-disable-next-line react-hooks/rules-of-hooks
             const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
             
             return (
               <motion.div 
                 key={i}
                 style={{ opacity }}
                 className={`absolute inset-0 bg-gradient-to-br ${chapter.accent} opacity-40 transition-colors duration-1000`} 
               />
             );
          })}

          {/* THE PROGRESS LINE */}
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
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.2, rangeEnd], [0, 1, 1, 0]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1, rangeEnd - 0.2, rangeEnd], [50, 0, 0, -50]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
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
                    0{index + 1} — {chapter.subtitle}
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

      {/* MOBILE LAYOUT (Enhanced) */}
      <div className="md:hidden">
        {chapters.map((chapter, index) => (
            <div key={index} className="min-h-screen py-20 px-6 flex flex-col justify-center border-b border-white/5 bg-[#02120b] sticky top-0 z-10">
              <div className="mb-10 relative h-[450px] w-full overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-60" />
                
                {/* Mobile Floating Number */}
                <div className="absolute top-4 right-4 text-6xl font-serif text-white/10">
                  0{index + 1}
                </div>
              </div>
              
              <p className="text-[#eebb4d] text-xs tracking-widest uppercase mb-4">
                 {chapter.subtitle}
              </p>
              <h2 className="text-4xl font-serif text-[#eae8dc] mb-6">{chapter.title}</h2>
              <p className="text-[#eae8dc]/50 font-light leading-relaxed">{chapter.description}</p>
            </div>
        ))}
      </div>
    </section>
  );
}

function ParallaxImage({ src, alt, index }: { src: string, alt: string, index: number }) {
  const ref = useRef(null);
  
  // Adjusted offsets: Animation starts when image top hits bottom of screen
  // and finishes when image center hits center of screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  // 1. The Curtain Animation (Slides UP to reveal image)
  const curtainY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  // 2. Parallax Image Movement (Slower than scroll)
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div 
      ref={ref} 
      className="h-screen w-full relative flex items-center justify-center border-l border-white/5 bg-[#050505] overflow-hidden group"
    >
       {/* Background Noise */}
       <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

       <div className="relative w-[75%] h-[65%] overflow-hidden shadow-2xl">
         
         {/* THE IMAGE LAYER */}
         <motion.div 
           style={{ y: imageY, scale }} 
           className="relative w-full h-full grayscale-[100%] group-hover:grayscale-0 transition-all duration-1000 ease-out"
         >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
            />
         </motion.div>

         {/* THE CURTAIN LAYER (The Fix) */}
         {/* This div sits ON TOP of the image and slides UP */}
         <motion.div 
            style={{ y: curtainY }}
            className="absolute inset-0 z-20 bg-[#02120b]"
         >
            {/* The Gold Leading Edge (The "Bottom Bar" of the curtain) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#eebb4d] shadow-[0_0_20px_#eebb4d]" />
         </motion.div>
         
         {/* Inner Border */}
         <div className="absolute inset-4 border border-white/10 pointer-events-none z-30" />
       </div>

       {/* Large Background Number */}
       <div className="absolute bottom-10 right-10 text-[15rem] font-serif text-[#eebb4d]/[0.02] leading-none select-none pointer-events-none">
         0{index + 1}
       </div>
    </div>
  );
}