"use client";

import { useRef, useState } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView, 
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Download, Users, Mic2, Wifi, Layers, Calendar } from "lucide-react";

// DATA
const occasions = [
  {
    id: "01",
    category: "Corporate Events",
    tagline: "Refined Connection",
    description: "Impress clients and colleagues in a refined environment built for connection and creativity. From board meetings to networking receptions, the space adapts to your agenda.",
    stats: { capacity: 120, area: "1,200", suitability: 98 }, 
    features: ["High-Speed Fiber Wi-Fi", "Wireless Presentation Screens", "Breakout Zones"],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1350912-1.jpg",
    accent: "#eebb4d" // Gold
  },
  {
    id: "02",
    category: "Private Hire",
    tagline: "Unforgettable Impact",
    description: "Make your product or brand debut unforgettable in a space designed for impact and sophistication. Perfect for launch parties, birthdays, and milestone celebrations.",
    stats: { capacity: 80, area: "Venue Exclusive", suitability: 100 },
    features: ["DJ Booth Integration", "Custom Branding Opportunities", "Late Night License"],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/IMG-60-1.jpg",
    accent: "#c084fc" // Purple/Disco Tint
  },
  {
    id: "03",
    category: "The Full Buyout",
    tagline: "Exclusively Yours",
    description: "For those who require absolute privacy and control. Take over the entire Harley Lounge, including The Study, The Drawing Room, and The Bar, for a truly bespoke experience.",
    stats: { capacity: 200, area: "2,500", suitability: 100 },
    features: ["Dedicated Security", "Full Bar & Kitchen Team", "Cloakroom Service"],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/Corporate-Events.jpg.jpg",
    accent: "#ffffff" // Pure White/Grand
  }
];

