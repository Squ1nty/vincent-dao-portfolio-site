"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import TechStackItem from "./TechStackItem";
import ProjectLinks from "./ProjectLinks";
import { setProgrammaticScroll } from "@/lib/scrollFlag";
import ProjectImage from "./ProjectImage"

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { staggerChildren: 0.06 },
  },
};

type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
};

function formatRepoName(name: string): string {
  return name
    .split("-")
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const stackOverrides: Record<string, string[]> = {
  "flight-tracking-dashboard": ["Next.js", "TypeScript", "Tailwind", "MongoDB", "NextAuth.js"],
  "rest-countries-api-with-color-theme-switcher": ["Next.js", "TypeScript", "Tailwind"],
  "product-list-cart": ["React", "Tailwind"],
  "mortgage-repayment-calculator": ["React", "Tailwind"],
  "bookmark-landing-page-master": ["JavaScript", "Tailwind"],
  "space-tourism-website": ["Javascript", "SASS", "CUBECSS"],
};

const INACTIVITY_DELAY = 2000;

export default function ProjectStack({ repos }: { repos: Repo[] }) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [passedIndices, setPassedIndices] = useState<Set<number>>(new Set());
  const [isRailExpanded, setIsRailExpanded] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const inactivityTimeoutRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-index"));

          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            setPassedIndices((prev) => new Set(prev).add(idx));
          } else if (entry.isIntersecting) {
            setPassedIndices((prev) => {
              const next = new Set(prev);
              next.delete(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [repos.length]);

  useEffect(() => {
    const resetInactivityTimer = () => {
      setIsRailExpanded(true);

      if (inactivityTimeoutRef.current) {
        window.clearTimeout(inactivityTimeoutRef.current);
      }

      inactivityTimeoutRef.current = window.setTimeout(() => {
        setIsRailExpanded(false);
      }, INACTIVITY_DELAY);
    };

    resetInactivityTimer();

    window.addEventListener("scroll", resetInactivityTimer, { passive: true });

    return () => {
      window.removeEventListener("scroll", resetInactivityTimer);
      if (inactivityTimeoutRef.current) {
        window.clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (index: number) => {
    setProgrammaticScroll(true);
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });

    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      setProgrammaticScroll(false);
    }, 1000);
  };

  return (
    <div className="relative">
      <div className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2">
        <AnimatePresence>
          {repos.map((repo, index) => {
            if (!passedIndices.has(index)) return null;

            const isOpen = isRailExpanded || hoveredIndex === index;

            return (
              <motion.button
                key={repo.name}
                onClick={() => scrollToSection(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{
                  x: isOpen ? 0 : "-70%",
                  opacity: isOpen ? 0.85 : 0.5,
                }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="cursor-pointer rounded-r-lg bg-[var(--desktopNavBg)] px-2 py-4 text-xs font-medium tracking-wide"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {formatRepoName(repo.name)}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {repos.map((repo, index) => {
        const stack = stackOverrides[repo.name] ?? [];
        return (
          <section
            key={repo.name}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            data-index={index}
            id={`project-${index}`}
            className="flex flex-col min-h-svh w-full px-4 border-white border"
          >
            <div className="w-full pt-4 pb-2 text-center">
              <h2 className="text-2xl font-bold">{formatRepoName(repo.name)}</h2>
            </div>
            <div className="w-full flex flex-col items-center gap-2 text-center text-[var(--text-muted)]">
              {repo.description && (
                <p className="text-xs">{repo.description}</p>
              )}
              {stack.length > 0 && (
                <motion.ul
                  className="flex flex-wrap justify-center gap-2"
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.6 }}
                >
                  {stack.map((tech) => (
                    <motion.li key={tech} variants={tagVariants}>
                      <TechStackItem name={tech} />
                    </motion.li>
                  ))}
                </motion.ul>
              )}
              <ProjectLinks repoUrl={repo.url} liveUrl={repo.homepageUrl} />
              <ProjectImage repoName={repo.name} formattedName={formatRepoName(repo.name)} />
            </div>
          </section>
        );
      })}
    </div>
  );
}