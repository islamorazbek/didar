"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number;
  alpha: number; speed: number;
  phase: number; gold: boolean;
}

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let stars: Star[] = [];
    let raf: number;

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function makeStars() {
      stars = Array.from({ length: 200 }, () => ({
        x:     Math.random() * canvas!.width,
        y:     Math.random() * canvas!.height,
        r:     Math.random() * 1.3 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.007 + 0.002,
        phase: Math.random() * Math.PI * 2,
        gold:  Math.random() > 0.82,
      }));
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach((s) => {
        const a = 0.08 + 0.18 * Math.abs(Math.sin(s.phase + t * s.speed * 0.001));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // On light cream bg: warm amber/tan dots at very low opacity for subtle bokeh
        ctx.fillStyle = s.gold
          ? `rgba(156,110,30,${a * 1.1})`
          : `rgba(120,85,35,${a * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    makeStars();
    window.addEventListener("resize", () => { resize(); makeStars(); });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", () => { resize(); makeStars(); });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
