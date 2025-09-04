import React from "react";
import Section from "./ui/Section";

type Experience = {
  title: string;
  orgName: string;
  orgLink: string;
  employment: string;
  start: string; // "YYYY-MM"
  location: string;
};

const experiences: Experience[] = [
  {
    title: "President Founder & Researcher",
    orgName: "CollabCircle Official",
    orgLink: "https://www.linkedin.com/company/collabcircle-official/",
    employment: " · Full-time",
    start: "2025-06",
    location: "Bangladesh · Hybrid (Offline+Online)",
  },
  {
    title: "Student Researcher",
    orgName: "IUBAT—International University of Business Agriculture and Technology",
    orgLink: "https://www.facebook.com/IUBAT",
    employment: " · Self-employed",
    start: "2024-10",
    location: "Hybrid (Offline+Online)",
  },
];

function formatDuration(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const y = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const m = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";

  return [y, m].filter(Boolean).join(" ") || "Less than a month";
}

export default function WorkExperience() {
  return (
    <Section id="experience" title="Work Experience">
      <ul className="space-y-4">
        {experiences.map((exp, i) => {
          const duration = formatDuration(exp.start);
          const startDate = new Date(exp.start).toLocaleString("default", {
            month: "short",
            year: "numeric",
          });

          return (
            <li
              key={i}
              className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/40 backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                {exp.title}
              </h3>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                <a
                  href={exp.orgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-2 font-medium text-blue-600 dark:text-blue-400"
                >
                  {exp.orgName}
                </a>
                {exp.employment}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {startDate} – Present · {duration}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                {exp.location}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
