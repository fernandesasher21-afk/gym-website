"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const disciplinesData = [
  {
    id: "strength",
    title: "Strength",
    sub: "Raw power generation",
    detail: "Build raw, uncompromising power with heavy barbell movements, compound lifts, and strategic progressive overload designed to push your absolute limits.",
    color: "teal",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    image: "/strength_bg.png",
    video: "/deadlift master.mp4",
  },
  {
    id: "hypertrophy",
    title: "Hypertrophy",
    sub: "Muscle architecture",
    detail: "Architect your physique through science-backed volume training, precise time-under-tension, and targeted muscle isolation for maximum growth.",
    color: "magenta",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    image: "/hypertrophy_bg.png",
    video: "/Hypertrophy.mp4",
  },
  {
    id: "fatloss",
    title: "Fat Loss",
    sub: "Metabolic conditioning",
    detail: "Shred body fat and elevate your baseline metabolism with high-intensity interval training, advanced circuits, and customized caloric strategies.",
    color: "teal",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
      </svg>
    ),
    image: "/fatloss_bg.png",
    video: "/rope master.mp4",
  },
  {
    id: "performance",
    title: "Performance",
    sub: "Athletic optimization",
    detail: "Unlock elite athletic potential with explosive speed drills, plyometrics, and sport-specific agility conditioning to dominate the competition.",
    color: "magenta",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    image: "/performance_bg.png",
  },
];

export default function DisciplinesInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeDiscipline = disciplinesData[activeIndex];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 min-h-[600px]">
      {/* ── LEFT COLUMN (Accordion on Mobile, List on Desktop) ── */}
      <div className="w-full lg:w-5/12 flex flex-col gap-4 justify-center relative z-20">
        {disciplinesData.map((discipline, idx) => {
          const isActive = activeIndex === idx;
          const isTeal = discipline.color === "teal";

          return (
            <motion.div
              key={discipline.id}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              onFocus={() => setActiveIndex(idx)}
              tabIndex={0}
              animate={{
                scale: isActive ? 1.02 : 1,
                opacity: isActive ? 1 : 0.6,
                filter: isActive ? "blur(0px)" : "blur(0px)",
                x: isActive ? 4 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`
                relative rounded-xl cursor-pointer border overflow-hidden
                focus:outline-none focus:ring-2 focus:ring-[#00f0ff]/50
                ${isActive
                  ? "bg-[#0a0a0a] border-white/10 shadow-xl"
                  : "bg-transparent border-transparent hover:bg-white/[0.02]"
                }
              `}
            >
              {/* Highlight Background for Active State */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent ${isTeal ? 'to-[#00f0ff]/[0.05]' : 'to-[#ff003c]/[0.05]'}`}
                transition={{ duration: 0.4 }}
              />

              {/* Accent Border Bottom - Fixed to stay down and not travel */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0
                }}
                style={{ originX: 0 }}
                className={`absolute bottom-0 left-0 h-[2px] w-full ${isTeal ? 'bg-gradient-to-r from-[#00f0ff] to-[#0080ff]' : 'bg-gradient-to-r from-[#ff003c] to-[#ff6b35]'}`}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />

              {/* CARD HEADER */}
              <div className="relative z-10 flex items-center gap-6 p-6">
                <div className={`text-3xl ${isActive ? (isTeal ? 'text-[#00f0ff]' : 'text-[#ff003c]') : 'text-white/40'}`}>
                  {discipline.icon}
                </div>
                <div>
                  <div className="text-xs font-light text-white/30 tracking-widest mb-1">0{idx + 1}</div>
                  <h3 className={`text-xl md:text-2xl font-bold tracking-wide transition-colors duration-300 ${isActive ? "text-white" : "text-white/60"}`}>
                    {discipline.title}
                  </h3>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`mt-2 text-xs font-semibold uppercase tracking-widest hidden lg:block ${isTeal ? 'text-[#00f0ff]/80' : 'text-[#ff003c]/80'}`}
                    >
                      {discipline.sub}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* ── MOBILE EXPANDED ACCORDION CONTENT ── */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="lg:hidden relative z-10 px-6 pb-6 overflow-hidden"
                  >
                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 border border-white/10">
                      {((discipline.video || discipline.image).endsWith('.mp4')) ? (
                        <video
                          src={discipline.video || discipline.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-80 filter contrast-125"
                        />
                      ) : (
                        <Image
                          src={discipline.image}
                          alt={discipline.title}
                          fill
                          className="object-cover opacity-80 filter contrast-125"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    </div>

                    <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isTeal ? 'text-[#00f0ff]/80' : 'text-[#ff003c]/80'}`}>
                      {discipline.sub}
                    </p>
                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                      {discipline.detail}
                    </p>

                    <button
                      className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors duration-300 ${isTeal
                          ? 'border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff]/10'
                          : 'border-[#ff003c]/40 text-[#ff003c] hover:bg-[#ff003c]/10'
                        }`}
                    >
                      Explore Program
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ── RIGHT COLUMN: Dynamic Preview Panel (DESKTOP ONLY) ── */}
      <div className="hidden lg:flex w-7/12 relative rounded-2xl overflow-hidden bg-[#020202] border border-white/5 shadow-2xl min-h-[600px] items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDiscipline.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {((activeDiscipline.video || activeDiscipline.image).endsWith('.mp4')) ? (
              <video
                src={activeDiscipline.video || activeDiscipline.image}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-70 filter contrast-125"
              />
            ) : (
              <Image
                src={activeDiscipline.image}
                alt={activeDiscipline.title}
                fill
                className="object-cover opacity-70 filter contrast-125"
                priority
              />
            )}
            {/* Dark overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
            <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-${activeDiscipline.color === 'teal' ? '[#00f0ff]' : '[#ff003c]'}/10`} />

            {/* Content overlay */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-sm font-bold tracking-[0.4em] uppercase text-white/50 mb-3 flex items-center gap-3">
                  <span className={`w-8 h-[2px] ${activeDiscipline.color === 'teal' ? 'bg-[#00f0ff]' : 'bg-[#ff003c]'}`}></span>
                  0{activeIndex + 1}
                </div>
                <h2 className="text-7xl font-black tracking-tighter text-white drop-shadow-2xl mb-4">
                  {activeDiscipline.title}
                </h2>
                <p className="text-white/60 text-xl font-light max-w-md leading-relaxed">
                  {activeDiscipline.detail}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-8 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-colors duration-300 ${activeDiscipline.color === 'teal'
                      ? 'border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff]/10'
                      : 'border-[#ff003c]/40 text-[#ff003c] hover:bg-[#ff003c]/10'
                    }`}
                >
                  Explore Program
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
