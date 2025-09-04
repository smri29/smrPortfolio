import React from "react";
import { PROFILE } from "../data/profile";

export default function Footer({ year, initials }: { year: number; initials: string }) {
  return (
    <footer className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
        <span>© {year} {PROFILE.name}</span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 font-semibold">
            {initials}
          </span>
          From Bangladesh to breaktrhoughs...
        </span>
      </div>
    </footer>
  );
}
