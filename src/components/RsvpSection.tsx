"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Loader2, Heart, UserCheck, UserX,
  Users, Phone, MessageSquare,
} from "lucide-react";

interface FormValues {
  name:      string;
  attending: "yes" | "no";
  guests:    string;
  phone:     string;
  message:   string;
}

/* ── Reusable field wrapper with left icon ────── */
function FieldWrap({
  icon,
  children,
  alignTop,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  alignTop?: boolean;
}) {
  return (
    <div
      className="flex rounded-[10px] transition-all focus-within:shadow-[0_0_0_3px_rgba(156,110,30,.1)]"
      style={{
        background: "rgba(255,255,255,.9)",
        border: "1.5px solid rgba(156,110,30,.22)",
        transition: "border-color .25s",
      }}
      onFocus={e => (e.currentTarget.style.borderColor = "rgba(156,110,30,.55)")}
      onBlur={e  => (e.currentTarget.style.borderColor = "rgba(156,110,30,.22)")}
    >
      <span
        className={`flex-shrink-0 flex items-${alignTop ? "start pt-[17px]" : "center"} pl-4 pr-3`}
        style={{ color: "var(--gold-lt)" }}
      >
        {icon}
      </span>
      {children}
    </div>
  );
}

const inputCls =
  "flex-1 bg-transparent outline-none border-none py-[15px] pr-4 font-sans text-base";
const inputStyle = { color: "var(--text)", caretColor: "var(--gold)" } as const;

