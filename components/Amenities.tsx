"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const amenities = [
  // 1. THE BAR (Social)
  {
    id: "01",
    title: "The Alchemy Bar",
    category: "Mixology & Dining",
    description: "Signature cocktails and light bites served in an atmosphere of shadowed elegance.",
    image: "https://plus.unsplash.com/premium_photo-1670984940156-c7f833fe8397?q=80&w=1170&auto=format&fit=crop",
  },
  // 2. THE WORKSPACE (Utility)
  {
    id: "02",
    title: "The Study",
    category: "Workspace",
    description: "A silent sanctuary for the medical elite and creative visionaries to focus.",
    image: "https://plus.unsplash.com/premium_photo-1684769161124-df6a947f7490?q=80&w=716&auto=format&fit=crop",
  },
  // 3. THE CONCIERGE (Service - Covers "Bespoke Experiences")
  {
    id: "03",
    title: "The Concierge",
    category: "Global Lifestyle",
    description: "Beyond the lounge. From private aviation to sold-out theatre seats, we manage your life with precision.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop",
  },
  // 4. PRIVATE EVENTS (Covers "Private Celebrations")
  {
    id: "04",
    title: "Private Suites",
    category: "Social Events",
    description: "Intimate spaces available for private hire. Birthdays, anniversaries, and confidential gatherings.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/Private-Event-Party-Hire.jpg.jpg",
  },
  // 5. CORPORATE (Covers "Corporate Events")
  {
    id: "05",
    title: "Corporate Affairs",
    category: "Business",
    description: "From board meetings to product launches. Impress your stakeholders in a venue that commands respect.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
  },
  // 6. SEASONAL (Covers "Seasonal Gatherings" - NEW)
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

  // Adjusted Scroll Distance: 
  // We have more cards now, so we need to scroll further left (-90%) to see the last card.
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-92%"]);

  return (
    <section ref={targetRef} id="amenities" className="relative h-[300vh] bg-obsidian">
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* SECTION TITLE */}
        <div className="absolute top-10 left-10 md:left-20 z-20 mix-blend-difference">
           <h2 className="text-4xl md:text-6xl font-serif text-cream">Amenities</h2>
           <p className="text-xs text-gold uppercase tracking-[0.3em] mt-2">Life at The Harley</p>
        </div>

        {/* THE HORIZONTAL SCROLL */}
        <motion.div style={{ x }} className="flex gap-10 pl-[20vw] md:pl-[30vw]">
          {amenities.map((item) => (
            <div key={item.id} className="group relative h-[60vh] w-[85vw] md:w-[45vh] flex-shrink-0 bg-neutral-900 border border-white/5 overflow-hidden cursor-pointer">
              
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
                  <span className="text-gold text-xs font-mono">{item.id}</span>
                  <span className="text-xs uppercase tracking-widest text-white/60">{item.category}</span>
                </div>
                
                <h3 className="text-3xl font-serif text-cream mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400 font-light line-clamp-3 group-hover:text-white transition-colors leading-relaxed">
                  {item.description}
                </p>
                
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="p-3 rounded-full bg-gold/10 backdrop-blur-md border border-gold/30">
                    <ArrowUpRight className="w-5 h-5 text-gold" />
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </motion.div>
        
        {/* PROGRESS BAR */}
        <div className="absolute bottom-10 left-10 md:left-20 right-10 md:right-20 h-[1px] bg-white/10">
           <motion.div 
             style={{ scaleX: scrollYProgress }} 
             className="h-full bg-gold origin-left" 
           />
        </div>

      </div>
    </section>
  );
}