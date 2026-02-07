"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { 
  Armchair, 
  Users, 
  Wine, 
  CalendarDays, 
  ArrowRight,
  Wifi,
  Coffee,
  ShieldCheck,
  Car,          
  Building,     
  UtensilsCrossed,
  Stethoscope, 
  Lock,        
  MonitorPlay, 
  LayoutTemplate, 
  Wrench,
  Activity,
  HeartPulse,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

// --- MERGED DATA: FACILITIES + LIFESTYLE + WELLNESS ---
const clubData = [
  // 1. WORKSPACE
  {
    id: "01",
    category: "Lounge & Workspace",
    title: "Every hour you need, comfortable seating",
    description: "Whether you need a quiet corner for deep work or a collaborative lounge setting, our spaces adapt to your rhythm. Designed for productivity and comfort, with high-speed connectivity throughout.",
    features: [
      { icon: Armchair, text: "Ergonomic Lounge Seating" },
      { icon: Wifi, text: "High-Speed Fiber Wi-Fi" },
      { icon: ShieldCheck, text: "Private Call Booths" }
    ],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1350855-1.jpg",
    align: "right"
  },
  // 2. MEETING ROOMS
  {
    id: "02",
    category: "Private Rooms",
    title: "Private meeting rooms built for discretion",
    description: "Fully equipped spaces designed for confidential discussions, board meetings, and professional consultations. Each room offers complete privacy and the refined atmosphere The Harley Lounge is known for.",
    features: [
      { icon: Users, text: "Board Meetings (Executive Grade)" },
      { icon: Stethoscope, text: "Medical Consultations" },
      { icon: Lock, text: "Confidential Talks" }
    ],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1390257-1.jpg", 
    align: "left"
  },
  // 3. DINING
  {
    id: "03",
    category: "Bar & Dining",
    title: "Refresh and recharge with our all day menu",
    description: "A curated selection of fine wines, signature cocktails, and an all-day menu designed to keep you fuelled. From morning barista coffee to evening aperitifs, our kitchen serves excellence.",
    features: [
      { icon: Wine, text: "Signature Cocktail Bar" },
      { icon: Coffee, text: "Artisan Coffee & Tea" },
      { icon: Users, text: "Private Dining Options" }
    ],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1440741-1.jpg", 
    align: "right"
  },
  // 4. WELLNESS (Merged from Lifestyle Page)
  {
    id: "04",
    category: "Health & Wellness",
    title: "Restoration for the mind & body",
    description: "In partnership with the Harley Street Longevity Club, we offer exclusive wellness consultations directly within the lounge. Rebalance your energy in our private sanctuary.",
    features: [
      { icon: HeartPulse, text: "Private Health Consultations" },
      { icon: Sparkles, text: "Mindfulness Sessions" },
      { icon: CheckCircle2, text: "Nutritional Planning" }
    ],
    image: "https://harleystreetlongevityclub.com/wp-content/uploads/2024/11/dreamstime_xxl_342223911-1.jpg", 
    align: "left",
    link: "https://harleystreetlongevityclub.com/",
    linkText: "Visit Longevity Club"
  },
  // 5. EVENTS/COMMUNITY
  {
    id: "05",
    category: "Community",
    title: "Curated gatherings and exclusive networking",
    description: "Members enjoy invitations to carefully selected private events, from medical breakthroughs and industry insights to intimate celebrations. These gatherings connect you with accomplished peers.",
    features: [
      { icon: Activity, text: "Medical Showcases" },
      { icon: Users, text: "Networking Gatherings" },
      { icon: Wine, text: "Private Celebrations" }
    ],
    image: "https://events.theharleylounge.com/wp-content/uploads/2025/10/P1430162-1.jpg", 
    align: "right"
  },
  // 6. CONCIERGE (Merged from Lifestyle Page)
  {
    id: "06",
    category: "Concierge",
    title: "Effortless arrangements handled with precision",
    description: "Our concierge team anticipates your needs and executes with quiet efficiency. From luxury car services to hotel reservations and travel planning, we handle the details so you need not.",
    features: [
      { icon: Car, text: "Mercedes Transportation" },
      { icon: Building, text: "Hotel & Travel Coordination" },
      { icon: UtensilsCrossed, text: "Priority Reservations" }
    ],
    image: "https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    align: "left"
  }
];