export default function RsvpSection() {
  const [status, setStatus]               = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");

  const {
    register, handleSubmit, watch,
    formState: { errors }, reset,
  } = useForm<FormValues>({ defaultValues: { attending: "yes", guests: "1" } });

  const attending = watch("attending");

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      data.name,
          attending: data.attending === "yes",
          guests:    Number(data.guests),
          phone:     data.phone,
          message:   data.message,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmittedName(data.name.split(" ")[0]);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative z-10 py-28 px-5 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="divider-gold absolute top-0 left-0 right-0" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(156,110,30,.06) 0%,transparent 65%)" }}
      />

      <div className="max-w-lg mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-[0.78rem] tracking-[0.45em] uppercase mb-4 font-semibold"
            style={{ color: "var(--gold)" }}>
            Растау
          </p>
          <h2 className="font-serif italic font-medium mb-3"
            style={{ fontSize: "clamp(2.2rem,5vw,3.2rem)", color: "var(--text)" }}>
            Келесіздер ме?
          </h2>
          <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
            Тойға қатысу мүмкіндігіңіз туралы хабарласаңыз,<br />
            біз үшін өте қуанышты болар еді
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ── SUCCESS ── */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-10 text-center"
            >
              <motion.div
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "rgba(156,110,30,.12)", border: "1px solid rgba(156,110,30,.35)" }}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Check size={28} style={{ color: "var(--gold)" }} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <p className="font-serif italic font-medium text-2xl mb-2" style={{ color: "var(--text)" }}>
                  Рақмет, {submittedName}!
                </p>
                <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                  Жауабыңыз қабылданды.<br />
                  Сізді тойымызда көруді асыға күтеміз!
                </p>
                <motion.div className="flex justify-center mt-4">
                  <motion.span
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ color: "var(--gold)", fontSize: "1.5rem" }}
                  >♡</motion.span>
                </motion.div>
              </motion.div>

              <motion.button
                onClick={() => setStatus("idle")}
                className="mt-6 font-sans text-sm tracking-widest uppercase font-medium"
                style={{ color: "var(--text-3)" }}
                whileHover={{ color: "var(--gold)" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              >
                Тағы жіберу
              </motion.button>
            </motion.div>
          )}

          {/* ── FORM ── */}
          {status !== "success" && (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-7 sm:p-9 flex flex-col gap-6"
            >

              {/* ── Аты-жөні ── */}
              <div>
                <label className="block font-sans text-[0.75rem] tracking-[0.28em] uppercase mb-2.5 font-semibold"
                  style={{ color: "var(--gold)" }}>
                  Аты-жөні *
                </label>
                <FieldWrap icon={<Users size={16} />}>
                  <input
                    {...register("name", { required: "Аты-жөніңізді енгізіңіз" })}
                    placeholder="Толық аты-жөні"
                    className={inputCls}
                    style={inputStyle}
                  />
                </FieldWrap>
                {errors.name && (
                  <p className="text-sm mt-1.5 font-sans" style={{ color: "#b94040" }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* ── Келесіз бе? ── */}
              <div>
                <label className="block font-sans text-[0.75rem] tracking-[0.28em] uppercase mb-3 font-semibold"
                  style={{ color: "var(--gold)" }}>
                  Келесіз бе? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["yes", "no"] as const).map((val) => {
                    const active = attending === val;
                    const Icon   = val === "yes" ? UserCheck : UserX;
                    const label  = val === "yes" ? "Иә, келемін" : "Жоқ, кел алмаймын";
                    return (
                      <label key={val} className="cursor-pointer">
                        <input type="radio" value={val} {...register("attending")} className="sr-only" />
                        <motion.div
                          animate={{
                            background:  active ? "rgba(156,110,30,.1)" : "rgba(255,255,255,.55)",
                            borderColor: active ? "rgba(156,110,30,.6)" : "rgba(156,110,30,.2)",
                          }}
                          transition={{ duration: 0.22 }}
                          className="rounded-xl p-4 flex flex-col items-center gap-2.5 border"
                        >
                          <Icon size={22} strokeWidth={1.5}
                            style={{ color: active ? "var(--gold)" : "var(--text-3)" }} />
                          <span className="font-sans text-sm font-medium text-center leading-tight"
                            style={{ color: active ? "var(--text)" : "var(--text-3)" }}>
                            {label}
                          </span>
                        </motion.div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ── Қонақтар саны ── */}
              <AnimatePresence>
                {attending === "yes" && (
                  <motion.div
                    key="guests"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <label className="block font-sans text-[0.75rem] tracking-[0.28em] uppercase mb-2.5 font-semibold"
                      style={{ color: "var(--gold)" }}>
                      Қонақтар саны
                    </label>
                    <select {...register("guests")} className="wedding-input">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} адам</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Телефон ── */}
              <div>
                <label className="block font-sans text-[0.75rem] tracking-[0.28em] uppercase mb-2.5 font-semibold"
                  style={{ color: "var(--gold)" }}>
                  Телефон нөмірі
                </label>
                <FieldWrap icon={<Phone size={16} />}>
                  <input
                    {...register("phone")}
                    placeholder="+7 (___) ___ __ __"
                    type="tel"
                    className={inputCls}
                    style={inputStyle}
                  />
                </FieldWrap>
              </div>

              {/* ── Тілек ── */}
              <div>
                <label className="block font-sans text-[0.75rem] tracking-[0.28em] uppercase mb-2.5 font-semibold"
                  style={{ color: "var(--gold)" }}>
                  Тілек / хабарлама
                </label>
                <FieldWrap icon={<MessageSquare size={16} />} alignTop>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Жас жұпқа тілектеріңіз немесе ескертпелер…"
                    className={`${inputCls} resize-none`}
                    style={inputStyle}
                  />
                </FieldWrap>
              </div>

              {status === "error" && (
                <p className="text-sm font-sans text-center" style={{ color: "#b94040" }}>
                  Қате орын алды. Қайта көріңіз.
                </p>
              )}

              {/* ── Жіберу ── */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="relative overflow-hidden rounded-xl py-4 font-sans text-sm font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: "var(--gold)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(156,110,30,.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 6px 28px rgba(156,110,30,.45)" }}
                whileTap={{ scale: 0.97 }}
              >
                {status === "loading"
                  ? <><Loader2 size={15} className="animate-spin" /> Жіберілуде…</>
                  : <><Heart size={15} /> Жіберу</>
                }
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