export default function Events() {
  const scrollToContact = () => {
    document.getElementById('contact-footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-[#02120b] min-h-screen text-[#eae8dc] selection:bg-[#eebb4d] selection:text-[#02120b]">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1920&auto=format&fit=crop" 
            alt="Events Header" 
            fill 
            className="object-cover opacity-50 grayscale brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-[#02120b]/40 to-transparent" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="border border-[#eebb4d]/20 p-12 md:p-20 backdrop-blur-md bg-[#02120b]/40 relative overflow-hidden group"
          >
            {/* Animated Border Shine */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#eebb4d] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out" />
            
            <p className="text-[#eebb4d] text-xs tracking-[0.5em] uppercase mb-8 font-medium">Harley Street • London</p>
            <h1 className="text-5xl md:text-8xl font-serif text-[#eae8dc] leading-[1.1]">
              Events of <br /><span className="italic text-[#eebb4d] font-light">Distinction</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. THE BLUEPRINT SHOWCASE */}
      <div className="relative z-20 pb-32">
        {occasions.map((item, index) => (
          <EventScene 
            key={index} 
            data={item} 
            index={index} 
            onInquire={scrollToContact}
          />
        ))}
      </div>

      <div id="contact-footer">
        <Footer />
      </div>
    </main>
  );
}

// SUB-COMPONENT: The Single Event Layout
function EventScene({ data, index, onInquire }: { data: any, index: number, onInquire: () => void }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [150, -150]);
  
  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  }
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  // HUD Meter Animation
  const meterValue = useSpring(isInView ? data.stats.suitability : 0, { stiffness: 40, damping: 20 });
  const width = useTransform(meterValue, (v) => `${v}%`);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden border-t border-white/5 bg-[#02120b]">
      
      {/* Background Text (First word of category) */}
      <motion.h2 
        style={{ y: yText }}
        className="absolute top-1/4 left-0 w-full text-center text-[15vw] font-serif text-[#eae8dc]/[0.02] leading-none select-none pointer-events-none z-0 whitespace-nowrap"
      >
        {data.category.split(" ")[0]}
      </motion.h2>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className={`flex flex-col md:flex-row gap-16 md:gap-32 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
          
          {/* 3D IMAGE BLOCK */}
          <motion.div 
            className="w-full md:w-3/5 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
             <div className="relative aspect-[4/3] group shadow-2xl">
                {/* Blueprint Lines */}
                <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-[#eebb4d]/30 z-20 transition-all duration-700 group-hover:w-[110%] group-hover:h-[110%] group-hover:-top-4 group-hover:-left-4" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-[#eebb4d]/30 z-20 transition-all duration-700 group-hover:w-[110%] group-hover:h-[110%] group-hover:-bottom-4 group-hover:-right-4" />
                
                <Image 
                  src={data.image} 
                  alt={data.category} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out brightness-[0.8]"
                />
                
                {/* BUTTONS ON IMAGE */}
                {/* <div className="absolute bottom-10 left-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 z-30">
                   <button className="bg-[#02120b]/80 backdrop-blur-md text-[#eae8dc] px-6 py-4 border border-[#eebb4d]/30 hover:bg-[#eebb4d] hover:text-[#02120b] transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                     <Download className="w-4 h-4" /> Specs
                   </button>
                </div> */}

                {/* Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
             </div>
          </motion.div>

          {/* DATA HUD */}
          <div className="w-full md:w-2/5 flex flex-col justify-center">
             <div className="mb-12">
               <span className="text-[#eebb4d] font-mono text-xs mb-4 block tracking-widest border border-[#eebb4d]/20 px-3 py-1 w-fit rounded-full">
                 {data.id} — {data.tagline}
               </span>
               <h3 className="text-5xl md:text-6xl font-serif text-[#eae8dc] mb-6 leading-tight">{data.category}</h3>
               <p className="text-[#eae8dc]/60 font-light leading-relaxed text-base border-l-2 border-[#eebb4d]/20 pl-6">
                 {data.description}
               </p>
             </div>

             {/* HUD SPECS */}
             <div className="grid grid-cols-2 gap-x-12 gap-y-12 mb-12">
                <div className="flex flex-col gap-2 group cursor-default">
                   <div className="flex items-center gap-2 text-[#eebb4d]/60 text-[10px] uppercase tracking-widest group-hover:text-[#eebb4d] transition-colors">
                     <Users className="w-4 h-4" /> Guest List
                   </div>
                   <div className="text-4xl font-serif text-[#eae8dc]">
                     {data.stats.capacity} <span className="text-xs font-sans text-[#eae8dc]/30 uppercase tracking-widest">Max</span>
                   </div>
                </div>
                <div className="flex flex-col gap-2 group cursor-default">
                   <div className="flex items-center gap-2 text-[#eebb4d]/60 text-[10px] uppercase tracking-widest group-hover:text-[#eebb4d] transition-colors">
                     <Layers className="w-4 h-4" /> Floor Area
                   </div>
                   <div className="text-4xl font-serif text-[#eae8dc]">
                     {data.stats.area} <span className="text-xs font-sans text-[#eae8dc]/30 uppercase tracking-widest">Sq Ft</span>
                   </div>
                </div>
                
                {/* Dynamic Meter */}
                <div className="col-span-2">
                   <div className="flex justify-between items-center text-[#eebb4d] text-[10px] uppercase tracking-widest mb-3">
                     <span className="flex items-center gap-2"><Wifi className="w-4 h-4" /> Tech Connectivity</span>
                     <span>{data.stats.suitability}%</span>
                   </div>
                   <div className="h-[2px] w-full bg-white/10 overflow-hidden">
                      <motion.div 
                        style={{ width }} 
                        className="h-full bg-[#eebb4d] shadow-[0_0_10px_#eebb4d]"
                      />
                   </div>
                </div>
             </div>

             {/* FEATURES LIST */}
             <div className="space-y-4 mb-12">
               {data.features.map((feature: string, i: number) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="flex items-center gap-4 text-[#eae8dc]/60 text-sm font-light"
                 >
                    <div className="w-1 h-1 bg-[#eebb4d] rounded-full" /> 
                    {feature}
                 </motion.div>
               ))}
             </div>

             <div>
               <button 
                onClick={onInquire}
                className="group relative px-10 py-5 bg-transparent border border-[#eebb4d]/30 overflow-hidden w-full md:w-auto hover:border-[#eebb4d] transition-colors duration-500"
               >
                 <span className="relative z-10 flex items-center justify-center gap-3 text-[#eae8dc] text-xs uppercase tracking-[0.25em] font-bold group-hover:text-[#02120b] transition-colors duration-500">
                   Start Planning <ArrowUpRight className="w-4 h-4" />
                 </span>
                 <div className="absolute inset-0 bg-[#eebb4d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]" />
               </button>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
}