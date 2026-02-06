"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Mail, Clock } from "lucide-react";
import Link from "next/link"; // We can keep Link, or use <a> for external

export default function Footer() {
  return (
    <footer className="relative bg-obsidian text-cream pt-20 pb-10 overflow-hidden">
      
      {/* 1. THE BIG CTA (Call to Action) */}
      <div className="container mx-auto px-6 mb-20">
        <div className="border-t border-white/10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10"
          >
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6">The Next Step</p>
              <h2 className="text-5xl md:text-8xl font-serif leading-[0.9]">
                Request<br />
                <span className="text-white/20 italic">Access</span>
              </h2>
            </div>

            {/* UPDATED LINK: Points to External Application */}
            <a 
              href="https://apply.theharleylounge.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-full md:w-auto"
            >
               <div className="relative px-12 py-12 md:px-20 md:py-20 border border-white/20 rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition-colors duration-500 hover:border-gold">
                  {/* Circle Fill Animation */}
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-full" />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <span className="text-xl uppercase tracking-widest group-hover:text-obsidian transition-colors">Apply</span>
                    <ArrowUpRight className="w-6 h-6 group-hover:text-obsidian transition-colors" />
                  </div>
               </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* 2. INFORMATION GRID */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          
          {/* Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gold">
              <MapPin className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">Location</span>
            </div>
            <p className="text-lg font-serif text-white/60 leading-relaxed">
              15 Cavendish Square,<br />
              London, W1G 9DB
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gold">
              <Mail className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">Enquiries</span>
            </div>
            <a href="mailto:reception@theharleylounge.com" className="block text-lg font-serif text-white/60 hover:text-gold transition-colors">
              reception@theharleylounge.com
            </a>
            <p className="text-lg font-serif text-white/60">+44 (0) 20 33 22 63 38</p>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gold">
              <Clock className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">Hours</span>
            </div>
            <ul className="space-y-2 text-white/60 font-serif">
              <li className="flex justify-between max-w-[200px]">
                <span>Mon - Fri</span>
                <span>8AM - 11PM</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span>Saturday</span>
                <span>9AM - 11PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-white/5 text-xs text-white/20 uppercase tracking-widest">
          <p>© 2026 The Harley Lounge</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link href="#" className="hover:text-gold transition-colors">Instagram</Link>
             <Link href="#" className="hover:text-gold transition-colors">Legal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}