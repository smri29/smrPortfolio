import React from "react";
import { motion } from "framer-motion";
import { PROFILE, LINKS } from "../data/profile";
import { fadeUp } from "./ui/Section";

const avatar = PROFILE.avatar || "/smr.JPG";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[70vh]">
      {/* 🎨 Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-purple-500/25 to-teal-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-fuchsia-500/25 to-cyan-400/25 blur-3xl" />
      </div>

      {/* 🖼 Avatar in top-right corner */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.8 }}
  className="absolute top-6 right-6 sm:top-10 sm:right-10 z-10"
>
  <a
    href="https://www.linkedin.com/in/smri29/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit LinkedIn profile"
  >
    <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-purple-500 animate-pulse shadow-xl hover:scale-105 transition-transform duration-300">
      <img
        src={avatar}
        alt={PROFILE.name}
        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-neutral-900"
      />
    </div>
  </a>
</motion.div>

      {/* 🔤 Text Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">{PROFILE.name}</h1>
          <div className="mt-1 text-xl sm:text-2xl font-medium">{PROFILE.role}</div>
          <p className="mt-1 text-sm text-neutral-500">{PROFILE.headline}</p>

<p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-2xl">
  {PROFILE.blurb}
</p>


          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {PROFILE.basics.map((b) => (
              <span
                key={b.label}
                className="px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/30 dark:bg-neutral-900/30 backdrop-blur"
              >
                <strong>{b.label}:</strong> {b.value}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {LINKS.map((l, i) => (
              <motion.a
                custom={i}
                variants={fadeUp}
                key={l.label}
                href={l.href}
                className="px-3 py-1.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-sm hover:shadow bg-white/60 dark:bg-neutral-900/60 backdrop-blur"
              >
                {l.label}
              </motion.a>
            ))}
          </div>

          <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">📍 {PROFILE.location}</div>
        </motion.div>
      </div>
    </section>
  );
}
