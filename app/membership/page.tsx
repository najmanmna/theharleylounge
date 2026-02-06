"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { ArrowRight, Check } from "lucide-react";

export default function Membership() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  return (
    <main className="bg-obsidian min-h-screen text-cream flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)] mt-20 md:mt-0">
        
        {/* LEFT COLUMN: VISUAL CONTEXT */}
        <div className="w-full md:w-5/12 relative hidden md:block border-r border-white/5">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 grayscale"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070&auto=format&fit=crop')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/40 to-transparent" />
          
          <div className="absolute bottom-20 left-12 max-w-sm z-10">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Membership</p>
            <h1 className="text-5xl font-serif leading-none mb-6">The Inner Circle.</h1>
            <p className="text-white/60 font-light">
              Access to 15 Cavendish Square is by invitation or application only. We seek those who contribute to the atmosphere, not just consume it.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: THE INTERACTIVE FORM */}
        <div className="w-full md:w-7/12 flex flex-col justify-center px-8 md:px-24 py-12 relative bg-obsidian">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gold"
            />
          </div>

          <div className="max-w-xl w-full mx-auto">
            <span className="text-gold font-mono text-sm mb-8 block">Step 0{step} / 0{totalSteps}</span>

            <AnimatePresence mode="wait">
              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl md:text-4xl font-serif">Let's start with your identity.</h2>
                  
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-gold transition-colors">Full Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-gold transition-colors" placeholder="e.g. Dr. Arthur Conan" />
                    </div>
                    <div className="group">
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-gold transition-colors">Email Address</label>
                      <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-gold transition-colors" placeholder="arthur@example.com" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PROFESSION (The "Qualifying" Step) */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl md:text-4xl font-serif">Tell us about your craft.</h2>
                  <p className="text-white/50">Our community is curated for medical professionals and creative visionaries.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Medical Practitioner', 'Creative / Artist', 'Entrepreneur', 'Other'].map((role) => (
                      <button key={role} className="border border-white/10 p-6 text-left hover:border-gold hover:bg-white/5 transition-all group">
                        <span className="text-lg group-hover:text-gold transition-colors">{role}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SUBMIT */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl md:text-4xl font-serif">Final Details.</h2>
                  
                  <div className="group">
                     <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">How did you hear about us?</label>
                     <textarea className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-gold min-h-[100px] resize-none" placeholder="..." />
                  </div>

                  <button className="bg-gold text-obsidian px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors w-full md:w-auto flex items-center justify-center gap-2">
                    Submit Application <Check className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < totalSteps && (
              <div className="mt-12 flex justify-end">
                <button 
                  onClick={nextStep}
                  className="group flex items-center gap-4 text-sm uppercase tracking-widest hover:text-gold transition-colors"
                >
                  Next Step 
                  <div className="p-2 border border-white/20 rounded-full group-hover:border-gold transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </main>
  );
}