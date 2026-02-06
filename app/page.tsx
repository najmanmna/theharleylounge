"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Amenities from "@/components/Amenities";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Secret from "@/components/Secret";
import Manifesto from "@/components/Manifesto";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-obsidian min-h-screen">
      <Secret />
      
      {loading && (
        <Loader onComplete={() => setTimeout(() => setLoading(false), 1000)} />
      )}

      {/* REMOVED the className conditional logic here. 
          We rely on Loader.tsx to handle the scroll locking. 
      */}
      <div>
        <Navbar />
        <Hero />
        <Manifesto />
        <div id="about">
          <About />
        </div>
        <div id="amenities">
          <Amenities />
        </div>
        <Gallery />
        <div id="contact">
          <Footer />
        </div>
      </div>
    </main>
  );
}