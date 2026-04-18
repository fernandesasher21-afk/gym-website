"use client";

import DeadliftScroll from "@/components/DeadliftScroll";
import GlobalParticles from "@/components/GlobalParticles";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#050505] text-white min-h-screen relative">
      <GlobalParticles />
      <Navbar />

      {/* 1) HERO SECTION — Cinematic */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">

        {/* Radial atmospheric glow behind text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 52%, rgba(0,240,255,0.05) 0%, rgba(0,240,255,0.01) 45%, transparent 70%)",
          }}
        />

        {/* Edge vignette / haze */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(5,5,5,0.55) 70%, #050505 100%)",
          }}
        />

        {/* Staggered content */}
        <motion.div
          className="text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
        >
          {/* Label */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
            }}
            className="text-accent-teal uppercase tracking-[0.5em] text-[10px] font-semibold mb-8"
          >
            Elite Performance
          </motion.p>

          {/* Heading with camera push-in */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28, scale: 0.97 },
              visible: {
                opacity: 1, y: 0, scale: 1,
                transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-5xl md:text-[8.5rem] font-black tracking-[-0.03em] leading-none mb-8 select-none"
          >
            BUILT FOR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/35">
              STRENGTH
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
            className="text-white/45 text-base md:text-lg font-light tracking-[0.12em] max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Precision training for those who demand more.
            <br className="hidden md:block" />
            Your threshold is only the beginning.
          </motion.p>

          {/* CTA Button with pulse ring */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-10 py-4 text-accent-teal text-[10px] uppercase tracking-[0.4em] font-semibold border border-accent-teal/40 rounded-full bg-accent-teal/[0.07] hover:bg-accent-teal/[0.15] transition-all duration-300 shadow-[0_0_24px_rgba(0,240,255,0.12)] hover:shadow-[0_0_50px_rgba(0,240,255,0.28)] cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full border border-accent-teal/20 animate-ping" style={{ animationDuration: "2.5s" }} />
              <span className="relative z-10">Start Training</span>
            </motion.button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1.2, delay: 0.6 } },
            }}
            className="mt-20 flex flex-col items-center gap-3"
          >
            <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
            <div className="w-px h-10 bg-white/8 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-accent-teal to-transparent"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>


      {/* 2) HERO SCROLL SECTION */}
      <section className="relative z-10">
        <DeadliftScroll />
      </section>

      {/* 3) ABOUT / BRAND PHILOSOPHY */}
      <section id="about" className="py-32 px-8 md:px-24 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-accent-magenta uppercase tracking-[0.3em] text-xs font-semibold mb-6">Our Philosophy</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 border-l-4 border-accent-magenta pl-6 leading-tight">
              ENGINEERED <br />FOR POWER
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
              {/* Overlay fade at bottom into page bg */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent" />
            </div>
            {/* Accent glow */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent-magenta/10 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 4) PROGRAMS / SERVICES */}
      <section id="programs" className="py-32 px-8 md:px-24 bg-white/[0.01] relative z-10 border-y border-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">DISCIPLINES</h2>
            <p className="text-white/50 tracking-[0.2em] uppercase text-sm mt-4">Select your path</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Strength", sub: "Raw Power generation", color: "teal" },
              { title: "Hypertrophy", sub: "Muscle architecture", color: "magenta" },
              { title: "Fat Loss", sub: "Metabolic conditioning", color: "teal" },
              { title: "Performance", sub: "Athletic optimization", color: "magenta" },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-xl cursor-pointer hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-accent-${val.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-accent-${val.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                <div className="text-4xl font-light text-white/20 mb-6 group-hover:text-white/40 transition-colors">0{i+1}</div>
                <h3 className="text-xl font-bold tracking-wide mb-2 relative z-10">{val.title}</h3>
                <p className="text-white/40 text-sm relative z-10">{val.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) FEATURE HIGHLIGHTS — with AI images */}
      <section className="py-24 relative z-10">
        {[
          { t: "RAW POWER", d: "Heavy lifts. Pure strength. No compromises.", align: "left", img: "/feature_power.png" },
          { t: "PRECISION FORM", d: "Technique defines performance. Master the mechanics.", align: "right", img: "/feature_form.png" },
          { t: "ENDURANCE EDGE", d: "Push beyond fatigue. Outlast every limit.", align: "left", img: "/feature_endurance.png" },
        ].map((block, i) => (
          <div key={block.t} className={`flex flex-col ${block.align === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-0 mb-4 overflow-hidden`}>
            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, x: block.align === "left" ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="w-full md:w-1/2 relative aspect-[16/10] overflow-hidden"
            >
              <Image
                src={block.img}
                alt={block.t}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Blend into page on the inner edge */}
              <div className={`absolute inset-y-0 ${block.align === "left" ? "right-0" : "left-0"} w-40 bg-gradient-to-${block.align === "left" ? "r" : "l"} from-transparent to-[#050505] pointer-events-none`} />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            </motion.div>

            {/* Text panel */}
            <motion.div
              initial={{ opacity: 0, x: block.align === "left" ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
              className={`w-full md:w-1/2 px-10 md:px-20 py-16 ${block.align === "right" ? "text-right" : "text-left"}`}
            >
              <p className="text-white/20 text-sm tracking-[0.4em] uppercase mb-4">0{i + 1}</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-none">
                {block.t}
              </h2>
              <p className="text-xl text-white/50 font-light tracking-wider leading-relaxed">
                {block.d}
              </p>
              <div className={`mt-8 h-px w-24 bg-gradient-to-r from-accent-teal to-transparent ${block.align === "right" ? "ml-auto" : ""}`} />
            </motion.div>
          </div>
        ))}
      </section>

      {/* 6) TRAINERS / COMMUNITY — with AI portraits */}
      <section id="trainers" className="py-32 px-8 md:px-24 max-w-7xl mx-auto relative z-10 border-t border-white/[0.05]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-accent-teal uppercase tracking-[0.4em] text-xs font-semibold mb-4">Meet your coaches</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">THE VANGUARD</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { n: "Kaelen Voss", s: "Strength Architect", color: "teal", img: "/trainer_1.png" },
            { n: "Sarah Chen",  s: "Biomechanics Lead",  color: "magenta", img: "/trainer_2.png" },
            { n: "Marcus Thorne", s: "Endurance Elite",  color: "teal", img: "/trainer_3.png" },
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
                <Image
                  src={t.img}
                  alt={t.n}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                {/* Accent colour tint on hover */}
                <div className={`absolute inset-0 bg-accent-${t.color}/0 group-hover:bg-accent-${t.color}/15 transition-all duration-700 mix-blend-overlay z-20`} />
              </div>
              <h4 className="text-2xl font-bold tracking-tight">{t.n}</h4>
              <p className={`text-white/40 text-xs tracking-widest uppercase mt-2 group-hover:text-accent-${t.color} transition-colors duration-500`}>{t.s}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7) FINAL CTA SECTION */}
      <section className="py-40 relative z-10 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.04)_0%,transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 px-6"
        >
          <p className="text-accent-teal uppercase tracking-[0.4em] text-xs font-semibold mb-6">Begin today</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            START YOUR <br className="md:hidden" />TRANSFORMATION
          </h2>
          <p className="text-white/60 text-xl font-light mb-12">
            Train with purpose. Perform with power.
          </p>
          <button className="px-12 py-5 border border-accent-teal/50 bg-accent-teal/10 hover:bg-accent-teal/20 text-accent-teal tracking-[0.3em] font-medium uppercase transition-all duration-500 rounded-sm shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95">
            Join Now
          </button>
        </motion.div>
      </section>

      {/* 8) FOOTER */}
      <footer className="py-12 px-8 border-t border-white/[0.05] relative z-10 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/50 rounded-sm" />
            <span className="font-bold tracking-[0.3em] text-white/50 text-xs uppercase">FORGE</span>
          </div>
          <div className="flex gap-8 text-xs font-light text-white/40 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Programs</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} FORGE FITNESS.
          </div>
        </div>
      </footer>
    </main>
  );
}
