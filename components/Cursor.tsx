"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      setIsHovering(!!isClickable);

      const customTextNode = target.closest("[data-cursor-text]");
      if (customTextNode) {
        setCursorText(customTextNode.getAttribute("data-cursor-text") || "");
        setIsHovering(true);
      } else {
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* SAFER GLOBAL STYLE: 
        Only hide the default cursor on devices that support hovering (pointer: fine).
        We use pure CSS to ensure the 'custom-cursor' class is the trigger.
      */}
      <style jsx global>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select, [role="button"] {
            cursor: none !important;
          }
          /* Ensure the custom cursor is visible on these devices */
          .custom-cursor {
            display: flex !important;
          }
        }
        /* Fallback: If not fine pointer (mobile), ensure custom cursor is hidden */
        @media (pointer: coarse), (pointer: none) {
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>

      {/* 1. THE INNER DOT (Precision Pointer) */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-[#eebb4d] rounded-full pointer-events-none z-[9999] hidden mix-blend-normal"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
      />

      {/* 2. THE OUTER HALO (Fluid Follower) */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden items-center justify-center border border-[#eebb4d]/30"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          width: isHovering ? 80 : 32,
          height: isHovering ? 80 : 32,
          backgroundColor: isHovering ? "rgba(238, 187, 77, 0.05)" : "transparent",
          borderColor: isHovering ? "rgba(238, 187, 77, 0.5)" : "rgba(238, 187, 77, 0.3)",
          backdropFilter: isHovering ? "blur(2px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <AnimatePresence>
          {isHovering && cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[#eebb4d] text-[8px] uppercase tracking-[0.25em] font-medium text-center leading-tight absolute"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}