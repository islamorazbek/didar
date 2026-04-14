"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-06-28T18:00:00+06:00").getTime();

function pad(n: number) { return String(n).padStart(2, "0"); }

function useCountdown() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => {
    function tick() {
      const diff = WEDDING_DATE - Date.now();
      if (diff <= 0) { setTime({ d:"00", h:"00", m:"00", s:"00" }); return; }
      setTime({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000)  / 60000)),
        s: pad(Math.floor((diff % 60000)    / 1000)),
      });
    }
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, []);
  return time;
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
const fadeUp  = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22,1,0.36,1] } },
};

function CdBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px]">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
        className="font-serif leading-none"
        style={{
          fontSize: "clamp(2.8rem,8vw,5.2rem)",
          fontWeight: 400,
          background: "linear-gradient(180deg,#fff 0%,rgba(226,200,122,.85) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </motion.span>
      <span className="font-sans text-xs tracking-[0.3em] uppercase mt-1.5" style={{ color: "rgba(226,200,122,.75)", fontWeight: 400 }}>
        {label}
      </span>
    </div>
  );
}

export default function HeroSection() {
  const time = useCountdown();

  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">

      {/* ── Video background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "35% center", filter: "brightness(0.48) saturate(0.8)" }}
        >
          <source src="/2.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 50% 40%, transparent 10%, rgba(7,7,13,.45) 60%)," +
              "linear-gradient(to bottom, rgba(7,7,13,.2) 0%, rgba(7,7,13,.05) 25%, rgba(7,7,13,.65) 75%, rgba(7,7,13,.97) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto text-center px-5 pb-14 flex flex-col items-center gap-5"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p variants={fadeUp}
          className="font-sans tracking-[0.5em] uppercase"
          style={{ fontSize: ".72rem", color: "rgba(226,200,122,.9)", fontWeight: 400 }}>
          Сіздерді тойға шақырамыз
        </motion.p>

        {/* Names */}
        <motion.h1 variants={fadeUp}
          className="font-serif italic leading-none flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4"
          style={{ fontSize: "clamp(3.6rem,11vw,8rem)", fontWeight: 400 }}>
          <span className="text-gold-shimmer">Дидар</span>

          {/* & ornament — smaller on mobile */}
          <span className="relative flex items-center justify-center"
            style={{ width: "0.55em", height: "0.55em" }}>
            <motion.svg className="absolute w-full h-full" viewBox="0 0 80 80" fill="none"
              animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
              <circle cx="40" cy="40" r="35" stroke="rgba(201,164,82,.22)" strokeWidth=".7"/>
              <circle cx="40" cy="40" r="25" stroke="rgba(201,164,82,.12)" strokeWidth=".5"/>
            </motion.svg>
            <motion.span
              className="font-serif relative z-10"
              style={{ fontSize: ".55em", fontWeight: 400, color: "var(--gold-lt)", WebkitTextFillColor: "var(--gold-lt)" }}
              animate={{ y: [0,-5,0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >&amp;</motion.span>
          </span>

          <span className="text-gold-shimmer">Маржан</span>
        </motion.h1>

        {/* Divider */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 w-40">
          <span className="flex-1 h-px" style={{ background: "linear-gradient(to right,transparent,rgba(201,164,82,.4),transparent)" }}/>
          <span className="w-2 h-2 rotate-45 flex-shrink-0" style={{ background: "var(--gold-lt)", boxShadow: "0 0 8px rgba(201,164,82,.6)" }}/>
          <span className="flex-1 h-px" style={{ background: "linear-gradient(to right,transparent,rgba(201,164,82,.4),transparent)" }}/>
        </motion.div>

        {/* Date */}
        <motion.p variants={fadeUp}
          className="font-sans tracking-[0.55em] uppercase"
          style={{ fontSize: ".75rem", color: "rgba(226,200,122,.85)", fontWeight: 400 }}>
          28 МАУСЫМ · 2026
        </motion.p>

        {/* Invite text */}
        <motion.p variants={fadeUp}
          className="font-serif italic leading-loose max-w-md"
          style={{ fontSize: "clamp(1rem,2.2vw,1.2rem)", fontWeight: 400, color: "rgba(245,236,224,.65)" }}>
          Бізбен бірге осы бақытты күнді бөлісіңіз —<br/>
          махаббатқа, қуанышқа және<br/>ұмытылмас естеліктерге толы
        </motion.p>

        {/* Countdown pill */}
        <motion.div variants={fadeUp}
          className="flex items-start gap-4 sm:gap-7 px-8 py-5 rounded-2xl mt-1"
          style={{
            background: "rgba(7,7,13,.55)",
            border: "1px solid rgba(201,164,82,.2)",
            backdropFilter: "blur(16px)",
          }}
        >
          <CdBlock value={time.d} label="күн"    />
          <span className="font-serif pb-4 opacity-30 text-4xl text-white">·</span>
          <CdBlock value={time.h} label="сағат"  />
          <span className="font-serif pb-4 opacity-30 text-4xl text-white">·</span>
          <CdBlock value={time.m} label="минут"  />
          <span className="font-serif pb-4 opacity-30 text-4xl text-white">·</span>
          <CdBlock value={time.s} label="секунд" />
        </motion.div>

        {/* Scroll cue */}
        <motion.a href="#details" variants={fadeUp}
          className="flex flex-col items-center gap-2 mt-1 group cursor-pointer"
          style={{ color: "rgba(245,236,224,.3)" }}
          whileHover={{ color: "rgba(226,200,122,.8)" }}
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase" style={{ fontWeight: 400 }}>
            Төмен қарай
          </span>
          <motion.span
            className="block w-px h-9 origin-top"
            style={{ background: "linear-gradient(to bottom,currentColor,transparent)" }}
            animate={{ scaleY: [1,1.3,1], opacity: [0.3,1,0.3] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
