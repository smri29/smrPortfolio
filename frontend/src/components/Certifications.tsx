import React from "react";
import Section from "./ui/Section";
import { CERTS, DRIVE_CERTS } from "../data/profile";

type Certification = {
  title: string;
  org: string;
  date: string;
  desc?: string;
  highlight?: boolean;
  url?: string; // optional per-certificate link
};

// Parse "Jan 2025" | "January 2025" | etc.
const parseDate = (dateStr: string): Date | null => {
  const months: Record<string, number> = {
    Jan: 0, January: 0,
    Feb: 1, February: 1,
    Mar: 2, March: 2,
    Apr: 3, April: 3,
    May: 4,
    Jun: 5, June: 5,
    Jul: 6, July: 6,
    Aug: 7, August: 7,
    Sep: 8, Sept: 8, September: 8,
    Oct: 9, October: 9,
    Nov: 10, November: 10,
    Dec: 11, December: 11,
  };

  const parts = String(dateStr).split(" ");
  const monthStr = parts[0];
  const yearStr = parts[1]?.replace(/[^\d]/g, "");
  if (!monthStr || !yearStr) return null;

  const month = months[monthStr];
  const year = parseInt(yearStr, 10);
  if (month === undefined || Number.isNaN(year)) return null;

  return new Date(year, month);
};

export default function Certifications() {
  // Sort by date desc
  const sortedCerts = [...CERTS].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return (dateB?.getTime() || 0) - (dateA?.getTime() || 0);
  });

  // Ensure Kaggle sits at index 1
  const kaggleIndex = sortedCerts.findIndex((c) =>
    c.title.toLowerCase().includes("kaggle")
  );
  if (kaggleIndex > -1 && kaggleIndex !== 1) {
    const [kaggle] = sortedCerts.splice(kaggleIndex, 1);
    sortedCerts.splice(1, 0, kaggle);
  }

  return (
    <Section id="certifications" title="Certifications">
      {/* Drive CTAs (shown FIRST) */}
      <div className="mb-6 flex flex-wrap gap-2">
        {DRIVE_CERTS.all && (
          <a
            href={DRIVE_CERTS.all}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:shadow bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
          >
            View All Certificates (Drive)
          </a>
        )}
        {DRIVE_CERTS.ai && (
          <a
            href={DRIVE_CERTS.ai}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:shadow bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
          >
            AI / ML
          </a>
        )}
        {DRIVE_CERTS.research && (
          <a
            href={DRIVE_CERTS.research}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:shadow bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
          >
            Research
          </a>
        )}
        {DRIVE_CERTS.others && (
          <a
            href={DRIVE_CERTS.others}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:shadow bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
          >
            Others
          </a>
        )}
      </div>

      {/* On-page featured certs */}
      <ul className="grid gap-4 sm:grid-cols-2">
        {sortedCerts.map((cert) => (
          <li
            key={cert.title}
            className={`rounded-2xl border p-4 backdrop-blur transition-all duration-300
              ${
                cert.highlight
                  ? "border-purple-500 bg-purple-100/30 dark:border-purple-400 dark:bg-purple-900/20"
                  : "border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60"
              }`}
          >
            <div className="font-medium">
              {cert.title}
              {cert.highlight && (
                <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-300 border border-purple-300 rounded-full">
                  ML
                </span>
              )}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              {cert.org} • {cert.date}
            </div>
            {cert.desc && <p className="text-sm mt-1">{cert.desc}</p>}

            {/* Optional per-certificate link button */}
            {cert.url && (
              <div className="mt-3">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs px-3 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:shadow bg-white/70 dark:bg-neutral-900/70"
                >
                  View Certificate
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
