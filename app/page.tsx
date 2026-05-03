"use client";

import DeadliftScroll from "@/components/DeadliftScroll";
import GlobalParticles from "@/components/GlobalParticles";
import Navbar from "@/components/Navbar";
import DisciplinesInteractive from "@/components/DisciplinesInteractive";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

// ─── Split-text helpers ───────────────────────────────────────────────────────

/** Animate each character of a word with a staggered CSS-animation. */
function SplitWord({
  word,
  startDelay = 0,
  charDelay = 0.045,
  className = "",
}: {
  word: string;
  startDelay?: number;
  charDelay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block align-baseline ${className}`} aria-label={word}>
      {word.split("").map((ch, i) => (
        <span
          key={i}
          className="char-reveal"
          aria-hidden="true"
          style={{ animationDelay: `${startDelay + i * charDelay}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// ─── Elegant capsule scroll indicator ────────────────────────────────────────

function ScrollCapsule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 2.2, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 mt-20"
    >
      <span className="text-white/20 text-[9px] tracking-[0.5em] uppercase select-none">
        Scroll
      </span>
      {/* Capsule container */}
      <div className="w-[22px] h-[36px] rounded-full border border-white/15 flex items-start justify-center p-[5px] relative">
        {/* Moving dot */}
        <div className="w-[6px] h-[6px] rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.7)] scroll-dot" />
      </div>
    </motion.div>
  );
}

// ─── Ambient floating container ───────────────────────────────────────────────

