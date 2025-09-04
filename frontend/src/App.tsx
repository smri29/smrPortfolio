import React, { useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkExperience from "./components/WorkExperience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import TrainingSeminars from "./components/TrainingSeminars";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Achievements from "./components/Achievements";
import CollabCircle from "./components/CollabCircle";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { PROFILE } from "./data/profile";

// Utility for conditional class names
function cx(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

export default function App() {
  const year = new Date().getFullYear();
  const initials = useMemo(
    () => PROFILE.name.split(" ").map((n) => n[0]).slice(0, 2).join(""),
    []
  );

  return (
    // Force dark theme by always applying "dark"
    <div className="flex flex-col min-h-screen dark">
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-950" />
        <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-500/20 to-teal-400/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-cyan-400/20 blur-3xl" />
      </div>

      {/* Main content with #top anchor */}
      <main id="top" className="flex-grow text-neutral-100 transition-colors">
        <Header />
        <Hero />
        <About />
        <WorkExperience />
        <Projects />
        <TrainingSeminars />
        <Research />
        <Skills />
        <Certifications />
        <Achievements />
        <Education />
        <CollabCircle />
        <Contact />
      </main>

      {/* Footer always sticks to bottom */}
      <Footer year={year} initials={initials} />
    </div>
  );
}
