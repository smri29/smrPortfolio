import React from "react";
import Section from "./ui/Section";
import { TRAINING, SEMINARS, CERTS } from "../data/profile";

export default function TrainingSeminars() {
  return (
    <Section id="training" title="Training & Seminars">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="font-semibold">Training & Workshops</h3>
          <ul className="mt-3 space-y-3">
            {TRAINING.map((t) => (
              <li key={t.title} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{t.date}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Seminars</h3>
          <ul className="mt-3 space-y-3">
            {SEMINARS.map((s) => (
              <li key={s.title} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{s.date}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