function AmbientFloat({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        scale: [1, 1.012, 1],
      }}
      transition={{
        duration: 9,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { scrollY } = useScroll();
  const [dynamicWord, setDynamicWord] = useState("STRENGTH");

  useEffect(() => {
    const words = ["STRENGTH", "MASTERY"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % words.length;
      setDynamicWord(words[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  // Subtle parallax for the hero atmospheric glow blob
  const glowY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <main className="bg-[#050505] text-white min-h-screen relative">
      <GlobalParticles />
      <Navbar />

      {/* ── 1) HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">

        {/* Floating ambient orbs */}
        <div className="orb-animate absolute top-[15%] left-[8%] w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,240,255,0.07) 0%, transparent 70%)" }} />
        <div className="orb-animate-reverse absolute bottom-[20%] right-[6%] w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,128,255,0.06) 0%, transparent 70%)" }} />
        <div className="orb-animate absolute bottom-[30%] left-[20%] w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,0,60,0.04) 0%, transparent 70%)", animationDelay: "4s" }} />

        {/* Atmospheric radial glow — parallax on scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: glowY,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 52%, rgba(0,240,255,0.07) 0%, rgba(0,128,255,0.03) 45%, transparent 70%)",
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(5,5,5,0.6) 70%, #050505 100%)",
          }}
        />

        {/* ── Hero content — fades out as user scrolls past ── */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full pt-24 md:pt-32">
          <AmbientFloat>
            <div className="text-center">

              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-[#00f0ff] uppercase tracking-[0.55em] text-[10px] font-semibold mb-8 select-none"
              >
                Elite Performance
              </motion.p>

              {/* ── SPLIT-TEXT HEADING ──────────────────────── */}
              <h1
                className="text-5xl md:text-[8.5rem] font-black tracking-[-0.03em] leading-none mb-8 select-none"
                aria-label="BUILT FOR STRENGTH"
              >
                {/* "BUILT FOR" — white, plain */}
                <SplitWord
                  word="BUILT"
                  startDelay={0.5}
                  className="text-white mr-[0.25em]"
                />
                <SplitWord
                  word="FOR"
                  startDelay={0.5 + 5 * 0.045 + 0.05}
                  className="text-white mr-[0.25em]"
                />
                {/* Line break on mobile */}
                <span className="block md:inline" aria-hidden="true" />

                {/* Dynamic Word Container */}
                <span className="inline-block min-w-[5.5em] text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={dynamicWord}
                      id="dynamic-word"
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="shimmer-text inline-block align-baseline"
                    >
                      {dynamicWord}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 1.5 }}
                className="text-white/45 text-base md:text-lg font-light tracking-[0.12em] max-w-xl mx-auto mb-12 leading-relaxed"
              >
                Precision training for those who demand more.
                <br className="hidden md:block" />
                Your threshold is only the beginning.
              </motion.p>

              {/* ── CTA BUTTONS ───────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 1.7 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0 0 55px rgba(0,240,255,0.35), 0 0 20px rgba(0,240,255,0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="relative px-11 py-[14px] text-[#00f0ff] text-[10px] uppercase tracking-[0.42em] font-semibold border border-[#00f0ff]/35 rounded-full bg-[#00f0ff]/[0.06] cursor-pointer overflow-hidden group btn-glow-pulse"
                >
                  <span className="absolute inset-0 rounded-full bg-[#00f0ff]/[0.10] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
                  <span className="absolute inset-0 rounded-full border border-[#00f0ff]/18 animate-ping" style={{ animationDuration: "2.8s" }} aria-hidden="true" />
                  <span className="relative z-10 group-hover:tracking-[0.52em] transition-all duration-500">Start Training</span>
                </motion.button>
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="px-11 py-[14px] text-white/40 text-[10px] uppercase tracking-[0.42em] font-semibold border border-white/10 rounded-full hover:border-white/25 hover:text-white/60 transition-all duration-500 cursor-pointer"
                >
                  View Plans
                </motion.a>
              </motion.div>



              {/* ── SCROLL INDICATOR ─────────────────────── */}
              <ScrollCapsule />

            </div>
          </AmbientFloat>
        </motion.div>
      </section>


      {/* ── 2) DEADLIFT SCROLL ───────────────────────────────────────────────── */}
      <section className="relative z-10">
        <DeadliftScroll />
      </section>

      {/* ── 3) ABOUT / BRAND PHILOSOPHY ──────────────────────────────────────── */}
      <section id="about" className="py-32 px-8 md:px-24 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-[#ff003c] uppercase tracking-[0.3em] text-xs font-semibold mb-6">Our Philosophy</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 border-l-4 border-[#ff003c] pl-6 leading-tight shimmer-text">
              ENGINEERED <br />FOR MASTERY
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6 font-light">
              Every movement is designed to push limits. Every rep is a step toward mastery.
              We don&apos;t do gimmicks. We rely on science, strict form, and relentless consistency.
            </p>
            <p className="text-white/40 text-base leading-relaxed font-light">
              Built by athletes. Proven in competition. Refined over decades of elite coaching — FORGE is where potential becomes performance.
            </p>
          </motion.div>

          {/* AI-generated athlete image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.06]">
              <Image
                src="/about_athlete.png"
                alt="Elite athlete training in dark gym"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#ff003c]/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── 4) PROGRAMS / SERVICES ───────────────────────────────────────────── */}
      <section id="programs" className="py-32 px-8 md:px-24 relative z-10 border-y border-white/[0.04]"
        style={{ background: "linear-gradient(180deg, #050505 0%, #070a0a 50%, #050505 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[#00f0ff] uppercase tracking-[0.4em] text-xs font-semibold mb-4">Choose Your Discipline</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter shimmer-text">DISCIPLINES</h2>
            <div className="gradient-line-sweep h-px w-32 mx-auto mt-6 rounded-full opacity-60" />
          </motion.div>

          <DisciplinesInteractive />
        </div>
      </section>

      {/* ── 5) FEATURE HIGHLIGHTS ────────────────────────────────────────────── */}
      <section className="py-24 relative z-10">
        {[
          { t: "RAW MASTERY",      d: "Heavy lifts. Pure strength. No compromises.",       align: "left",  img: "/feature_power.png" },
          { t: "PRECISION FORM", d: "Technique defines performance. Master the mechanics.", align: "right", img: "/feature_form.png" },
          { t: "ENDURANCE EDGE", d: "Push beyond fatigue. Outlast every limit.",          align: "left",  img: "/feature_endurance.png" },
        ].map((block, i) => (
          <div key={block.t} className={`flex flex-col ${block.align === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-0 mb-4 overflow-hidden`}>
            <motion.div
              initial={{ opacity: 0, x: block.align === "left" ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="w-full md:w-1/2 relative aspect-[16/10] overflow-hidden"
            >
              <Image src={block.img} alt={block.t} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className={`absolute inset-y-0 ${block.align === "left" ? "right-0" : "left-0"} w-40 bg-gradient-to-${block.align === "left" ? "r" : "l"} from-transparent to-[#050505] pointer-events-none`} />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: block.align === "left" ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
              className={`w-full md:w-1/2 px-10 md:px-20 py-16 ${block.align === "right" ? "text-right" : "text-left"}`}
            >
              <p className="text-white/20 text-sm tracking-[0.4em] uppercase mb-4">0{i + 1}</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-none shimmer-text">{block.t}</h2>
              <p className="text-xl text-white/50 font-light tracking-wider leading-relaxed">{block.d}</p>
              <div className={`mt-8 h-px w-24 bg-gradient-to-r from-[#00f0ff] to-transparent ${block.align === "right" ? "ml-auto" : ""}`} />
            </motion.div>
          </div>
        ))}
      </section>

      {/* ── 6) TRAINERS ──────────────────────────────────────────────────────── */}
      <section id="trainers" className="py-32 px-8 md:px-24 max-w-7xl mx-auto relative z-10 border-t border-white/[0.05]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#00f0ff] uppercase tracking-[0.4em] text-xs font-semibold mb-4">Meet your coaches</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter shimmer-text">THE VANGUARD</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { n: "Kaelen Voss",    s: "Strength Architect", color: "teal",    img: "/trainer_1.png" },
            { n: "Sarah Chen",     s: "Biomechanics Lead",  color: "magenta", img: "/trainer_2.png" },
            { n: "Marcus Thorne",  s: "Endurance Elite",    color: "teal",    img: "/trainer_3.png" },
          ].map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden relative mb-6 border border-white/5 group-hover:border-white/15 transition-colors duration-500">
                <Image src={t.img} alt={t.n} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                <div className={`absolute inset-0 bg-accent-${t.color}/0 group-hover:bg-accent-${t.color}/15 transition-all duration-700 mix-blend-overlay z-20`} />
              </div>
              <h4 className="text-2xl font-bold tracking-tight shimmer-text">{t.n}</h4>
              <p className={`text-white/40 text-xs tracking-widest uppercase mt-2 group-hover:text-accent-${t.color} transition-colors duration-500`}>{t.s}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6.1) PRICING ────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-32 px-8 md:px-24 bg-[#050505] relative z-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[#00f0ff] uppercase tracking-[0.4em] text-xs font-semibold mb-4">Membership tiers</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter shimmer-text">PRICING</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Standard", price: "$49", features: ["Access to all areas", "Initial assessment", "Locker access", "All gym equipment"], highlight: false },
              { name: "Pro", price: "$89", features: ["Priority booking", "2 PT sessions/mo", "Custom diet plan", "All standard features"], highlight: true },
              { name: "Elite", price: "$149", features: ["Unlimited PT sessions", "Full physical therapy", "Private recovery suite", "24/7 priority support"], highlight: false },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40, scale: plan.highlight ? 1.05 : 1 }}
                whileInView={{ opacity: 1, y: 0, scale: plan.highlight ? 1.05 : 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.15, // Fast for hover
                  opacity: { duration: 0.8, delay: i * 0.15 }, // Slower for entrance
                  y: { duration: 0.8, delay: i * 0.15 },
                }}
                whileHover={{ 
                  scale: plan.highlight ? 1.1 : 1.05,
                  zIndex: 30,
                  boxShadow: "0 0 50px rgba(0,240,255,0.15)",
                }}
                className={`relative p-10 rounded-2xl border transition-all duration-150 overflow-hidden flex flex-col cursor-pointer ${
                  plan.highlight 
                    ? "bg-[#0a0a0a] border-[#00f0ff]/30 shadow-[0_0_40px_rgba(0,240,255,0.05)] z-20" 
                    : "bg-transparent border-white/5"
                } hover:border-[#00f0ff]/50`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 px-4 py-1 bg-[#00f0ff] text-[#050505] text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-white/40 text-sm">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <li key={f} className="text-white/60 text-sm flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/40" />
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full border transition-all duration-500 ${
                    plan.highlight 
                      ? "bg-[#00f0ff] text-[#050505] border-[#00f0ff]" 
                      : "bg-transparent text-[#00f0ff] border-[#00f0ff]/30 hover:bg-[#00f0ff]/10"
                  }`}
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6.2) REVIEWS ────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-32 px-8 md:px-24 bg-[#020202] relative z-10 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[#00f0ff] uppercase tracking-[0.4em] text-xs font-semibold mb-4">Client feedback</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter shimmer-text">TESTIMONIALS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { n: "David Miller", r: "Professional Powerlifter", q: "The environment at FORGE is unmatched. Every piece of equipment is elite, and the coaching staff actually understands biomechanics." },
              { n: "Elena Rodriguez", r: "Fitness Enthusiast", q: "I've never seen progress like this. The specific programming and the focus on form changed everything for me. Truly premium experience." },
              { n: "James T. Wilson", r: "D1 Athlete", q: "Most gyms say they are for performance, but FORGE actually delivers. This is where you go when you're serious about your results." },
            ].map((rev, i) => (
              <motion.div
                key={rev.n}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-10 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, star) => (
                    <span key={star} className="text-[#00f0ff] text-xs">★</span>
                  ))}
                </div>
                <p className="text-white/70 italic leading-relaxed mb-8 flex-grow">
                  &ldquo;{rev.q}&rdquo;
                </p>
                <div>
                  <h4 className="text-lg font-bold tracking-tight">{rev.n}</h4>
                  <p className="text-white/30 text-xs uppercase tracking-widest mt-1">{rev.r}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6.3) FIND US (CONTACT) ─────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-8 md:px-24 bg-[#050505] relative z-10 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-[#00f0ff] uppercase tracking-[0.4em] text-xs font-semibold mb-4">Location</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter shimmer-text">
              FIND US
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 md:gap-16 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient glow in the background of the card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 blur-[100px] pointer-events-none" />

            {/* Left Column: Info */}
            <div className="flex-1 space-y-10 relative z-10">
              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-[#00f0ff]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-widest mb-2 text-sm uppercase">Address</h4>
                  <p className="text-white/50 leading-relaxed text-sm max-w-[280px]">
                    123 Vanguard Avenue, Iron District, Level 4,<br/> Metropolis, NY 10001
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-[#00f0ff]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-widest mb-2 text-sm uppercase">Hours</h4>
                  <p className="text-[#00f0ff] font-medium text-sm tracking-wide">Open 24 Hours</p>
                  <p className="text-white/50 text-sm mt-1">Every day of the week</p>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-start gap-5">
                <div className="mt-1 text-[#00f0ff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-widest mb-2 text-sm uppercase">Social</h4>
                  <p className="text-white/50 text-sm hover:text-white transition-colors cursor-pointer">Follow us on Instagram</p>
                </div>
              </div>
            </div>

            {/* Right Column: Map & Button */}
            <div className="flex-1 flex flex-col gap-6 relative z-10">
              <div className="w-full h-[280px] bg-[#020202] rounded-xl overflow-hidden relative border border-white/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2798902705!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1714582000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter invert-[100%] hue-rotate-[180deg] contrast-[1.1] opacity-80 hover:opacity-100 transition-opacity duration-500"
                ></iframe>
              </div>
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=New+York,+NY"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,240,255,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full border border-[#00f0ff]/50 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] font-medium py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 uppercase tracking-widest text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
                Get Directions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── 7) FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-40 relative z-10 overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(180deg, #050505 0%, #040a0a 50%, #050505 100%)" }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,240,255,0.05)_0%,rgba(0,128,255,0.03)_40%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-[#00f0ff]/[0.04] blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#0080ff]/[0.04] blur-[80px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 px-6 max-w-3xl mx-auto"
        >
          <p className="text-[#00f0ff] uppercase tracking-[0.4em] text-xs font-semibold mb-6">Begin today</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 shimmer-text">
            START YOUR <br className="md:hidden" />TRANSFORMATION
          </h2>
          <p className="text-white/50 text-lg font-light mb-4 max-w-xl mx-auto leading-relaxed">
            Train with purpose. Perform with power. Join over 1,200 athletes who chose to push beyond their limits.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/25 text-xs uppercase tracking-widest mb-12">
            <span>✓ No lock-in contracts</span>
            <span>✓ Free first session</span>
            <span>✓ Cancel anytime</span>
          </div>
          <div className="gradient-line-sweep h-px w-24 mx-auto mb-10 rounded-full opacity-50" />
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(0,240,255,0.35), 0 0 100px rgba(0,128,255,0.15)" }}
            whileTap={{ scale: 0.96 }}
            className="relative px-14 py-5 border border-[#00f0ff]/50 text-[#00f0ff] tracking-[0.3em] font-medium uppercase transition-all duration-500 rounded-sm shadow-[0_0_30px_rgba(0,240,255,0.12)] active:scale-95 overflow-hidden group"
            style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(0,128,255,0.08) 100%)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 to-[#0080ff]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10">Join Now</span>
          </motion.button>
        </motion.div>
      </section>

      {/* ── 8) FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-8 border-t border-white/[0.05] relative z-10 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/50 rounded-sm" />
            <span className="font-bold tracking-[0.3em] text-white/50 text-xs uppercase">FORGE</span>
          </div>
          <div className="flex gap-8 text-xs font-light text-white/40 uppercase tracking-widest">
            <a href="#programs" className="hover:text-white transition-colors">Programs</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} FORGE FITNESS.
          </div>
        </div>
      </footer>
    </main>
  );
}
