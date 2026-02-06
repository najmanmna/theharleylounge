"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Download, Users, Mic2, Wifi, Layers } from "lucide-react";

// DATA: Mapping your specific services to the "Spaces" layout
const occasions = [
  {
    id: "01",
    category: "Corporate Events",
    tagline: "Refined Connection",
    // USER PROVIDED TEXT:
    description: "Impress clients and colleagues in a refined environment built for connection and creativity. From board meetings to networking receptions, the space adapts to your agenda.",
    stats: { capacity: 120, area: "1,200", suitability: 100 }, 
    features: ["High-Speed Fiber Wi-Fi", " wireless Presentation Screens", "Breakout Zones"],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1350912-1.jpg" // Corporate Vibe
  },
  {
    id: "02",
    category: "Private Hire",
    tagline: "Unforgettable Impact",
    // USER PROVIDED TEXT:
    description: "Make your product or brand debut unforgettable in a space designed for impact and sophistication. Perfect for launch parties, birthdays, and milestone celebrations.",
    stats: { capacity: 80, area: "Entire Venue", suitability: 95 },
    features: ["DJ Booth Integration", "Custom Branding Opportunities", "Late Night License"],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/IMG-60-1.jpg" // Party Vibe
  },
  {
    id: "03", // Added this to round out the design
    category: "The Full Buyout",
    tagline: "Exclusively Yours",
    description: "For those who require absolute privacy and control. Take over the entire Harley Lounge, including The Study, The Drawing Room, and The Bar, for a truly bespoke experience.",
    stats: { capacity: 200, area: "2,500", suitability: 100 },
    features: ["Dedicated Security", "Full Bar & Kitchen Team", "Cloakroom Service"],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/Corporate-Events.jpg.jpg" // Grand Vibe
  }
];

export default function Events() {
  const scrollToContact = () => {
    document.getElementById('contact-footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-obsidian min-h-screen text-cream selection:bg-gold selection:text-obsidian">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1920&auto=format&fit=crop" 
            alt="Events Header" 
            fill 
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="border border-gold/30 p-8 md:p-12 backdrop-blur-sm bg-black/20"
          >
            <p className="text-gold text-xs tracking-[0.5em] uppercase mb-6">Harley Street • London</p>
            <h1 className="text-5xl md:text-8xl font-serif text-cream leading-tight">
              Events of <br /><span className="italic text-gold">Distinction</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. THE BLUEPRINT SHOWCASE */}
      <div className="relative z-20">
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

  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // HUD Meter Animation (Suitability/Flexibility)
  const meterValue = useSpring(isInView ? data.stats.suitability : 0, { stiffness: 50, damping: 20 });
  const width = useTransform(meterValue, (v) => `${v}%`);

  return (
    <section ref={containerRef} className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* Background Text (First word of category) */}
      <motion.h2 
        style={{ y: yText }}
        className="absolute top-20 md:top-1/4 left-0 w-full text-center text-[12vw] md:text-[10vw] font-serif text-white/[0.03] leading-none select-none pointer-events-none z-0 whitespace-nowrap"
      >
        {data.category.split(" ")[0]}
      </motion.h2>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className={`flex flex-col md:flex-row gap-16 md:gap-24 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
          
          {/* IMAGE BLOCK */}
          <div className="w-full md:w-3/5">
             <div className="relative aspect-[4/3] group perspective-1000">
                {/* Blueprint Lines */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold/30 z-20 transition-all duration-700 group-hover:w-full group-hover:h-full" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-gold/30 z-20 transition-all duration-700 group-hover:w-full group-hover:h-full" />
                
                <Image 
                  src={data.image} 
                  alt={data.category} 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                />
                
                {/* BUTTONS ON IMAGE */}
                <div className="absolute bottom-8 left-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                   {/* Fake PDF Download */}
                   <button className="bg-white/10 backdrop-blur-md text-white px-4 py-3 border border-white/20 hover:bg-white hover:text-obsidian transition-colors">
                     <Download className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>

          {/* DATA HUD */}
          <div className="w-full md:w-2/5 flex flex-col justify-center">
             <div className="mb-8">
               <span className="text-gold/50 font-mono text-sm mb-2 block">0{index + 1} / {data.tagline}</span>
               <h3 className="text-4xl md:text-5xl font-serif text-cream mb-4">{data.category}</h3>
               <p className="text-white/60 font-light leading-relaxed text-sm md:text-base border-l-2 border-white/10 pl-6">
                 {data.description}
               </p>
             </div>

             {/* HUD SPECS */}
             <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-10">
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest">
                     <Users className="w-4 h-4" /> Guest List
                   </div>
                   <div className="text-3xl font-serif text-white">
                     {data.stats.capacity} <span className="text-sm font-sans text-white/30">Max</span>
                   </div>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest">
                     <Layers className="w-4 h-4" /> Floor Area
                   </div>
                   <div className="text-3xl font-serif text-white">
                     {data.stats.area} <span className="text-sm font-sans text-white/30">Sq Ft</span>
                   </div>
                </div>
                {/* Dynamic Meter */}
                <div className="col-span-2">
                   <div className="flex justify-between items-center text-gold text-xs uppercase tracking-widest mb-3">
                     <span className="flex items-center gap-2"><Wifi className="w-4 h-4" /> Tech Connectivity</span>
                     <span>{data.stats.suitability}%</span>
                   </div>
                   <div className="h-1 w-full bg-white/10 overflow-hidden">
                      <motion.div 
                        style={{ width }} 
                        className="h-full bg-gold"
                      />
                   </div>
                </div>
             </div>

             {/* FEATURES */}
             <div className="space-y-3">
               {data.features.map((feature: string, i: number) => (
                 <div key={i} className="flex items-center gap-3 text-white/40 text-sm">
                    <div className="w-1.5 h-1.5 bg-gold rotate-45" /> 
                    {feature}
                 </div>
               ))}
             </div>

             <div className="mt-10">
               <button 
                onClick={onInquire}
                className="group relative px-8 py-4 bg-transparent border border-white/20 overflow-hidden w-full md:w-auto"
               >
                 <div className="absolute inset-0 w-0 bg-gold transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
                 <span className="relative flex items-center justify-center gap-3 text-cream text-xs uppercase tracking-[0.2em] group-hover:gap-6 transition-all">
                   Start Planning <ArrowUpRight className="w-4 h-4" />
                 </span>
               </button>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
}