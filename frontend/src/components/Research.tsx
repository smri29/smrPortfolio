import React from "react";
import Section from "./ui/Section";
import { PAPERS } from "../data/profile";

export default function Research() {
  const conferencePapers = PAPERS.filter(p => p.type === "Conference");
  const journalPapers = PAPERS.filter(p => p.type === "Journal");

  const PaperItem = ({
    title,
    venue,
    link,
    color,
  }: {
    title: string;
    venue: string;
    link: string;
    color: string;
  }) => (
    <li className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur">
      <div className="text-sm text-neutral-700 dark:text-neutral-300">{title}</div>
      <div className={`text-xs mt-1 font-medium ${color}`}>
        {venue}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
      >
        View Publication
      </a>
    </li>
  );

  return (
    <Section id="research" title="Publications">
      {conferencePapers.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Conference Publications</h3>
          <ul className="space-y-3">
            {conferencePapers.map((paper, idx) => (
              <PaperItem key={idx} {...paper} color="text-purple-600 dark:text-purple-400" />
            ))}
          </ul>
        </div>
      )}

      {journalPapers.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Journal Publications</h3>
          <ul className="space-y-3">
            {journalPapers.map((paper, idx) => (
              <PaperItem key={idx} {...paper} color="text-emerald-600 dark:text-emerald-400" />
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
