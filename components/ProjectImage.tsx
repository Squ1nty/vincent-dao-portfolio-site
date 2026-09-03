"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectImage({ repoName, formattedName }: { repoName: string; formattedName: string }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);

  return (
    <div ref={imgRef} className="mt-4 w-full max-w-2xl overflow-hidden rounded-sm md:rounded-xl">
      <motion.img
        style={{ scale }}
        src={`/projects/${repoName}.png`}
        alt={`${formattedName} preview`}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}