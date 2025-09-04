import React from "react";
import Section from "./ui/Section";
import { EDUCATION } from "../data/profile";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <ol className="mt-2 space-y-5">
        {EDUCATION.map((e) => (
          <li key={e.degree} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
            <div className="font-semibold">{e.degree}</div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">{e.institution} • {e.year}</div>
            <div className="text-sm mt-1">{e.result}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
