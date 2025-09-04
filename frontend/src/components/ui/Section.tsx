import React from "react";
import { motion, type Variants, type Transition } from "framer-motion";

// Use a cubic-bezier tuple (valid Easing type) instead of "easeOut"
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

// Typed variants so TS is happy
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: EASE,
    },
  }),
};

type SectionProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
};

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="py-12 sm:py-20 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}
// This component defines a Section with a title and children content.