export default function ClubLife() {
  return (
    <main className="bg-[#02120b] min-h-screen text-[#eae8dc] selection:bg-[#eebb4d] selection:text-[#02120b]">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#eebb4d]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center z-10 px-6 max-w-4xl">
          <motion.span 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-[#eebb4d] text-xs tracking-[0.4em] uppercase font-medium mb-6 block"
          >
            The Experience
          </motion.span>
          <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-5xl md:text-8xl font-serif text-[#eae8dc] leading-tight mb-8"
          >
            Spaces & <br />
            <span className="italic font-light text-[#eebb4d]">Services</span>
          </motion.h1>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-[#eae8dc]/60 text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            A seamless blend of premium facilities and intuitive service. From your morning coffee to your evening consultation, everything is designed around you.
          </motion.p>
        </div>
      </section>

      {/* 2. MERGED LIST */}
      <div className="relative z-20 pb-32">
        {clubData.map((item, index) => (
          <SectionBlock key={index} data={item} />
        ))}
      </div>

      {/* 3. FOOTER CTA */}
      <section className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif text-[#eae8dc] mb-8">Ready to experience it?</h2>
            <a 
              href="https://apply.theharleylounge.com/"
              className="inline-flex items-center gap-4 text-[#eebb4d] text-xs uppercase tracking-[0.2em] font-bold border border-[#eebb4d]/30 px-10 py-5 hover:bg-[#eebb4d] hover:text-[#02120b] transition-all duration-500"
            >
              Apply for Membership <ArrowRight className="w-4 h-4" />
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
  
  // Parallax Effect for Image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="group relative min-h-screen flex items-center py-24 overflow-hidden border-t border-white/5 bg-[#02120b]">
      <div className={`container mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24 items-center ${data.align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        
        {/* TEXT CONTENT */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: data.align === 'right' ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#eebb4d] font-mono text-xs border border-[#eebb4d]/20 px-3 py-1 rounded-full">
              {data.id}
            </span>
            <span className="text-[#eebb4d]/80 text-xs tracking-[0.2em] uppercase">
              {data.category}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-[#eae8dc] mb-6 leading-tight">
            {data.title}
          </h2>
          
          <p className="text-[#eae8dc]/60 text-lg font-light leading-relaxed mb-10 border-l border-[#eebb4d]/20 pl-6">
            {data.description}
          </p>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {data.features.map((feature: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 hover:border-[#eebb4d]/30 transition-colors group/feature"
              >
                <div className="text-[#eebb4d] group-hover/feature:scale-110 transition-transform">
                   <feature.icon className="w-5 h-5" />
                </div>
                <span className="text-[#eae8dc]/80 font-light tracking-wide text-sm">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Optional External Link (For Wellness) */}
          {data.link && (
            <motion.a 
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 text-[#eebb4d] text-xs uppercase tracking-[0.2em] font-bold border-b border-[#eebb4d]/30 pb-2 hover:border-[#eebb4d] transition-all hover:gap-4"
            >
              {data.linkText} <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}

        </motion.div>

        {/* IMAGE VISUAL */}
        <div className="w-full md:w-1/2 relative h-[60vh] md:h-[70vh] overflow-hidden">
           <div className={`absolute top-0 bottom-0 w-full h-full border border-[#eebb4d]/20 z-20 pointer-events-none transition-all duration-700 ${data.align === 'right' ? '-right-4 -bottom-4 group-hover:right-0 group-hover:bottom-0' : '-left-4 -top-4 group-hover:left-0 group-hover:top-0'}`} />
           
           <div className="relative w-full h-full overflow-hidden bg-[#050505]">
             <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
               <Image
                 src={data.image}
                 alt={data.title}
                 fill
                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out brightness-[0.9]"
               />
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#02120b] via-transparent to-transparent opacity-50" />
           </div>
        </div>

      </div>
    </section>
  );
}