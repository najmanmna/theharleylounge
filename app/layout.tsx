import type { Metadata } from "next";
import { Manrope, Cinzel } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Harley Lounge | Exclusive Private Members Club",
  description: "A sanctuary where elegance meets comfort in the heart of Harley Street.",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'scroll-smooth' enables native smooth scrolling for anchor links (like clicking "Amenities")
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${cinzel.variable} bg-obsidian text-cream antialiased font-sans overflow-x-hidden selection:bg-gold selection:text-obsidian`}
      >

        <Cursor />
          
        {/* GLOBAL NOISE OVERLAY 
            We keep this! It creates the cinematic texture without affecting scroll performance.
        */}
        <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {children}
          
      </body>
    </html>
  );
}