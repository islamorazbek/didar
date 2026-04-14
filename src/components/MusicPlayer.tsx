"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying]     = useState(false);
  const [hintGone, setHintGone]   = useState(false);

  function dismissHint() { setHintGone(true); }

  async function tryAutoplay() {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.muted  = true;
      audio.volume = 0.55;
      await audio.play();
      audio.muted = false;
      setPlaying(true);
      dismissHint();
    } catch {
      const onInteract = () => {
        audio.muted = false;
        if (audio.paused) audio.play().then(() => { setPlaying(true); dismissHint(); }).catch(() => {});
        document.removeEventListener("click",      onInteract);
        document.removeEventListener("scroll",     onInteract);
        document.removeEventListener("touchstart", onInteract);
      };
      document.addEventListener("click",      onInteract, { once: true });
      document.addEventListener("scroll",     onInteract, { once: true });
      document.addEventListener("touchstart", onInteract, { once: true });
    }
  }

  useEffect(() => { tryAutoplay(); }, []); // eslint-disable-line

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    dismissHint();
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5">
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* Hint pill */}
      <AnimatePresence>
        {!hintGone && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8, scale: 0.93 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(156,110,30,0.25)", backdropFilter: "blur(14px)", boxShadow: "0 2px 12px rgba(28,18,8,.08)" }}
          >
            <motion.span
              className="font-serif italic text-gold-light text-sm"
              style={{ color: "var(--gold-lt)" }}
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 2 }}
            >
              Музыканы қосу
            </motion.span>
            {/* bouncing arrow */}
            <motion.svg
              viewBox="0 0 34 14" width="34" height="14" fill="none"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: 2 }}
            >
              <path d="M2 7 Q10 1 20 7 Q26 11 30 7" stroke="rgba(201,164,82,0.85)" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M26 4 L31 7 L26 10" stroke="rgba(201,164,82,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.82)",
          border: `1.5px solid ${playing ? "rgba(156,110,30,0.6)" : "rgba(156,110,30,0.28)"}`,
          backdropFilter: "blur(14px)",
          color: "var(--gold)",
          boxShadow: "0 2px 16px rgba(28,18,8,.1)",
        }}
        aria-label={playing ? "Музыканы тоқтату" : "Музыканы қосу"}
      >
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: "rgba(201,164,82,0.3)" }}
            animate={{ scale: [0.9, 1.7], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span key="pause" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Pause size={16} />
            </motion.span>
          ) : (
            <motion.span key="play" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
              <Play size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
