"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import Image from "next/image";
import { Plane, Ticket, HeartPulse, Sparkles, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

export default function Lifestyle() {
  return (
    <main className="bg-[#02120b] min-h-screen text-[#eae8dc] selection:bg-[#eebb4d] selection:text-[#02120b]">
      <Navbar />
      
      {/* 1. HERO: "Beyond the Lounge" */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="text-center z-10 px-6">
          <motion.span 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-[#eebb4d] text-xs tracking-[0.4em] uppercase font-medium mb-6 block"
          >
            Service & Support
          </motion.span>
          <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-5xl md:text-8xl font-serif text-[#eae8dc] leading-tight"
          >
            The Invisible <br />
            <span className="italic font-light text-[#eebb4d]">Hand</span>
          </motion.h1>
        </div>
      </section>

      {/* 2. THE STICKY SCROLL SECTION */}
      <StickyScrollSection />

      {/* 3. CTA */}
      <section className="py-32 flex flex-col items-center justify-center text-center border-t border-white/5">
        <h2 className="text-4xl font-serif text-[#eae8dc] mb-8">Ready to elevate your lifestyle?</h2>
        <a href="https://apply.theharleylounge.com/" className="group relative px-10 py-5 bg-[#eebb4d] overflow-hidden text-[#02120b]">
          <span className="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold">
            Apply for Membership <ArrowRight className="w-4 h-4" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </a>
      </section>

      <Footer />
    </main>
  );
}

// --- The Core "Scroll-Telling" Component ---
function StickyScrollSection() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="relative">
      
      {/* SERVICE 1: THE CONCIERGE */}
      <ServiceBlock 
        id="concierge"
        title="The Concierge"
        subtitle="Global Lifestyle Management"
        description="Our concierge service extends far beyond the walls of the lounge. From securing last-minute reservations at Michelin-starred restaurants to arranging private aviation, we manage your life with precision."
        features={[
          { icon: Plane, text: "Private Travel & Aviation" },
          { icon: Ticket, text: "Sold-out Theatre & Event Access" },
          { icon: Sparkles, text: "Bespoke Gift Sourcing" }
        ]}
        image="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop"
        align="right"
      />

      {/* SERVICE 2: WELLNESS (LINKED) */}
      <ServiceBlock 
        id="wellness"
        title="Wellness & Health"
        subtitle="Restoration for the Mind & Body"
        description="In partnership with the Harley Street Longevity Club, we offer exclusive wellness consultations. Rebalance your energy in our private sanctuary."
        features={[
          { icon: HeartPulse, text: "Private Health Consultations" },
          { icon: Sparkles, text: "Mindfulness & Meditation Sessions" },
          { icon: CheckCircle2, text: "Nutritional Planning" }
        ]}
        image="https://harleystreetlongevityclub.com/wp-content/uploads/2024/11/dreamstime_xxl_342223911-1.jpg"
        align="left"
        link="https://harleystreetlongevityclub.com/" // <--- ADDED LINK
        linkText="Visit Longevity Club"
      />

      {/* SERVICE 3: EVENTS TEAM */}
      <ServiceBlock 
        id="events"
        title="Dedicated Events Team"
        subtitle="Seamless Execution"
        description="Your personal events manager handles every detail of your private hire. From floral arrangements to AV tech, we ensure your vision is executed flawlessly."
        features={[
          { icon: CheckCircle2, text: "End-to-End Event Management" },
          { icon: Sparkles, text: "Curated Supplier Network" },
          { icon: CheckCircle2, text: "On-site Technical Support" }
        ]}
        image="https://images.unsplash.com/photo-1511795409835-a96041b6a058?q=80&w=2068&auto=format&fit=crop"
        align="right"
      />

    </div>
  );
}

function ServiceBlock({ id, title, subtitle, description, features, image, align, link, linkText }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <div ref={ref} className="min-h-screen flex items-center relative py-20 overflow-hidden">
      <div className={`container mx-auto px-6 flex flex-col md:flex-row gap-16 items-center ${align === 'left' ? 'md:flex-row-reverse' : ''}`}>
        
        {/* TEXT CONTENT */}
        <motion.div 
          className="w-full md:w-1/2 z-10"
          initial={{ opacity: 0, x: align === 'right' ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'right' ? -50 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#eebb4d] text-xs tracking-[0.3em] uppercase font-medium mb-4 block">
            {subtitle}
          </span>
          <h2 className="text-5xl md:text-6xl font-serif text-[#eae8dc] mb-8">
            {title}
          </h2>
          <p className="text-[#eae8dc]/60 text-lg font-light leading-relaxed mb-10 border-l border-[#eebb4d]/30 pl-6">
            {description}
          </p>

          <div className="space-y-6 mb-10">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#eebb4d] transition-colors">
                  <f.icon className="w-5 h-5 text-[#eebb4d]" />
                </div>
                <span className="text-[#eae8dc]/80 font-light tracking-wide">{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Optional External Link Button */}
          {link && (
            <motion.a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 text-[#eebb4d] text-xs uppercase tracking-[0.2em] font-bold border-b border-[#eebb4d]/30 pb-2 hover:border-[#eebb4d] transition-all hover:gap-4"
            >
              {linkText || "Learn More"} <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}

        </motion.div>

        {/* IMAGE VISUAL */}
        <motion.div 
           className="w-full md:w-1/2 h-[60vh] relative"
           initial={{ opacity: 0, scale: 0.9 }}
           animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.9 }}
           transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[#eebb4d]/10 -translate-x-4 -translate-y-4 border border-[#eebb4d]/20 z-0" />
          <div className="relative h-full w-full overflow-hidden shadow-2xl z-10 bg-black">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
            />
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}