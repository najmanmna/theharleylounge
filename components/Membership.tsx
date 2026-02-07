"use client";

import { useRef, useState } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue, 
  AnimatePresence 
} from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  Diamond, 
  Crown, 
  Sparkles, 
  X 
} from "lucide-react";

export default function MembershipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTier, setSelectedTier] = useState<null | 'gold' | 'platinum'>(null);

  // Parallax for the background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} id="membership" className="relative py-32 bg-[#02120b] overflow-hidden">
      
      {/* 1. Atmospheric Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#eebb4d]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 2. Header Content */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#eebb4d] text-xs tracking-[0.4em] uppercase font-medium mb-6 block">
              Membership
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-[#eae8dc] mb-8">
              Join Our Exclusive <br />
              <span className="italic font-light text-[#eebb4d]">Community</span>
            </h2>
            <p className="text-[#eae8dc]/60 text-lg font-light leading-relaxed max-w-xl mx-auto">
              Two tiers of membership, each offering distinct privileges and access to our world of refined experiences and premium services.
            </p>
          </motion.div>
        </div>

        {/* 3. The Membership Cards (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-20">
          
          {/* GOLD MEMBERSHIP CARD */}
          <MembershipCard 
            title="Gold Membership" 
            price="Limited Release"
            icon={<Diamond className="w-6 h-6 text-[#eebb4d]" />}
            accentColor="#eebb4d"
            features={[
              "Access to lounge facilities",
              "Priority event bookings",
              "Concierge support for essential needs"
            ]}
            onViewDetails={() => setSelectedTier('gold')}
          />

          {/* PLATINUM MEMBERSHIP CARD */}
          <MembershipCard 
            title="Platinum Membership" 
            price="Invitation Only"
            icon={<Crown className="w-6 h-6 text-[#e5e7eb]" />} // Silver/Platinum color
            accentColor="#e5e7eb"
            features={[
              "Full access to all facilities",
              "Priority reservations",
              "Dedicated concierge",
              "Exclusive wellness consultations"
            ]}
            onViewDetails={() => setSelectedTier('platinum')}
          />
        </div>

        {/* 4. "Both Include" Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-center border-t border-white/10 pt-12"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-4 h-4 text-[#eebb4d]" />
            <span className="text-xs uppercase tracking-widest text-[#eebb4d]">Both Tiers Include</span>
          </div>
          <p className="text-[#eae8dc]/80 font-serif text-2xl">
            Invitations to signature events and access to our network of premium sister companies.
          </p>

          {/* 5. The Main Apply Button (LINKED) */}
          <motion.a
            href="https://apply.theharleylounge.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-block mt-12 px-12 py-5 bg-[#eebb4d] text-[#02120b] text-xs uppercase tracking-[0.25em] font-bold overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3">
              Apply for Membership 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.a>
        </motion.div>

      </div>

      {/* --- THE DOSSIER MODAL --- */}
      <AnimatePresence>
        {selectedTier && (
          <Modal tier={selectedTier} onClose={() => setSelectedTier(null)} />
        )}
      </AnimatePresence>

    </section>
  );
}

// --- The "Holographic" Card Component ---
function MembershipCard({ title, price, icon, features, accentColor, onViewDetails }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="group relative h-full bg-[#050505] border border-white/10 p-10 md:p-12 overflow-hidden hover:border-white/20 transition-colors duration-500"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={style}
      >
        <div className="absolute inset-0 border-2 opacity-50" style={{ borderColor: accentColor }} />
      </motion.div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 rounded-full bg-white/5 border border-white/10 transition-colors" style={{ borderColor: `${accentColor}30` }}>
            {icon}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1">
            {price}
          </span>
        </div>

        <h3 className="text-3xl font-serif text-[#eae8dc] mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        
        <div className="w-12 h-[1px] bg-white/10 my-8 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: accentColor }} />

        <ul className="space-y-4 flex-grow">
          {features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[#eae8dc]/60 font-light group-hover:text-[#eae8dc] transition-colors">
              <Check className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: accentColor }} />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 pt-6 border-t border-white/5">
           <button 
             onClick={onViewDetails}
             className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-white transition-colors cursor-pointer flex items-center gap-2 hover:bg-white/5 px-4 py-2 rounded-sm"
           >
             View Details <ArrowRight className="w-3 h-3" />
           </button>
        </div>
      </div>

      <div 
        className="absolute top-0 right-0 w-[300px] h-[300px] opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity duration-700" 
        style={{ backgroundColor: accentColor }} 
      />
    </motion.div>
  );
}

// --- The Modal Component ---
function Modal({ tier, onClose }: { tier: 'gold' | 'platinum', onClose: () => void }) {
  const isGold = tier === 'gold';
  const accent = isGold ? '#eebb4d' : '#e5e7eb';
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#02120b]/90 backdrop-blur-md cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-[#050505] border border-white/10 overflow-hidden shadow-2xl"
      >
        <div className="h-2 w-full" style={{ backgroundColor: accent }} />
        
        <div className="p-8 md:p-12 relative">
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-white/5 border border-white/10">
              {isGold ? <Diamond className="w-6 h-6" style={{ color: accent }} /> : <Crown className="w-6 h-6" style={{ color: accent }} />}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Confidential</p>
              <h3 className="text-2xl md:text-3xl font-serif text-[#eae8dc]">{isGold ? 'Gold Tier' : 'Platinum Tier'}</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 border-t border-white/10 pt-8">
            <div>
              <h4 className="text-[#eebb4d] text-xs uppercase tracking-widest mb-4">Privileges</h4>
              <ul className="space-y-3 text-[#eae8dc]/70 text-sm font-light">
                <li>• {isGold ? 'Lounge Access (7am - 11pm)' : '24/7 Lounge Access'}</li>
                <li>• {isGold ? '3 Guests allowed per visit' : 'Unlimited Guest Access'}</li>
                <li>• Complimentary High-Speed Wi-Fi</li>
                <li>• {isGold ? 'Standard Concierge' : 'Dedicated Lifestyle Manager'}</li>
                <li>• Priority Meeting Room Booking</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#eebb4d] text-xs uppercase tracking-widest mb-4">Investment</h4>
              <p className="text-2xl text-[#eae8dc] font-serif mb-2">
                {isGold ? '£2,500' : '£5,000'} <span className="text-sm text-white/40 font-sans">/ annum</span>
              </p>
              <p className="text-white/40 text-xs mb-8">
                + £500 Joining Fee
              </p>
              
              {/* MODAL APPLY BUTTON (LINKED) */}
              <a 
                href="https://apply.theharleylounge.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-4 bg-[#eebb4d] text-[#02120b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors"
              >
                Apply for {isGold ? 'Gold' : 'Platinum'}
              </a>
            </div>
          </div>

        </div>
        
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </motion.div>
    </div>
  );
}