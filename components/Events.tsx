"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

// The Event Categories with distinct "Vibes"
const eventTypes = [
  {
    id: 0,
    title: "Corporate Affairs",
    subtitle: "Command the Room",
    description: "From board meetings to product launches. Impress your stakeholders in a venue that commands respect.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/Corporate-Events.jpg.jpg" 
  },
  {
    id: 1,
    title: "Private Celebrations",
    subtitle: "Unforgettable Nights",
    description: "Birthdays, anniversaries, or simply celebrating life. We curate the playlist, the pour, and the atmosphere.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/Private-Event-Party-Hire.jpg.jpg"
  },
  {
    id: 2,
    title: "Seasonal Galas",
    subtitle: "The Social Calendar",
    description: "Join our exclusive members-only gatherings. From New Year's Eve masquerades to Summer solstice soirées.",
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1370225-1.jpg"
  },
  {
    id: 3,
    title: "Bespoke Experiences",
    subtitle: "Your Vision, Our Canvas",
    description: "Have a wild idea? Our concierge team thrives on the impossible. Tell us your vision, and we will build it.",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Events() {
  const [activeEvent, setActiveEvent] = useState(0);
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} id="events" className="relative h-screen bg-obsidian text-cream overflow-hidden">
      
      {/* 1. THE IMMERSIVE BACKGROUND (Changes based on selection) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }} // 60% opacity so text is readable
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* We use a standard <img> tag for the background to ensure instant switching without Next.js Image loader delay on hover */}
            <img 
              src={eventTypes[activeEvent].image} 
              alt="Background" 
              className="w-full h-full object-cover grayscale" // Grayscale makes it look cinematic/background-y
            />
            {/* Gradient Overlay to make text pop */}
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. THE CONTENT LAYER */}
      <div className="relative z-10 h-full container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center">
        
        {/* LEFT: THE LIST (Navigation) */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Curated Occasions</p>
          
          {eventTypes.map((event, index) => (
            <div 
              key={event.id}
              onMouseEnter={() => setActiveEvent(index)}
              className="group cursor-pointer"
            >
              <h2 className={`text-4xl md:text-6xl font-serif transition-colors duration-500 ${activeEvent === index ? 'text-white translate-x-4' : 'text-white/30 hover:text-white/60'}`}>
                {event.title}
              </h2>
              
              {/* Mobile Only Description (Desktop hides this to keep list clean) */}
              <div className={`md:hidden overflow-hidden transition-all duration-500 ${activeEvent === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                 <p className="text-sm text-gray-300">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: THE DETAILS (Dynamic Card) */}
        <div className="hidden md:flex w-1/2 justify-center pl-20">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeEvent}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               transition={{ duration: 0.4 }}
               className="bg-black/40 backdrop-blur-md border border-white/10 p-10 max-w-md"
             >
                <div className="text-gold text-4xl mb-4">
                  0{activeEvent + 1}
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">
                  {eventTypes[activeEvent].subtitle}
                </h3>
                <p className="text-gray-300 font-light leading-relaxed mb-8">
                  {eventTypes[activeEvent].description}
                </p>
                
                <button className="flex items-center gap-2 text-gold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                   Inquire Now <ArrowRight className="w-4 h-4" />
                </button>
             </motion.div>
           </AnimatePresence>
        </div>

      </div>
    </section>
  );
}