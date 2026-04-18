"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Fade navbar opacity slightly at the very top so hero breathes freely
  const navOpacity = useTransform(scrollY, [0, 80], [0.85, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      style={{ opacity: navOpacity }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-xl bg-[#050505]/70 border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "backdrop-blur-md bg-transparent border-b border-white/[0.03]"
      }`}
    >
      {/* Logo mark */}
      <motion.div
        className="flex items-center gap-2 cursor-pointer group"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm group-hover:bg-[#00f0ff] transition-colors duration-400">
          <div className="w-3 h-3 bg-[#050505]" />
        </div>
        <span className="text-white tracking-[0.3em] font-bold text-sm uppercase ml-2 group-hover:text-[#00f0ff] transition-colors duration-400">
          FORGE
        </span>
      </motion.div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-12">
        <NavLink href="#about">About</NavLink>
        <NavLink href="#programs">Programs</NavLink>
        <NavLink href="#trainers">Trainers</NavLink>
        <NavLink href="#pricing">Pricing</NavLink>
        <NavLink href="#reviews">Reviews</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="text-white/50 hover:text-[#00f0ff] transition-colors duration-400 uppercase tracking-[0.25em] text-xs font-light hidden md:block"
      >
        Client Login
      </motion.button>

      {/* Mobile menu icon */}
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
      className="text-white/40 hover:text-white/90 transition-colors duration-400 text-xs uppercase tracking-[0.25em] relative group"
    >
      {children}
      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#00f0ff] transition-all duration-500 group-hover:w-full" />
    </a>
  );
}
