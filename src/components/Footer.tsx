"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 py-20 px-5 text-center overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/1.jpg" alt="" fill
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center 35%" }}
        />
        {/* Dark overlay for elegance */}
        <div className="absolute inset-0"
          style={{ background: "rgba(7,7,13,0.68)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(7,7,13,.2) 0%, rgba(7,7,13,.55) 100%)" }} />
      </div>

      <div className="divider-gold absolute top-0 left-0 right-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9 }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        {/* Top ornament */}
        <svg viewBox="0 0 120 20" fill="none" width="120" height="20" aria-hidden>
          <line x1="0"  y1="10" x2="46"  y2="10" stroke="rgba(201,164,82,.4)" strokeWidth=".9"/>
          <path d="M52 10 L57 5 L62 10 L57 15Z" fill="rgba(201,164,82,.55)"/>
          <line x1="68" y1="10" x2="120" y2="10" stroke="rgba(201,164,82,.4)" strokeWidth=".9"/>
        </svg>

        {/* Names — gold shimmer on dark bg */}
        <p className="font-serif italic font-medium text-gold-shimmer"
          style={{ fontSize: "clamp(2rem,5vw,2.8rem)" }}>
          Дидар &amp; Маржан
        </p>

        <p className="font-sans font-medium tracking-[0.5em] text-sm" style={{ color: "rgba(201,164,82,.8)" }}>
          28 · 06 · 2026
        </p>

        {/* Invitation quote */}
        <p className="font-serif italic max-w-xs leading-relaxed"
          style={{ color: "rgba(245,236,224,.5)", fontSize: "0.95rem" }}>
          Сіздермен бірге болғанымыз —<br/>біздің ең үлкен қуанышымыз
        </p>

        <motion.span
          className="text-2xl mt-1"
          style={{ color: "rgba(201,164,82,.6)" }}
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          aria-hidden
        >♡</motion.span>
      </motion.div>
    </footer>
  );
}
