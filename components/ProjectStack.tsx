"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import TechStackItem from "./TechStackItem";
import ProjectLinks from "./ProjectLinks";

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
    transition: { staggerChildren: 0.06 }, // staggers icon → label inside each tag
  },
};

type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string;
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
      { threshold: 0.5 }
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
                animate={{ x: 0, opacity: 0.85 }}
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
      {repos.map((repo, index) => {
        const stack = stackOverrides[repo.name] ?? [];
        return(
          <section
            key={repo.name}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            data-index={index}
            id={`project-${index}`}
            className="flex flex-col min-h-svh w-full border-white border"
          >
            <div className="w-full pt-4 text-center">
              <h2 className="text-lg font-bold">{formatRepoName(repo.name)}</h2>
            </div>
            <div className='w-full flex flex-col items-center gap-2 text-center'>
              {repo.description && (
                <p className='text-xs'>{repo.description}</p>
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
            </div>
          </section>
        );
      })}
    </div>
  );
}