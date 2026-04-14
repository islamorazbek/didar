"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Sparkles, UtensilsCrossed, Music } from "lucide-react";

const events = [
  { time: "17:30", label: "Қонақтар жиналуы", Icon: Users,           note: "Кіреберіс залда кездесу" },
  { time: "18:00", label: "Той салтанаты",     Icon: Sparkles,        note: "Ресми рәсім басталады"  },
  { time: "19:30", label: "Кешкі ас",          Icon: UtensilsCrossed, note: "Дастархан басында бірге" },
  { time: "21:00", label: "Би кеші",           Icon: Music,           note: "Кеш таңға дейін жалғасады" },
];

export default function ProgramSection() {
  return (
    <section className="relative z-10 py-28 px-5 overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/2.jpg" alt="" fill
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center 20%" }}
        />
        {/* Cream overlay — warm parchment feel */}
        <div className="absolute inset-0"
          style={{ background: "rgba(253,248,242,0.84)" }} />
        {/* Subtle dark vignette edges */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 45%, rgba(220,205,180,.5) 100%)" }} />
      </div>

      <div className="divider-gold absolute top-0 left-0 right-0" />

      <motion.p
        className="relative z-10 text-center font-sans text-[0.78rem] tracking-[0.45em] uppercase mb-4 font-semibold"
        style={{ color: "var(--gold)" }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
      >
        Той бағдарламасы
      </motion.p>

      <motion.h2
        className="relative z-10 text-center font-serif italic font-medium mb-16"
        style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", color: "var(--text)" }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
      >
        Күн тәртібі
      </motion.h2>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col gap-4">
        {events.map((ev, i) => (
          <motion.div
            key={ev.time}
            className="rounded-2xl p-5 sm:p-6 flex items-center gap-5 group relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(201,164,82,.2)",
              boxShadow: "0 4px 24px rgba(28,18,8,.06)",
            }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 12px 40px rgba(28,18,8,.12)",
              background: "rgba(255,255,255,0.88)",
            }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%,rgba(156,110,30,.06),transparent)" }} />

            {/* Left accent bar */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "var(--gold)" }} />

            {/* Time badge */}
            <div
              className="flex-shrink-0 rounded-xl flex items-center justify-center px-4 py-3"
              style={{ background: "rgba(156,110,30,.08)", border: "1px solid rgba(156,110,30,.22)", minWidth: 72 }}
            >
              <span className="font-serif font-semibold text-xl" style={{ color: "var(--gold)" }}>
                {ev.time}
              </span>
            </div>

            {/* Icon + text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <ev.Icon size={15} strokeWidth={1.5} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <p className="font-sans font-semibold text-base truncate" style={{ color: "var(--text)" }}>
                  {ev.label}
                </p>
              </div>
              <p className="font-serif italic text-base" style={{ color: "var(--text-2)" }}>
                {ev.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
