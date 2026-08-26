"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Repo = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
};

function formatRepoName(name: string): string {
  return name
    .split("-")
    .filter(Boolean)
    .slice(0, 5)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ProjectStack({ repos }: { repos: Repo[] }) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [passedIndices, setPassedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-index"));

          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            // scrolled past it (downward) — show its tab
            setPassedIndices((prev) => new Set(prev).add(idx));
          } else if (entry.isIntersecting) {
            // back in view — retract its tab
            setPassedIndices((prev) => {
              const next = new Set(prev);
              next.delete(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [repos.length]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Side tab rail — fixed to viewport, builds up as you scroll */}
      <div className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2">
        <AnimatePresence>
          {repos.map((repo, index) =>
            passedIndices.has(index) ? (
              <motion.button
                key={repo.name}
                onClick={() => scrollToSection(index)}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="cursor-pointer rounded-r-lg bg-[var(--desktopNavBg)] px-2 py-4 text-xs font-medium tracking-wide"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {formatRepoName(repo.name)}
              </motion.button>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Full-width project sections, offset from the left gutter */}
      {repos.map((repo, index) => (
        <section
          key={repo.name}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          data-index={index}
          id={`project-${index}`}
          className="flex min-h-svh w-full items-center pl-[20%] md:pl-[10%] pr-3"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold">{formatRepoName(repo.name)}</h2>
          </div>
        </section>
      ))}
    </div>
  );
}