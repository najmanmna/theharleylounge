"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { title: "The Sanctuary", href: "/#about", subtitle: "Our Story" },
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ${
          scrolled
            ? "bg-[#02120b]/90 backdrop-blur-md border-b border-white/5 py-4" 
            : "bg-transparent py-5 md:py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          <Link href="/" className="z-[60] relative group">
            <div className="flex flex-col items-start">
              <span className="font-serif text-lg md:text-2xl tracking-widest text-[#eae8dc] group-hover:text-[#eebb4d] transition-colors duration-500">
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
              aria-label="Open Menu"
            >
              <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#eae8dc] group-hover:text-[#eebb4d] transition-colors">
                Menu
              </span>
              <div className={`p-2 border rounded-full transition-all duration-500 ${
                scrolled 
                  ? "border-white/10" 
                  : "border-white/20"
              }`}>
                <Menu className="w-5 h-5 text-[#eae8dc]" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            // CHANGE: Set initial to full open state (no animation on enter)
            initial={{ opacity: 1 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }} // Optional fade out on close
            className="fixed inset-0 z-[100] bg-[#02120b] flex flex-col justify-center items-center overflow-hidden touch-none"
          >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#eebb4d]/5 blur-[80px] md:blur-[120px] pointer-events-none" />
            
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-12 p-2 group z-20"
              aria-label="Close Menu"
            >
              <div className="p-3 border border-white/10 rounded-full bg-[#050505]/50 backdrop-blur-sm">
                <X className="w-6 h-6 text-[#eae8dc]" />
              </div>
            </button>

            <div className="flex flex-col items-center gap-6 md:gap-2 z-10 w-full max-w-lg px-6">
              {navLinks.map((link, index) => {
                const isActive = 
                    (link.href.startsWith("/#") && pathname === "/" && link.href === "/#about") || 
                    (pathname === link.href) || 
                    (pathname.startsWith(link.href) && link.href !== "/");

                return (
                  <motion.div
                    key={link.title}
                    // Optional: Keep slight fade-in for text only, or remove for instant
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group relative inline-flex items-center justify-center w-full py-2 md:py-6"
                    >
                      <div className="flex flex-col items-center md:items-start relative">
                          <span className={`text-3xl sm:text-5xl md:text-6xl font-serif transition-colors duration-300 ${
                             isActive ? 'text-[#eebb4d]' : 'text-[#eae8dc]'
                          }`}>
                            {link.title}
                          </span>
                          {/* <span className="text-[10px] uppercase tracking-widest text-[#eae8dc]/30 mt-1 md:hidden">
                            {link.subtitle}
                          </span> */}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4, duration: 0.3 }}
                 className="mt-8 md:hidden"
              >
                 <Link 
                   href="https://apply.theharleylounge.com/"
                   className="px-8 py-3 border border-[#eebb4d]/30 text-[#eebb4d] text-xs uppercase tracking-[0.2em]"
                 >
                   Apply for Membership
                 </Link>
              </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 text-center space-y-4 px-6 w-full"
            >
              <div className="h-[1px] w-12 bg-[#eebb4d]/30 mx-auto mb-4" />
              <p className="text-[#eebb4d] text-[10px] tracking-[0.3em] uppercase">
                15 Cavendish Square, London
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}