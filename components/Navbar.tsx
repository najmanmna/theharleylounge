"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { title: "The Sanctuary", href: "#about" },
  { title: "Amenities", href: "#amenities" },
  { title: "Membership", href: "https://apply.theharleylounge.com/" },
  { title: "Events", href: "/events" },
  { title: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the glass bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- FLOATING NAVBAR --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 border-b border-transparent ${
          scrolled
            ? "bg-obsidian/80 backdrop-blur-md border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO (Left) */}
          <Link href="/" className="z-[60] relative group">
            {/* PRO TIP: Replace this text with your SVG Logo 
              width={180} height={60} for the actual implementation 
            */}
            <div className="flex flex-col items-start">
              <span className="font-serif text-2xl tracking-widest text-cream group-hover:text-gold transition-colors duration-300">
                THE HARLEY
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold/80">
                Lounge • London
              </span>
            </div>
          </Link>

          {/* MENU TRIGGER (Right) */}
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 z-[60] focus:outline-none"
          >
            <span className="hidden md:block text-xs uppercase tracking-[0.2em] text-cream group-hover:text-gold transition-colors">
              Menu
            </span>
            <div className="p-2 border border-white/20 rounded-full group-hover:border-gold group-hover:rotate-90 transition-all duration-500">
              <Menu className="w-5 h-5 text-cream group-hover:text-gold" />
            </div>
          </button>
        </div>
      </nav>

      {/* --- FULL SCREEN OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // "Bezier" curve for luxury feel
            className="fixed inset-0 z-[100] bg-obsidian flex flex-col justify-center items-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-4 group"
            >
              <div className="p-3 border border-white/20 rounded-full group-hover:border-gold group-hover:rotate-90 transition-all duration-500">
                <X className="w-6 h-6 text-cream group-hover:text-gold" />
              </div>
            </button>

            {/* Background Texture (Optional) */}
            <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] pointer-events-none" />

            {/* Links Container */}
            <div className="flex flex-col items-center gap-8 z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group relative block overflow-hidden"
                  >
                    <span className="block text-4xl md:text-6xl font-serif text-cream/50 group-hover:text-gold transition-colors duration-500">
                      {link.title}
                    </span>
                    {/* Hover Underline Animation */}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer Info inside Menu */}
            <div className="absolute bottom-12 text-center space-y-2">
              <p className="text-gold/60 text-xs tracking-widest uppercase">
                15 Cavendish Square, London
              </p>
              <p className="text-white/40 text-xs font-serif italic">
                Where Intellect Meets Indulgence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}