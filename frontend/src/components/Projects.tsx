import React from "react";
import Section from "./ui/Section";
import { FALLBACK_PROJECTS } from "../data/profile";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FALLBACK_PROJECTS.map((p: any, i: number) => (
          <article
            key={p.title + (p._idx ?? "")}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/60 dark:bg-neutral-900/60 backdrop-blur"
          >
            {/* Image */}
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={p.image || "/projects/default.png"}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  {p.summary}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {(p.tags || []).map((t: string) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-xl border border-neutral-200 dark:border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {(p.links || []).map((l: any) => {
                  const isGitHub = l.label?.toLowerCase().includes("github");
                  const isLive = l.label?.toLowerCase().includes("live");

                  return (
                    <a
                      key={l.label || l}
                      href={l.href || l}
                      className={`inline-block px-3 py-1 rounded-full transition font-medium ${
                        isGitHub
                          ? "bg-neutral-800 text-white hover:bg-neutral-900"
                          : isLive
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label || "Link"}
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
