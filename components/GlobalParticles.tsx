"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
  layer: number; // 0 = background (slower, dimmer), 1 = foreground (faster, brighter)
};

export default function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const particlesRef = useRef<Particle[]>([]);

  // Mouse position ref — updated via listener, read in rAF loop (no re-renders)
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0-1
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 }); // raw target for lerp

  useEffect(() => {
    const particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 80 : 180;

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      const layer = Math.random() > 0.4 ? 0 : 1; // 60% bg, 40% fg

      let color = "255, 255, 255";
      if (rand > 0.93) color = "0, 240, 255";   // teal sparks
      if (rand > 0.97) color = "255, 0, 60";    // magenta sparks (ultra rare)

      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: layer === 0
          ? Math.random() * 0.8 + 0.2   // BG: tiny sub-pixel
          : Math.random() * 1.8 + 0.6,  // FG: slightly larger
        speedY: layer === 0
          ? (Math.random() * 0.08 + 0.02) * -1  // BG: slower drift
          : (Math.random() * 0.18 + 0.06) * -1, // FG: faster drift
        speedX: (Math.random() - 0.5) * (layer === 0 ? 0.06 : 0.12),
        baseAlpha: layer === 0
          ? Math.random() * 0.18 + 0.05 // BG: very subtle
          : Math.random() * 0.45 + 0.15, // FG: more visible
        alpha: 0,
        color,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.005,
        layer,
      });
    }
    particlesRef.current = particles;
  }, []);

  // Mouse tracking — update target on move, rAF loop lerps toward it
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }

      ctx.clearRect(0, 0, W, H);

      // Smoothly lerp mouse toward target (cinematic lag)
      const lerpSpeed = 0.04;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerpSpeed;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerpSpeed;

      // Parallax offset from mouse: BG moves more (30px max), FG less (15px max)
      const mouseDX = (mouseRef.current.x - 0.5) * 2; // -1 to 1
      const mouseDY = (mouseRef.current.y - 0.5) * 2;
      const bgMouseX = mouseDX * 30;
      const bgMouseY = mouseDY * 30;
      const fgMouseX = mouseDX * 15;
      const fgMouseY = mouseDY * 15;

      const scrollVal = smoothProgress.get();
      // BG particles have bigger parallax shift, FG particles less
      const bgParallax = scrollVal * H * 0.8;
      const fgParallax = scrollVal * H * 0.3;

      particlesRef.current.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.y += p.speedY / H;
        p.x += p.speedX / W + Math.sin(p.wobble) * 0.0003;

        if (p.y < -0.05) p.y = 1.05;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05)  p.x = -0.05;

        const scrollParallax = p.layer === 0 ? bgParallax : fgParallax;
        const mX = p.layer === 0 ? bgMouseX : fgMouseX;
        const mY = p.layer === 0 ? bgMouseY : fgMouseY;

        const drawX = p.x * W + mX;
        let drawY = (p.y * H) - scrollParallax + mY;
        drawY = ((drawY % H) + H) % H;

        // Breathe alpha
        p.alpha = p.baseAlpha * (0.5 + Math.sin(p.wobble * 0.7) * 0.5);

        ctx.beginPath();

        // Glow for accent, crisp for white
        if (p.color !== "255, 255, 255") {
          ctx.shadowBlur = p.layer === 1 ? 12 : 6;
          ctx.shadowColor = `rgba(${p.color}, ${p.alpha * 0.8})`;
        } else {
          ctx.shadowBlur = p.layer === 1 ? 2 : 0;
          ctx.shadowColor = "transparent";
        }

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen", opacity: 0.75 }}
    />
  );
}
