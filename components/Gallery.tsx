"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useSpring, useVelocity } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react"; // Make sure you have this icon or remove if not

const images = [
  // COLUMN 1
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1350912-1.jpg", title: "Corporate Gala", date: "OCT 2025" },
  { src: "https://plus.unsplash.com/premium_photo-1698529231408-80642212fd1b?q=80&w=765&auto=format&fit=crop", title: "Champagne Nights", date: "NOV 2025" },
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/Hariharan_meet_and_greet-006-1-scaled.jpg", title: "Private Hire", date: "DEC 2025" },

  // COLUMN 2
  { src: "https://plus.unsplash.com/premium_photo-1677000666461-fbefa43c2c7f?q=80&w=687&auto=format&fit=crop", title: "Signature Serves", date: "menu_v2.pdf" },
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1370225-1.jpg", title: "The Crowd", date: "FRI NIGHT" },
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1350900-1.jpg", title: "Velvet Interiors", date: "DESIGN" },
  
  // COLUMN 3
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1450817-1.jpg", title: "Party", date: "LIVE" },
  { src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1974&auto=format&fit=crop", title: "Lounge Access", date: "MEMBERS" },
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1410252.jpg", title: "Meetings", date: "ELEGANCE" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // PHYSICS: Smooth out the skew effect so it doesn't jitter
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // MAPPING: Convert scroll speed into a skew angle (max 10 degrees)
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  // Parallax offsets
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]); // Moves faster
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} className="relative bg-obsidian py-20 overflow-hidden">
      
      {/* VIGNETTE OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-obsidian to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-obsidian to-transparent z-20 pointer-events-none" />
      
      <div className="container mx-auto px-4 mb-16 relative z-30 text-center">
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="text-gold text-xs tracking-[0.3em] uppercase mb-4"
         >
           The Atmosphere
         </motion.p>
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="text-4xl md:text-6xl font-serif text-cream"
         >
           Nights at The Harley
         </motion.h2>
      </div>

      {/* THE GRID WITH VELOCITY SKEW */}
      <motion.div 
        style={{ skewY: skewVelocity }} // <--- THE PHYSICS MAGIC
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 min-h-[120vh] px-4 md:px-20 transition-transform duration-100 ease-linear"
      >
        
        {/* Column 1 */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-8">
          {images.slice(0, 3).map((img, i) => (
             <GalleryCard key={i} {...img} />
          ))}
        </motion.div>

        {/* Column 2 */}
        <motion.div style={{ y: y2 }} className="-mt-20 flex flex-col gap-8">
          {images.slice(3, 6).map((img, i) => (
             <GalleryCard key={i} {...img} />
          ))}
        </motion.div>

        {/* Column 3 */}
        <motion.div style={{ y: y3 }} className="flex flex-col gap-8">
          {images.slice(6, 9).map((img, i) => (
             <GalleryCard key={i} {...img} />
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}

// Sub-component for individual images
function GalleryCard({ src, title, date }: { src: string, title: string, date: string }) {
  return (
    <div className="relative w-full aspect-[3/4] group cursor-pointer perspective-1000">
       
       {/* 1. THE IMAGE CONTAINER */}
       <div className="relative h-full w-full overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-500 group-hover:border-gold/50">
         <Image 
           src={src}
           alt={title}
           fill
           className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
           sizes="(max-width: 768px) 100vw, 33vw"
         />
         
         {/* Dark Vignette (Fades out on hover) */}
         <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
       </div>

       {/* 2. THE GOLDEN BORDER ANIMATION */}
       {/* Top & Bottom Borders */}
       <div className="absolute top-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full z-20" />
       <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full z-20" />
       {/* Left & Right Borders */}
       <div className="absolute top-0 left-0 w-[1px] h-0 bg-gold transition-all duration-500 delay-100 group-hover:h-full z-20" />
       <div className="absolute bottom-0 right-0 w-[1px] h-0 bg-gold transition-all duration-500 delay-100 group-hover:h-full z-20" />

       {/* 3. THE INFO REVEAL */}
       <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
          <div className="flex justify-between items-center border-t border-white/20 pt-4 backdrop-blur-sm bg-black/30 p-2">
            <div>
              <p className="text-gold text-[10px] tracking-[0.2em] uppercase font-mono mb-1">{date}</p>
              <h4 className="text-cream text-xl font-serif">{title}</h4>
            </div>
            <ArrowUpRight className="text-gold w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
       </div>

    </div>
  );
}