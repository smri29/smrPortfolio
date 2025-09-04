import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import { PROFILE, LANGUAGES, HOBBIES } from "../data/profile";

/** Typewriter-style reveal: character-by-character */
function Typewriter({ text }: { text: string }) {
  const chars = Array.from(text);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.01 },
    },
  };

  const char = {
    hidden: { opacity: 0, y: 2 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
      className="mt-1 text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-3xl"
      aria-label={text}
    >
      {chars.map((c, i) => (
        <motion.span key={i} variants={char}>
          {c}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function About() {
  const aboutText =
    "I’m Shah Mohammad Rizvi-CSE student at IUBAT, ML engineer, and researcher. I build practical, reproducible ML systems across computer vision and healthcare, and ship full-stack (MERN) apps end-to-end. I love clean data pipelines, rigorous evaluation, and turning research into useful products. I’m also exploring CollabCircle & i29- two small initiatives to conduct meaningful research & create technology that inspires real change.";

  const chipVariants = {
    hidden: { opacity: 0, y: 6 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * i, duration: 0.25 },
    }),
  };

  return (
    <Section id="about" title="About">
      {/* Intro with typewriter animation */}
      <Typewriter text={aboutText} />

      {/* Quick facts from PROFILE.basics */}
      {Array.isArray(PROFILE?.basics) && PROFILE.basics.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {PROFILE.basics.map((b, i) => (
            <motion.span
              key={b.label}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={chipVariants}
              className="text-xs sm:text-sm px-3 py-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur"
              title={b.label}
            >
              <strong className="mr-1">{b.label}:</strong>
              {b.value}
            </motion.span>
          ))}
        </div>
      )}

      {/* Languages & Hobbies */}
      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-900/80 dark:text-neutral-100/90">
            Languages
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {LANGUAGES.map((l, i) => (
              <motion.span
                key={l.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={chipVariants}
                className="text-xs sm:text-sm px-2.5 py-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60"
              >
                {l.name} - {l.level}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-900/80 dark:text-neutral-100/90">
            Hobbies
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {HOBBIES.map((h, i) => (
              <motion.span
                key={h}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={chipVariants}
                className="text-xs sm:text-sm px-2.5 py-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60"
              >
                {h}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
