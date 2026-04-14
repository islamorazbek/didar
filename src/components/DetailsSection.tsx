"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cards = [
  { Icon: Calendar, label: "Күні",   title: "28 маусым 2026", sub: "Жексенбі" },
  { Icon: Clock,    label: "Уақыты", title: "18:00",           sub: "Қонақтар 17:30-дан" },
  {
    Icon: MapPin, label: "Орны", title: "Hanshaiym Hall",
    sub:  "Райымбек батыр көшесі, 145а,\nБесағаш",
    link: "https://2gis.kz/almaty/geo/70000001041557578",
  },
];

export default function DetailsSection() {
  return (
    <section id="details" className="relative z-10 py-24 px-5 overflow-hidden">

      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/4.jpg" alt="" fill
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center 40%" }}
        />
        {/* Warm light wash — lets a hint of sky and hands show through */}
        <div className="absolute inset-0"
          style={{ background: "rgba(245,236,224,0.82)" }} />
        {/* Subtle vignette to ground cards */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(235,220,195,.4) 100%)" }} />
      </div>

      <div className="divider-gold absolute top-0 left-0 right-0" />

      <motion.p
        className="relative z-10 text-center font-sans text-[0.78rem] tracking-[0.45em] uppercase mb-4 font-semibold"
        style={{ color: "var(--gold)" }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
      >
        Той туралы
      </motion.p>

      <motion.h2
        className="relative z-10 text-center font-serif italic font-medium mb-14"
        style={{ fontSize: "clamp(2rem,4.5vw,3rem)", color: "var(--text)" }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
      >
        Мерекелі күн
      </motion.h2>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: "0 28px 56px rgba(28,18,8,.15), 0 1px 0 rgba(255,255,255,.9) inset" }}
            className="rounded-2xl p-8 flex flex-col items-center text-center group cursor-default relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(201,164,82,.22)",
              boxShadow: "0 8px 32px rgba(28,18,8,.08)",
            }}
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(156,110,30,.07),transparent)" }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-10 group-hover:w-20 transition-all duration-500 rounded-full"
              style={{ background: "var(--gold)" }} />

            <div className="mb-4 relative z-10 p-3 rounded-xl"
              style={{ background: "rgba(156,110,30,.08)", color: "var(--gold)" }}>
              <card.Icon size={26} strokeWidth={1.3} />
            </div>
            <p className="font-sans text-[0.72rem] tracking-[0.38em] uppercase mb-2.5 relative z-10 font-semibold"
              style={{ color: "var(--gold)" }}>
              {card.label}
            </p>
            {card.link ? (
              <a
                href={card.link} target="_blank" rel="noopener"
                className="font-serif text-xl font-medium relative z-10 transition-colors duration-200"
                style={{ color: "var(--text)", borderBottom: "1px solid rgba(156,110,30,.35)", paddingBottom: 2 }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
              >
                {card.title}
              </a>
            ) : (
              <p className="font-serif text-xl font-medium relative z-10" style={{ color: "var(--text)" }}>
                {card.title}
              </p>
            )}
            <p className="font-sans text-sm mt-2.5 leading-relaxed relative z-10 whitespace-pre-line"
              style={{ color: "var(--text-2)" }}>
              {card.sub}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex justify-center mt-10"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.45 }}
      >
        <motion.a
          href="https://2gis.kz/almaty/geo/70000001041557578"
          target="_blank" rel="noopener"
          className="relative flex items-center gap-2.5 px-8 py-3.5 text-[0.75rem] font-sans font-semibold tracking-[0.2em] uppercase overflow-hidden rounded-sm"
          style={{
            border: "1px solid rgba(156,110,30,.5)",
            color: "var(--gold)",
            background: "rgba(255,255,255,.55)",
            backdropFilter: "blur(12px)",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <MapPin size={15} />
          <span>Картада ашу</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
