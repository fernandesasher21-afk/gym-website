"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      {/* Logo mark — smooth scroll to top */}
      <motion.div
        className="flex items-center gap-2 cursor-pointer group"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo(0, 0)}
        role="button"
        aria-label="Back to top"
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
      <div 
        className="md:hidden space-y-1.5 cursor-pointer relative z-50 p-2 -mr-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <motion.div 
          animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 3.5 : 0 }}
          className="w-6 h-[1px] bg-white origin-center" 
        />
        <motion.div 
          animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -3.5 : 0 }}
          className="w-6 h-[1px] bg-white origin-center" 
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-full h-screen bg-[#050505] flex flex-col items-center justify-center gap-8 md:hidden -z-10"
          >
            <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="#programs" onClick={() => setIsMobileMenuOpen(false)}>Programs</MobileNavLink>
            <MobileNavLink href="#trainers" onClick={() => setIsMobileMenuOpen(false)}>Trainers</MobileNavLink>
            <MobileNavLink href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
            
            <button onClick={() => setIsMobileMenuOpen(false)} className="mt-8 px-10 py-4 border border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff] uppercase tracking-[0.25em] text-xs font-light">
              Client Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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

function MobileNavLink({ children, href, onClick }: { children: React.ReactNode; href: string; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-white hover:text-[#00f0ff] transition-colors duration-400 text-xl uppercase tracking-[0.25em] font-light"
    >
      {children}
    </a>
  );
}
