"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useSpring, useVelocity } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const images = [
  // COLUMN 1
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1350912-1.jpg", title: "Corporate Gala", date: "OCT 2025" },
  { src: "https://plus.unsplash.com/premium_photo-1698529231408-80642212fd1b?q=80&w=765&auto=format&fit=crop", title: "Champagne Nights", date: "NOV 2025" },
  { src: "https://events.theharleylounge.com/wp-content/uploads/2025/10/Hariharan_meet_and_greet-006-1-scaled.jpg", title: "Private Hire", date: "DEC 2025" },

  // COLUMN 2
  { src: "https://plus.unsplash.com/premium_photo-1677000666461-fbefa43c2c7f?q=80&w=687&auto=format&fit=crop", title: "Signature Serves", date: "MENU" },
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
  
  // PHYSICS (Desktop Only): Smooth out the skew effect
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]); // Reduced skew for better performance

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // PARALLAX (Desktop Only)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]); 
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative bg-[#02120b] py-20 md:py-32 overflow-hidden">
      
      {/* Background Texture & Vignette */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#02120b] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#02120b] to-transparent z-20 pointer-events-none" />
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-16 md:mb-24 relative z-30 flex flex-col items-center text-center">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
         >
            <span className="text-[#eebb4d] text-[10px] tracking-[0.4em] uppercase mb-4 block font-medium">
              The Atmosphere
            </span>
            <h2 className="text-4xl md:text-7xl font-serif text-[#eae8dc]">
              Nights at The Harley
            </h2>
         </motion.div>
      </div>

      {/* --- DESKTOP LAYOUT (Complex Parallax & Skew) --- */}
      <motion.div 
        style={{ skewY: skewVelocity }}
        className="hidden md:grid grid-cols-3 gap-12 px-12 max-w-[1600px] mx-auto"
      >
        <motion.div style={{ y: y1 }} className="flex flex-col gap-12">
          {images.slice(0, 3).map((img, i) => <GalleryCard key={i} {...img} index={i} />)}
        </motion.div>
        <motion.div style={{ y: y2 }} className="flex flex-col gap-12 pt-20">
          {images.slice(3, 6).map((img, i) => <GalleryCard key={i} {...img} index={i + 3} />)}
        </motion.div>
        <motion.div style={{ y: y3 }} className="flex flex-col gap-12">
          {images.slice(6, 9).map((img, i) => <GalleryCard key={i} {...img} index={i + 6} />)}
        </motion.div>
      </motion.div>

      {/* --- MOBILE LAYOUT (Simple Grid / No Physics) --- */}
      <div className="md:hidden grid grid-cols-1 gap-6 px-4">
         {images.map((img, i) => (
            <GalleryCardMobile key={i} {...img} index={i} />
         ))}
      </div>

    </section>
  );
}

// --- DESKTOP CARD (Hover Effects, Blur, Physics) ---
function GalleryCard({ src, title, date, index }: { src: string, title: string, date: string, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="relative w-full aspect-[3/4] group cursor-pointer will-change-transform"
    >
       <div className="relative h-full w-full overflow-hidden bg-[#050505] shadow-2xl transition-all duration-700 hover:shadow-[0_20px_40px_rgba(238,187,77,0.1)]">
         {/* Blend Mode Overlay (Desktop Only) */}
         <div className="absolute inset-0 bg-[#0b3d2e]/40 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
         
         <Image 
           src={src}
           alt={title}
           fill
           className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0 contrast-[1.1]"
           sizes="33vw"
         />
         <div className="absolute inset-4 border border-white/5 z-20 pointer-events-none transition-colors duration-500 group-hover:border-[#eebb4d]/30" />
       </div>

       {/* Hover Info (Desktop) */}
       <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
          <div className="bg-[#02120b]/80 backdrop-blur-md border border-[#eebb4d]/20 p-4 shadow-lg flex justify-between items-center">
             <div>
               <p className="text-[#eebb4d] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">{date}</p>
               <h4 className="text-[#eae8dc] text-lg font-serif">{title}</h4>
             </div>
             <div className="p-2 bg-[#eebb4d]/10 rounded-full border border-[#eebb4d]/20">
               <ArrowUpRight className="text-[#eebb4d] w-4 h-4" />
             </div>
          </div>
       </div>
    </motion.div>
  );
}

// --- MOBILE CARD (Simplified: No Hover, Always Visible, No Blend Modes) ---
function GalleryCardMobile({ src, title, date }: { src: string, title: string, date: string, index: number }) {
  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#050505] rounded-sm shadow-lg mb-4">
       <Image 
         src={src}
         alt={title}
         fill
         className="object-cover grayscale-[30%] contrast-[1.1]"
         sizes="100vw"
       />
       {/* Simple Gradient Overlay instead of Blend Mode for performance */}
       <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-90" />
       
       <div className="absolute bottom-6 left-6 z-20">
          <p className="text-[#eebb4d] text-[10px] tracking-[0.2em] uppercase mb-2">{date}</p>
          <h4 className="text-[#eae8dc] text-2xl font-serif">{title}</h4>
       </div>
    </div>
  );
}