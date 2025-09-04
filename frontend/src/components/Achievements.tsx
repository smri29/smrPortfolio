import React from "react";
import Section from "./ui/Section";
import { AWARDS, ACTIVITIES } from "../data/profile";

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-1">
        {/* Awards */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-lg mb-3">Awards</h3>
          <ul className="space-y-3">
            {AWARDS.map((a) => (
              <li
                key={a.title}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur"
              >
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {a.org} • {a.year}
                </div>
                {a.desc && (
                  <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-300">
                    {a.desc}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Activities */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Extra-curricular</h3>
          <ul className="list-disc pl-5 text-sm space-y-2 text-neutral-700 dark:text-neutral-300">
            {ACTIVITIES.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
