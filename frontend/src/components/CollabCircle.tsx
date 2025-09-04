import React from "react";
import Section from "./ui/Section";
import { COLLABCIRCLE } from "../data/profile";
import { Mail, Facebook, Linkedin, Globe, Github } from "lucide-react";

const ICONS: Record<string, JSX.Element> = {
  Email: <Mail className="w-4 h-4" />,
  Facebook: <Facebook className="w-4 h-4" />,
  LinkedIn: <Linkedin className="w-4 h-4" />,
  GitHub: <Github className="w-4 h-4" />,
  Website: <Globe className="w-4 h-4" />,
};

export default function CollabCircle() {
  return (
    <Section id="collabcircle" title="CollabCircle">
      <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
        {COLLABCIRCLE.blurb}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {COLLABCIRCLE.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border border-neutral-300 
                       dark:border-neutral-700 hover:shadow-md transition bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
          >
            {ICONS[l.label] || null}
            {l.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
