"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { 
  Stethoscope, 
  Activity, 
  HeartPulse, 
  Gift, 
  Key, 
  Clock, 
  Ticket,
  Sparkles,
  ArrowRight,
  Car,              // Added
  Building,         // Added
  UtensilsCrossed,  // Added
} from "lucide-react";

// --- CONCIERGE SPECIFIC DATA ---
const conciergeServices = [
  // 1. UPDATED SECTION (From your image)
  {
    id: "01",
    category: "Global Concierge",
    title: "Effortless arrangements handled with precision",
    description: "Our concierge team anticipates your needs and executes with quiet efficiency. From luxury car services to hotel reservations and travel planning, we handle the details so you need not.",
    features: [
      { icon: Car, text: "Mercedes Transportation" },
      { icon: Building, text: "Hotel & Travel Coordination" },
      { icon: UtensilsCrossed, text: "Priority Reservations" }
    ],
    image: "https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?q=80&w=764&auto=format&fit=crop", 
    align: "right"
  },
  
  // 2. MEDICAL (Left)
  {
    id: "02",
    category: "Health & Longevity",
    title: "Priority access to world-class specialists",
    description: "Your health cannot wait. We hold direct lines to London's most sought-after consultants. Bypass waiting lists with fast-track referrals to The Harley Street Clinic, The Wimpole Clinic, and elite wellness practitioners.",
    features: [
      { icon: Stethoscope, text: "Harley Street Clinic Priority" },
      { icon: Activity, text: "Wimpole Clinic Access" }, 
      { icon: HeartPulse, text: "Fast-Track Specialist Referrals" }
    ],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop", 
    align: "left"
  },

  // 3. EVENTS (Right)
  {
    id: "03",
    category: "Unrivaled Access",
    title: "Sold out is not in our vocabulary",
    description: "Access the inaccessible. From front-row seats at fashion week to private boxes at Wimbledon and reservations at Michelin-starred restaurants that have a six-month waiting list.",
    features: [
      { icon: Ticket, text: "VIP Event Access & Box Seats" },
      { icon: Sparkles, text: "Red Carpet Premieres" },
      { icon: Key, text: "Priority Restaurant Reservations" }
    ],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920&auto=format&fit=crop", 
    align: "right"
  }
];

export default function ConciergePage() {
  return (
    <main className="bg-[#02120b] min-h-screen text-[#eae8dc] selection:bg-[#eebb4d] selection:text-[#02120b]">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#eebb4d]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center z-10 px-6 max-w-5xl">
          <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#eebb4d] text-xs tracking-[0.4em] uppercase font-medium mb-8 block"
          >
            At Your Service
          </motion.span>
          <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-9xl font-serif text-[#eae8dc] leading-[0.9] mb-10"
          >
            The <br />
            <span className="italic font-light text-[#eebb4d]">Concierge</span>
          </motion.h1>
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[#eae8dc]/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            We manage the details of your life so you can enjoy living it. <br/>
            From medical priority to sold-out access, consider it done.
          </motion.p>
        </div>
      </section>

      {/* 2. SERVICES LIST */}
      <div className="relative z-20 pb-32">
        {conciergeServices.map((item, index) => (
          <SectionBlock key={index} data={item} />
        ))}
      </div>

      {/* 3. FOOTER CTA */}
      <section className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif text-[#eae8dc] mb-8">Have a specific request?</h2>
            <p className="text-[#eae8dc]/50 mb-12 max-w-lg mx-auto font-light">
              Our team is standing by to discuss your medical or lifestyle needs.
            </p>
            <a 
              href="mailto:concierge@theharleylounge.com"
              className="inline-flex items-center gap-4 text-[#eebb4d] text-xs uppercase tracking-[0.2em] font-bold border border-[#eebb4d]/30 px-10 py-5 hover:bg-[#eebb4d] hover:text-[#02120b] transition-all duration-500"
            >
              Contact The Concierge <ArrowRight className="w-4 h-4" />
            </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- SUB-COMPONENT ---
function SectionBlock({ data }: { data: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="group relative min-h-[90vh] flex items-center py-24 overflow-hidden border-t border-white/5 bg-[#02120b]">
      <div className={`container mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24 items-center ${data.align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        
        {/* TEXT CONTENT */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: data.align === 'right' ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#eebb4d] font-mono text-xs border border-[#eebb4d]/20 px-3 py-1 rounded-full">
              {data.id}
            </span>
            <span className="text-[#eebb4d]/80 text-xs tracking-[0.2em] uppercase">
              {data.category}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-[#eae8dc] mb-8 leading-[1.1]">
            {data.title}
          </h2>
          
          <p className="text-[#eae8dc]/60 text-lg font-light leading-relaxed mb-12 border-l border-[#eebb4d]/20 pl-6">
            {data.description}
          </p>

          <div className="grid grid-cols-1 gap-6">
            {data.features.map((feature: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 hover:border-[#eebb4d]/30 transition-colors group/feature"
              >
                <div className="text-[#eebb4d] group-hover/feature:scale-110 transition-transform p-3 bg-[#eebb4d]/5 rounded-full">
                   <feature.icon className="w-6 h-6" />
                </div>
                <span className="text-[#eae8dc]/90 font-light tracking-wide text-lg">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* IMAGE VISUAL */}
        <div className="w-full md:w-1/2 relative h-[60vh] md:h-[80vh] overflow-hidden shadow-2xl">
           <div className={`absolute top-0 bottom-0 w-full h-full border border-[#eebb4d]/20 z-20 pointer-events-none transition-all duration-700 ${data.align === 'right' ? '-right-6 -bottom-6 group-hover:right-0 group-hover:bottom-0' : '-left-6 -top-6 group-hover:left-0 group-hover:top-0'}`} />
           
           <div className="relative w-full h-full overflow-hidden bg-[#050505]">
             <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
               <Image
                 src={data.image}
                 alt={data.title}
                 fill
                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out brightness-[0.85] group-hover:brightness-100"
               />
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-40" />
           </div>
        </div>

      </div>
    </section>
  );
}