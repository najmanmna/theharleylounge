"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const amenities = [
  {
    id: "01",
    title: "The Alchemy Bar",
    category: "Mixology & Dining",
    description: "Signature cocktails and light bites served in an atmosphere of shadowed elegance.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1440875-1.jpg",
  },
  {
    id: "02",
    title: "The Study",
    category: "Workspace",
    description: "A silent sanctuary for the medical elite and creative visionaries to focus.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1350879-1.jpg",
  },
  {
    id: "03",
    title: "The Concierge",
    category: "Global Lifestyle",
    description: "Beyond the lounge. From luxury car services to sold-out theatre seats, we manage your life with precision.",
    image: "https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "04",
    title: "Private Suites",
    category: "Social Events",
    description: "Intimate spaces available for private hire. Birthdays, anniversaries, and confidential gatherings.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1390257-1.jpg",
  },
  {
    id: "05",
    title: "Corporate Affairs",
    category: "Business",
    description: "From board meetings to product launches. Impress your stakeholders in a venue that commands respect.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1430162-1.jpg",
  },
  {
    id: "06",
    title: "The Calendar",
    category: "Member Access",
    description: "Exclusive invitations to our seasonal masquerades, summer soirees, and cultural networking nights.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1370225-1.jpg", 
  },
];

export default function Amenities() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth Horizontal Scroll (Desktop Only)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const smoothX = useSpring(x, { damping: 20, stiffness: 100 });

  return (
    // Changed height: "h-[400vh]" only on md+, "auto" on mobile
    <section ref={targetRef} className="relative md:h-[400vh] bg-[#02120b] border-t border-white/5" id="amenities">
      
      {/* =======================
          DESKTOP LAYOUT (Sticky Horizontal)
      ======================== */}
      <div className="hidden md:flex sticky top-0 h-screen items-center overflow-hidden">
        
        {/* BACKGROUND AMBIENCE */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(238,187,77,0.05)_0%,transparent_40%)]" />
           <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0b3d2e]/20 blur-[100px]" />
        </div>

        {/* STATIC HEADER */}
        <div className="absolute top-12 left-20 z-20">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1 }}
           >
             <h2 className="text-7xl font-serif text-[#eae8dc]">Amenities</h2>
             <div className="flex items-center gap-4 mt-4">
               <div className="h-[1px] w-12 bg-[#eebb4d]" />
               <p className="text-xs text-[#eebb4d] uppercase tracking-[0.3em]">Life at The Harley</p>
             </div>
           </motion.div>
        </div>

        {/* THE GALLERY TRACK */}
        <motion.div style={{ x: smoothX }} className="flex gap-16 pl-[25vw] items-center">
          {amenities.map((item, i) => (
             <Card key={item.id} item={item} index={i} />
          ))}
        </motion.div>
        
        {/* CUSTOM SCROLLBAR */}
        <div className="absolute bottom-12 left-20 right-20 h-[1px] bg-white/5">
           <motion.div 
             style={{ scaleX: scrollYProgress }} 
             className="h-full bg-[#eebb4d] origin-left shadow-[0_0_10px_#eebb4d]" 
           />
        </div>

      </div>

      {/* =======================
          MOBILE LAYOUT (Snap Carousel)
      ======================== */}
      <div className="md:hidden py-16 px-6 relative">
         <div className="mb-8">
            <h2 className="text-4xl font-serif text-[#eae8dc]">Amenities</h2>
            <div className="flex items-center gap-4 mt-2">
               <div className="h-[1px] w-8 bg-[#eebb4d]" />
               <p className="text-[10px] text-[#eebb4d] uppercase tracking-[0.2em]">Life at The Harley</p>
            </div>
         </div>

         {/* Native Horizontal Scroll Container */}
         <div className="flex gap-4 overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
            {amenities.map((item, i) => (
               <div key={item.id} className="snap-center shrink-0 first:pl-0 last:pr-6">
                  <MobileCard item={item} />
               </div>
            ))}
         </div>
      </div>

    </section>
  );
}

// --- DESKTOP CARD ---
function Card({ item, index }: { item: any, index: number }) {
  return (
    <div className="group relative h-[65vh] w-[50vh] flex-shrink-0 cursor-pointer perspective-1000">
      
      {/* Image Container */}
      <div className="relative h-full w-full overflow-hidden bg-[#050505] border border-white/5 group-hover:border-[#eebb4d]/30 transition-colors duration-500 shadow-2xl">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[100%] group-hover:grayscale-0 contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02120b]/20 to-[#02120b] opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
         <div className="absolute -top-12 right-6 text-6xl font-serif text-white/5 group-hover:text-[#eebb4d]/10 transition-colors duration-500">
           {item.id}
         </div>

         <div className="relative z-10">
           <div className="flex justify-between items-center mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
             <span className="text-[#eebb4d] text-[10px] uppercase tracking-[0.2em] border border-[#eebb4d]/20 px-3 py-1 rounded-full">
               {item.category}
             </span>
           </div>

           <h3 className="text-3xl font-serif text-[#eae8dc] mb-3 group-hover:text-white transition-colors duration-300">
             {item.title}
           </h3>

           <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
             <p className="text-sm text-[#eae8dc]/60 font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
               {item.description}
             </p>
             <div className="flex items-center gap-2 text-[#eebb4d] text-xs uppercase tracking-widest group/btn">
               <span>Explore</span>
               <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}

// --- NEW MOBILE CARD ---
function MobileCard({ item }: { item: any }) {
   return (
      <div className="relative h-[450px] w-[85vw] rounded-sm overflow-hidden bg-[#050505] border border-white/10 shadow-xl">
         <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-[#02120b]/40 to-transparent opacity-90" />
         
         <div className="absolute bottom-0 left-0 w-full p-6">
            <span className="text-[#eebb4d] text-[10px] uppercase tracking-[0.2em] mb-3 block">
               {item.category}
            </span>
            <h3 className="text-2xl font-serif text-[#eae8dc] mb-2">
               {item.title}
            </h3>
            <p className="text-[#eae8dc]/60 text-xs font-light leading-relaxed line-clamp-3">
               {item.description}
            </p>
         </div>
         
         <div className="absolute top-4 right-4 text-4xl font-serif text-white/10">
            {item.id}
         </div>
      </div>
   );
}