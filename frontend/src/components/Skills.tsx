// Skills.tsx
import React from "react";
import Section from "./ui/Section";
import { CATEGORIZED_SKILLS } from "../data/profile";

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-6 mt-4">
        {Object.entries(CATEGORIZED_SKILLS).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 backdrop-blur"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
