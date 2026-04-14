"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

export default function InviteSection() {
  return (
    <section className="relative z-10 min-h-[92vh] flex items-center justify-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0">
        <Image
          src="/3.jpg" alt="" fill priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center 25%" }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{
          background:
            "linear-gradient(to bottom, rgba(7,7,13,.42) 0%, rgba(7,7,13,.62) 60%, rgba(7,7,13,.82) 100%)",
        }} />
        {/* Warm vignette */}
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(7,7,13,.5) 100%)",
        }} />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 max-w-xl mx-auto text-center px-7 py-24"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Eyebrow */}
        <motion.p variants={fadeUp}
          className="font-sans text-[0.72rem] tracking-[0.55em] uppercase mb-10 font-medium"
          style={{ color: "rgba(201,164,82,.85)" }}>
          Шақыру сөзі
        </motion.p>

        {/* Top ornament */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px flex-1 max-w-[72px]"
            style={{ background: "linear-gradient(to right, transparent, rgba(201,164,82,.5))" }} />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <rect x="5" y="5" width="10" height="10" transform="rotate(45 10 10)"
              stroke="rgba(201,164,82,.7)" strokeWidth=".8" fill="none"/>
            <rect x="7.5" y="7.5" width="5" height="5" transform="rotate(45 10 10)"
              fill="rgba(201,164,82,.4)"/>
          </svg>
          <span className="h-px flex-1 max-w-[72px]"
            style={{ background: "linear-gradient(to left, transparent, rgba(201,164,82,.5))" }} />
        </motion.div>

        {/* Heading */}
        <motion.h2 variants={fadeUp}
          className="font-serif italic font-medium leading-[1.15] mb-10"
          style={{ fontSize: "clamp(2.6rem,7vw,4.4rem)", color: "#fff" }}>
          Бізбен бірге<br />болыңыз
        </motion.h2>

        {/* Divider with heart */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px w-16" style={{ background: "rgba(201,164,82,.38)" }} />
          <motion.span
            className="font-serif text-2xl"
            style={{ color: "rgba(201,164,82,.8)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >♡</motion.span>
          <span className="h-px w-16" style={{ background: "rgba(201,164,82,.38)" }} />
        </motion.div>

        {/* Primary body */}
        <motion.p variants={fadeUp}
          className="font-serif italic leading-[2] mb-8"
          style={{ fontSize: "clamp(1.05rem,2.5vw,1.25rem)", color: "rgba(245,236,224,.85)" }}>
          Екі жүрек, бір тағдыр —<br />
          осы қуанышты күнді<br />
          сіздермен бірге атап өтуді<br />
          арман еттік.
        </motion.p>

        {/* Secondary body */}
        <motion.p variants={fadeUp}
          className="font-serif italic leading-[2]"
          style={{ fontSize: "clamp(1rem,2.3vw,1.15rem)", color: "rgba(245,236,224,.58)" }}>
          Сіздердің болуыңыз —<br />
          бізге берілген ең үлкен сый.
        </motion.p>

        {/* Bottom signature */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-5 mt-14">
          <span className="h-px flex-1 max-w-[60px]"
            style={{ background: "rgba(201,164,82,.25)" }} />
          <span className="font-serif italic text-lg"
            style={{ color: "rgba(201,164,82,.75)" }}>
            Дидар &amp; Маржан
          </span>
          <span className="h-px flex-1 max-w-[60px]"
            style={{ background: "rgba(201,164,82,.25)" }} />
        </motion.div>

        <motion.p variants={fadeUp}
          className="font-sans text-[0.7rem] tracking-[0.4em] uppercase mt-4 font-medium"
          style={{ color: "rgba(201,164,82,.45)" }}>
          28 · 06 · 2026
        </motion.p>
      </motion.div>
    </section>
  );
}
