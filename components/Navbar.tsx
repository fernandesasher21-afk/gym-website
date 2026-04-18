"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#050505]/70 border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "backdrop-blur-md bg-transparent border-b border-white/5"
      }`}
    >
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm group-hover:bg-accent-teal transition-colors duration-300">
          <div className="w-3 h-3 bg-[#050505]" />
        </div>
        <span className="text-white tracking-[0.3em] font-bold text-sm uppercase ml-2">FORGE</span>
      </div>

      <div className="hidden md:flex items-center gap-12">
        <NavLink href="#about">About</NavLink>
        <NavLink href="#programs">Programs</NavLink>
        <NavLink href="#trainers">Trainers</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </div>

      <button className="text-white/60 hover:text-accent-teal transition-colors duration-300 uppercase tracking-[0.25em] text-xs font-light hidden md:block">
        Client Login
      </button>

      {/* Mobile Menu Icon */}
      <div className="md:hidden space-y-1.5 cursor-pointer">
        <div className="w-6 h-[1px] bg-white" />
        <div className="w-6 h-[1px] bg-white" />
      </div>
    </motion.nav>
  );
}

function NavLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="text-white/50 hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.25em] relative group"
    >
      {children}
      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent-teal transition-all duration-400 group-hover:w-full" />
    </a>
  );
}
