import React, { useMemo, useState } from "react";
import Section from "./ui/Section";
import { PROFILE, LINKS } from "../data/profile";

type SendState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [state, setState] = useState<SendState>("idle");
  const [errMsg, setErrMsg] = useState<string>("");

  // Frontend API base (empty in dev so Vite proxy handles /api)
  const API_BASE = import.meta.env.VITE_API_BASE || "";

  // Show a few primary links
  const quickLinks = useMemo(
    () =>
      LINKS.filter((l) =>
        ["LinkedIn", "GitHub", "CV / Resume"].includes(l.label)
      ),
    []
  );

  const CV_PATH = "/cv/smri29.pdf"; // public/cv/smri29.pdf

  return (
    <Section id="contact" title="Contact">
      <p className="text-neutral-600 dark:text-neutral-300">
        Prefer email?{" "}
        <a className="underline underline-offset-4" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
      </p>

      {/* Quick contact buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {quickLinks.map((l) => {
          const isCV = l.label === "CV / Resume";
          const href = isCV ? CV_PATH : l.href;
          // Open external links in a new tab; keep CV same-tab to allow download
          const target = isCV ? undefined : "_blank";
          const rel = isCV ? undefined : "noopener noreferrer";

          return (
            <a
              key={l.label}
              href={href}
              target={target}
              rel={rel}
              {...(isCV ? { download: "Shah_Mohammad_Rizvi_CV.pdf" } : {})}
              className="text-sm px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:shadow transition bg-white/70 dark:bg-neutral-900/70 backdrop-blur"
            >
              {l.label}
            </a>
          );
        })}
      </div>

      {/* Contact form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setErrMsg("");
          setState("loading");

          const form = e.currentTarget as HTMLFormElement;
          const fd = new FormData(form);

          // Honeypot (bots fill hidden field)
          if (String(fd.get("company") || "").trim().length > 0) {
            setState("success");
            form.reset();
            return;
          }

          const payload = {
            name: String(fd.get("name") || "").trim(),
            email: String(fd.get("email") || "").trim(),
            message: String(fd.get("message") || "").trim(),
          };

          if (!payload.name || !payload.email || !payload.message) {
            setState("error");
            setErrMsg("Please complete all fields.");
            return;
          }

          try {
            const res = await fetch(`${API_BASE}/api/contact`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error(await res.text());
            setState("success");
            form.reset();
          } catch (err: any) {
            console.error(err);
            setState("error");
            setErrMsg(
              typeof err?.message === "string" && err.message.length < 200
                ? err.message
                : "Sorry, something went wrong. Please try again later."
            );
          }
        }}
        className="mt-6 grid gap-3 max-w-xl"
      >
        {/* Honeypot field (hidden from users) */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <label className="text-sm font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Your name"
          required
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/40"
        />

        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/40"
        />

        <label className="text-sm font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me a bit about your project..."
          required
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-400/40"
        />

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={state === "loading"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === "loading" ? "Sending…" : "Send"}
          </button>

          {state === "success" && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Thanks! Your message has been sent.
            </span>
          )}
          {state === "error" && (
            <span className="text-sm text-red-600 dark:text-red-400">{errMsg}</span>
          )}
        </div>
      </form>
    </Section>
  );
}
