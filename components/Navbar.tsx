"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { title: "The Sanctuary", href: "/#about", subtitle: "Our Story" },
  // UPDATED: Changed Title to "Concierge"
  { title: "Concierge", href: "/concierge", subtitle: "Spaces & Services" }, 
  { title: "Membership", href: "/#membership", subtitle: "Join the Club" },
  { title: "Events", href: "/events", subtitle: "Social Calendar" },
  { title: "Contact", href: "/contact", subtitle: "Get in Touch" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/", "");
      const element = document.querySelector(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-700 ${
          scrolled
           ? "bg-[#02120b] md:bg-[#02120b]/80 md:backdrop-blur-md border-b border-white/5 py-4" 
    : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <Link href="/" className="z-[60] relative group">
            <div className="flex flex-col items-start">
              <span className="font-serif text-xl md:text-2xl tracking-widest text-[#eae8dc] group-hover:text-[#eebb4d] transition-colors duration-500">
                THE HARLEY
              </span>
              <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] text-[#eebb4d]/80 group-hover:tracking-[0.4em] transition-all duration-500">
                Lounge • London
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6 md:gap-8 z-[60]">
            <Link 
              href="https://apply.theharleylounge.com/"
              className={`hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
                scrolled ? "text-[#eebb4d]" : "text-[#eae8dc]"
              } hover:text-white`}
            >
              Apply <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#eae8dc] group-hover:text-[#eebb4d] transition-colors">
                Menu
              </span>
              <div className={`p-2 border rounded-full transition-all duration-500 group-hover:rotate-90 ${
                scrolled 
                  ? "border-white/10 group-hover:border-[#eebb4d]" 
                  : "border-white/20 group-hover:border-[#eebb4d]"
              }`}>
                <Menu className="w-5 h-5 text-[#eae8dc] group-hover:text-[#eebb4d]" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
            className="fixed inset-0 z-[100] bg-[#02120b] flex flex-col justify-center items-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#eebb4d]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0b3d2e]/10 blur-[120px] pointer-events-none" />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-12 p-4 group z-20"
            >
              <div className="p-3 border border-white/10 rounded-full group-hover:border-[#eebb4d] group-hover:rotate-90 transition-all duration-500 bg-[#050505]/50 backdrop-blur-sm">
                <X className="w-6 h-6 text-[#eae8dc] group-hover:text-[#eebb4d]" />
              </div>
            </button>

            {/* Links Container */}
            <div className="flex flex-col items-center gap-4 md:gap-2 z-10 w-full max-w-lg px-6">
              {navLinks.map((link, index) => {
                const isActive = 
                    (link.href.startsWith("/#") && pathname === "/" && link.href === "/#about") || 
                    (pathname === link.href) || 
                    (pathname.startsWith(link.href) && link.href !== "/");

                return (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group relative inline-flex items-center justify-center w-full py-3 md:py-6 border-b border-white/5 md:border-transparent hover:border-[#eebb4d]/30 transition-colors duration-500"
                    >
                      <div className="flex flex-col items-center md:items-start relative">
                          <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#eebb4d]/60 mb-1 group-hover:text-[#eebb4d] transition-colors absolute -left-8 top-2">
                              0{index + 1}
                          </span>
                          <span className={`text-3xl sm:text-5xl md:text-6xl font-serif transition-colors duration-500 md:group-hover:translate-x-4 transform ${
                             isActive ? 'text-[#eebb4d]' : 'text-[#eae8dc] group-hover:text-white'
                          }`}>
                            {link.title}
                          </span>
                      </div>
                      
                      <div className="hidden md:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-4 transition-all duration-500 absolute right-0">
                          <ArrowRight className="w-8 h-8 text-[#eebb4d]" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 md:bottom-6 text-center space-y-4 px-6 w-full"
            >
              <div className="h-[1px] w-12 bg-[#eebb4d]/30 mx-auto mb-4" />
              <p className="text-[#eebb4d] text-[10px] tracking-[0.3em] uppercase">
                15 Cavendish Square, London
              </p>
              <p className="text-[#eae8dc]/40 text-xs font-serif italic tracking-wide">
                "Where Intellect Meets Indulgence"
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}