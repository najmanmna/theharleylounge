"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Users, Maximize2, Mic2 } from "lucide-react";

// The "Menu" of spaces
const spaces = [
  {
    title: "The Drawing Room",
    subtitle: "The Heart of the Lounge",
    description: "Our signature space featuring plush velvet seating, low-lit ambiance, and direct access to the main bar. Perfect for networking receptions and product launches.",
    specs: { standing: "120", seated: "60", size: "1,200 sq ft" },
    features: ["DJ Booth Integration", "Programmable Mood Lighting", "Private Bar Access"],
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "The Study",
    subtitle: "For Intimate Gatherings",
    description: "A secluded sanctuary designed for confidential meetings, private dinners, or high-stakes negotiations. Soundproofed and serviced by a dedicated butler.",
    specs: { standing: "40", seated: "20", size: "450 sq ft" },
    features: ["Conference AV System", "Dedicated Butler Service", "Acoustic Soundproofing"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "The Phoenix Suite",
    subtitle: "Late Night Luxury",
    description: "Hidden behind the main library, this speakeasy-style room is available for after-hours booking. Ideal for private celebrations that require absolute discretion.",
    specs: { standing: "60", seated: "40", size: "800 sq ft" },
    features: ["Independent Sound System", "Private Entrance", "En-suite Washroom"],
    image: "https://images.unsplash.com/photo-1596483726914-729906d44547?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Events() {
  return (
    <main className="bg-obsidian min-h-screen text-cream">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1970&auto=format&fit=crop" 
            alt="Events Header" 
            fill 
            className="object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs tracking-[0.3em] uppercase mb-4"
          >
            Private Hire
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif mb-6"
          >
            Host the<br /><span className="italic text-white/30">Extraordinary</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-white/60 font-light max-w-xl mx-auto text-lg"
          >
            From confidential board meetings to opulent receptions. 
            The Harley Lounge offers a backdrop of unmatched prestige.
          </motion.p>
        </div>
      </section>

      {/* 2. THE SPACES SHOWCASE */}
      <div className="container mx-auto px-6 py-20 space-y-32">
        {spaces.map((space, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            {/* IMAGE COLUMN */}
            <div className="w-full md:w-1/2 relative h-[500px] group overflow-hidden border border-white/5">
              <Image 
                src={space.image} 
                alt={space.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* INFO COLUMN */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="border-l border-gold/30 pl-8 ml-4 md:ml-0">
                <span className="text-gold text-xs tracking-widest uppercase mb-2 block">{space.subtitle}</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-cream">{space.title}</h2>
                <p className="text-white/60 font-light leading-relaxed mb-8 max-w-md">
                  {space.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gold" />
                    <div>
                      <span className="block text-xl font-serif">{space.specs.standing}</span>
                      <span className="text-xs text-white/40 uppercase tracking-wider">Standing</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gold opacity-50" />
                    <div>
                      <span className="block text-xl font-serif">{space.specs.seated}</span>
                      <span className="text-xs text-white/40 uppercase tracking-wider">Seated</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 col-span-2">
                    <Maximize2 className="w-4 h-4 text-gold" />
                    <div>
                      <span className="block text-xl font-serif">{space.specs.size}</span>
                      <span className="text-xs text-white/40 uppercase tracking-wider">Dimensions</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2 mb-10">
                  {space.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                      <div className="w-1 h-1 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="group flex items-center gap-3 text-sm uppercase tracking-widest text-cream hover:text-gold transition-colors">
                  Enquire for this space 
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. CTA FOOTER */}
      <Footer />
    </main>
  );
}