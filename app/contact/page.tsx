"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation"; 
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, MapPin, Phone, Mail, CheckCircle2, Loader2 } from "lucide-react";

function ContactContent() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Membership Application",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (interestParam) {
      setFormData((prev) => ({ ...prev, interest: interestParam }));
    }
  }, [interestParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("success");
  };

  return (
    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12 md:gap-24 pb-20">
      
      {/* LEFT: Contact Info */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-5/12 pt-10"
      >
        <span className="text-[#eebb4d] text-xs tracking-[0.4em] uppercase font-medium mb-4 md:mb-6 block">
          Contact Us
        </span>
        
        <h1 className="text-4xl md:text-7xl font-serif text-[#eae8dc] leading-[1.1] mb-6 md:mb-8">
          Begin the <br /> Conversation
        </h1>
        
        <p className="text-[#eae8dc]/60 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12 max-w-sm">
          Whether you are inquiring about membership, planning a private gala, or requesting concierge services, our team is at your disposal.
        </p>

        <div className="space-y-6 md:space-y-8 border-l border-[#eebb4d]/20 pl-6 md:pl-8">
          <div className="group">
            <h3 className="flex items-center gap-3 text-[#eebb4d] text-xs uppercase tracking-widest mb-2">
              <MapPin className="w-4 h-4" /> Address
            </h3>
            {/* CORRECTION: Updated to 15 Cavendish Square */}
            <p className="text-[#eae8dc]/80 font-serif text-lg md:text-xl">
              15 Cavendish Square <br /> Marylebone, London W1G 9AN
            </p>
          </div>
          <div className="group">
            <h3 className="flex items-center gap-3 text-[#eebb4d] text-xs uppercase tracking-widest mb-2">
              <Phone className="w-4 h-4" /> Private Line
            </h3>
            <p className="text-[#eae8dc]/80 font-serif text-lg md:text-xl">
              +44 (0) 20 7123 4567
            </p>
          </div>
          <div className="group">
            <h3 className="flex items-center gap-3 text-[#eebb4d] text-xs uppercase tracking-widest mb-2">
              <Mail className="w-4 h-4" /> Electronic Mail
            </h3>
            <a href="mailto:membership@theharleylounge.com" className="text-[#eae8dc]/80 font-serif text-lg md:text-xl hover:text-[#eebb4d] transition-colors break-all">
              membership@theharleylounge.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: The Form */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-7/12 bg-[#050505] border border-white/5 p-6 md:p-12 relative overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-center"
      >
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#eebb4d]/10 blur-[50px] pointer-events-none" />

         <AnimatePresence mode="wait">
           {status === "success" ? (
             <motion.div 
               key="success"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="flex flex-col items-center justify-center text-center h-full space-y-6 py-12"
             >
               <div className="w-20 h-20 rounded-full bg-[#eebb4d]/10 flex items-center justify-center text-[#eebb4d]">
                 <CheckCircle2 className="w-10 h-10" />
               </div>
               <h3 className="text-2xl md:text-3xl font-serif text-[#eae8dc]">Inquiry Received</h3>
               <p className="text-[#eae8dc]/60 max-w-md leading-relaxed text-sm md:text-base">
                 Thank you, {formData.name}. The concierge team has received your request regarding <span className="text-[#eebb4d]">{formData.interest}</span>. We will contact you within 24 hours.
               </p>
               <button 
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs uppercase tracking-[0.2em] text-[#eebb4d] border-b border-[#eebb4d]/30 pb-1 hover:border-[#eebb4d] transition-all"
               >
                 Send another message
               </button>
             </motion.div>
           ) : (
             <motion.form 
               key="form"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onSubmit={handleSubmit} 
               className="relative z-10 flex flex-col gap-6 md:gap-8 w-full"
             >
               {/* ... (Form Inputs Remain Unchanged) ... */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                 <div className="flex flex-col gap-2">
                   <label className="text-[#eebb4d] text-[10px] uppercase tracking-widest">Full Name</label>
                   <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      placeholder="e.g. Alexander Hamilton"
                      className="bg-transparent border-b border-white/10 py-3 text-lg md:text-xl text-[#eae8dc] focus:outline-none focus:border-[#eebb4d] transition-colors placeholder:text-white/10"
                      onChange={handleChange}
                      disabled={status === "submitting"}
                   />
                 </div>
                 <div className="flex flex-col gap-2">
                   <label className="text-[#eebb4d] text-[10px] uppercase tracking-widest">Phone Number</label>
                   <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      placeholder="+44 ..."
                      className="bg-transparent border-b border-white/10 py-3 text-lg md:text-xl text-[#eae8dc] focus:outline-none focus:border-[#eebb4d] transition-colors placeholder:text-white/10"
                      onChange={handleChange}
                      disabled={status === "submitting"}
                   />
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[#eebb4d] text-[10px] uppercase tracking-widest">Email Address</label>
                 <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    placeholder="name@example.com"
                    className="bg-transparent border-b border-white/10 py-3 text-lg md:text-xl text-[#eae8dc] focus:outline-none focus:border-[#eebb4d] transition-colors placeholder:text-white/10"
                    onChange={handleChange}
                    disabled={status === "submitting"}
                 />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[#eebb4d] text-[10px] uppercase tracking-widest">Nature of Inquiry</label>
                 <select 
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="bg-transparent border-b border-white/10 py-3 text-lg md:text-xl text-[#eae8dc] focus:outline-none focus:border-[#eebb4d] transition-colors cursor-pointer appearance-none"
                 >
                    <option className="bg-[#02120b]" value="Membership Application">Membership Application</option>
                    <option className="bg-[#02120b]" value="Corporate Events">Corporate Events</option>
                    <option className="bg-[#02120b]" value="Private Hire">Private Hire</option>
                    <option className="bg-[#02120b]" value="The Full Buyout">The Full Buyout</option>
                    <option className="bg-[#02120b]" value="Concierge Request">Concierge Request</option>
                    <option className="bg-[#02120b]" value="Press & Media">Press & Media</option>
                 </select>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-[#eebb4d] text-[10px] uppercase tracking-widest">Additional Details</label>
                 <textarea 
                    name="message"
                    rows={4}
                    value={formData.message}
                    placeholder="Tell us about your requirements..."
                    className="bg-transparent border-b border-white/10 py-3 text-base md:text-lg text-[#eae8dc] focus:outline-none focus:border-[#eebb4d] transition-colors placeholder:text-white/10 resize-none"
                    onChange={handleChange}
                    disabled={status === "submitting"}
                 />
               </div>

               <button 
                 type="submit" 
                 disabled={status === "submitting"}
                 className="mt-4 group flex items-center justify-between bg-[#eebb4d] text-[#02120b] px-6 md:px-8 py-4 md:py-5 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {status === "submitting" ? (
                   <span className="flex items-center gap-2">Processing <Loader2 className="w-4 h-4 animate-spin" /></span>
                 ) : (
                   <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </>
                 )}
               </button>
             </motion.form>
           )}
         </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Contact() {
  return (
    <main className="bg-[#02120b] min-h-screen text-[#eae8dc] selection:bg-[#eebb4d] selection:text-[#02120b] overflow-x-hidden">
      <Navbar />
      <section className="relative pt-24 md:pt-32 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Decorative Blur */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#eebb4d]/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none translate-x-1/2 md:translate-x-0" />

        <Suspense fallback={<div className="container mx-auto px-6 h-[600px] flex items-center justify-center text-[#eebb4d]">Loading...</div>}>
          <ContactContent />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}