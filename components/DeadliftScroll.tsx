"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

const FRAME_COUNT = 142;

export default function DeadliftScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store frames in a ref so the scroll listener always has the latest value (no stale closure)
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Raw motion value we'll drive manually from the scroll listener
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.0001,
  });

  // ─── 1. Preload all images ──────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.jpg`;
      img.onload = img.onerror = () => {
        if (!mounted) return;
        loaded++;
        setImagesLoaded(loaded);
      };
      images[i] = img;
    }
    framesRef.current = images;
    return () => { mounted = false; };
  }, []);

  // ─── 2. Global scroll listener → drives rawProgress ──────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight; // 400vh - 100vh = 300vh

      // progress: 0 when top of container hits top of viewport
      //           1 when bottom of container hits bottom of viewport
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      rawProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial value
    return () => window.removeEventListener("scroll", handleScroll);
  }, [rawProgress]);

  // ─── 3. Draw canvas whenever smoothProgress changes ───────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId: number;

    const paint = () => {
      // alpha:true so edges become transparent → the #050505 page shows through
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const W = window.innerWidth;
      const H = window.innerHeight;
      if (canvas.width !== W) canvas.width = W;
      if (canvas.height !== H) canvas.height = H;

      ctx.clearRect(0, 0, W, H);

      const progress = smoothProgress.get();
      const idx = Math.round(progress * (FRAME_COUNT - 1));
      const frame = framesRef.current[idx];

      if (frame?.complete && frame.naturalWidth > 0) {
        const ir = frame.naturalWidth / frame.naturalHeight;
        const cr = W / H;
        let dw: number, dh: number;
        if (cr > ir) { dw = W; dh = W / ir; }
        else          { dh = H; dw = H * ir; }

        const dx = (W - dw) / 2;
        const dy = (H - dh) / 2;

        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(frame, dx, dy, dw, dh);

        // ── Destination-out vignette ─────────────────────────────
        // Erases alpha at edges so transparent canvas reveals #050505 behind
        ctx.globalCompositeOperation = "destination-out";

        // Radial: keep just the centre subject, dissolve outward
        const cx = W / 2, cy = H / 2;
        // outerR must reach at least to the image edges so it fades from centre out
        const outerR = Math.max(dw, dh) * 0.52;
        const innerR = outerR * 0.12;
        const radial = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
        radial.addColorStop(0,    "rgba(0,0,0,0)");
        radial.addColorStop(0.38, "rgba(0,0,0,0.02)");
        radial.addColorStop(0.65, "rgba(0,0,0,0.65)");
        radial.addColorStop(1,    "rgba(0,0,0,1)");
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, W, H);

        // LEFT edge fade: from left canvas edge to 52% into the drawn image width
        const lEdge  = dx + dw * 0.52;
        const lft = ctx.createLinearGradient(0, 0, lEdge, 0);
        lft.addColorStop(0,    "rgba(0,0,0,1)");
        lft.addColorStop(0.55, "rgba(0,0,0,0.7)");
        lft.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = lft;
        ctx.fillRect(0, 0, lEdge, H);

        // RIGHT edge fade: from right canvas edge to 48% into drawn image (mirrored)
        const rStart = dx + dw * 0.48;
        const rgt = ctx.createLinearGradient(W, 0, rStart, 0);
        rgt.addColorStop(0,    "rgba(0,0,0,1)");
        rgt.addColorStop(0.55, "rgba(0,0,0,0.7)");
        rgt.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = rgt;
        ctx.fillRect(rStart, 0, W - rStart, H);

        // TOP edge fade from top to 35% down from drawn image top
        const tEdge = dy + dh * 0.35;
        const top = ctx.createLinearGradient(0, 0, 0, tEdge);
        top.addColorStop(0, "rgba(0,0,0,1)");
        top.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = top;
        ctx.fillRect(0, 0, W, tEdge);

        // BOTTOM edge fade from bottom up to 65% of drawn image height
        const bStart = dy + dh * 0.65;
        const bot = ctx.createLinearGradient(0, H, 0, bStart);
        bot.addColorStop(0, "rgba(0,0,0,1)");
        bot.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = bot;
        ctx.fillRect(0, bStart, W, H - bStart);

        ctx.globalCompositeOperation = "source-over"; // reset
      }
    };

    const loop = () => { paint(); rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [smoothProgress]); // smoothProgress is a stable MotionValue ref — safe to depend on

  // ─── Loading UI ────────────────────────────────────────────────────────────
  const loadPercent = Math.round((imagesLoaded / FRAME_COUNT) * 100);
  const isLoading = imagesLoaded < FRAME_COUNT;

  return (
    // Scroll space: 400vh tall
    <div ref={containerRef} className="relative w-full" style={{ height: "400vh" }}>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
          <p className="mb-4 text-white/50 tracking-[0.4em] text-xs uppercase font-light">
            Preparing Experience
          </p>
          <div className="w-56 h-[1px] bg-white/10 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent transition-all duration-200"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <p className="mt-4 text-white/40 text-xs font-light">{loadPercent}%</p>
        </div>
      )}

      {/* Sticky canvas — pinned while scroll space is consumed */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas — edges fade to transparent via destination-out compositing */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Overlay text beats */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <ScrollIndicator progress={smoothProgress} />

          <BeatText progress={smoothProgress} range={[0, 0.05, 0.20, 0.25]}
            title="FORGE YOUR STRENGTH" subtitle="Power begins where comfort ends" />

          <BeatText progress={smoothProgress} range={[0.25, 0.30, 0.42, 0.48]}
            title="CONTROL EVERY REP" subtitle="Precision builds real strength" />

          <BeatText progress={smoothProgress} range={[0.50, 0.55, 0.67, 0.73]}
            title="EMBRACE THE STRAIN" subtitle="Growth lives in resistance" />

          <BeatText progress={smoothProgress} range={[0.75, 0.80, 0.93, 1.0]}
            title="TRAIN BEYOND LIMITS" subtitle="Join the elite" showCta />
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScrollIndicator({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] tracking-[0.35em] text-white/40 uppercase">Scroll</span>
      <div className="w-px h-10 bg-white/15 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 bg-[#00f0ff]"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

function BeatText({
  progress, range, title, subtitle, showCta,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  title: string;
  subtitle: string;
  showCta?: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [28, 0, 0, -28]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        {title}
      </h2>
      <p className="mt-4 text-base md:text-xl text-white/55 font-light tracking-widest max-w-lg">
        {subtitle}
      </p>
      {showCta && (
        <button className="mt-10 px-10 py-4 border border-[#00f0ff]/40 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] tracking-[0.25em] text-xs uppercase transition-all duration-400 pointer-events-auto shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_40px_rgba(0,240,255,0.35)] hover:scale-105 active:scale-95">
          Start Training
        </button>
      )}
    </motion.div>
  );
}
