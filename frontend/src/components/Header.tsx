import React from "react";
import { PROFILE } from "../data/profile";

export default function Header() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Click name to jump to page top */}
        <a href="#top" className="font-semibold tracking-tight">
          {PROFILE.name}
        </a>

        {/* Primary nav */}
        <nav className="hidden sm:flex gap-6 text-sm font-medium">
          {[
            ["Skills", "#skills"],
            ["Projects", "#projects"],
            ["Publication", "#research"],
            ["Training", "#training"],
            ["Certifications", "#certifications"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a key={label} className="hover:opacity-80" href={href}>
              {label}
            </a>
          ))}
        </nav>

        {/* CV download */}
        <div className="flex items-center gap-3">
          <a
            className="px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs hover:shadow animate-pulse bg-purple-600 text-white hover:bg-purple-700 transition"
            href="/cv/smri29.pdf"
            download="Shah_Mohammad_Rizvi_CV.pdf"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
}
