import {
  NextjsIcon,
  TypeScriptIcon,
  TailwindIcon,
  MongoDBIcon,
  NextAuthIcon,
  ReactIcon,
  JavaScriptIcon,
  SassIcon,
  CubeCssIcon,
} from "@/components/Icons"; // adjust path to wherever your icons.tsx actually lives

import type { ComponentType } from "react";
import { motion, type Variants } from 'framer-motion';

const wrapperVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }, // delay between icon and label specifically
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

const labelVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

type IconProps = { className?: string };

const techIconMap: Record<string, ComponentType<IconProps>> = {
  "Next.js": NextjsIcon,
  TypeScript: TypeScriptIcon,
  Tailwind: TailwindIcon,
  MongoDB: MongoDBIcon,
  "NextAuth.js": NextAuthIcon,
  React: ReactIcon,
  JavaScript: JavaScriptIcon,
  SASS: SassIcon,
  CUBECSS: CubeCssIcon,
};

export default function TechStackItem({ name }: { name: string }) {
  const Icon = techIconMap[name];

  return (
    <motion.div
      variants={wrapperVariants}
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="flex items-center gap-2 px-2.5 py-1 text-xs text-white cursor-pointer"
    >
      {Icon && (
        <motion.span variants={iconVariants} className="flex">
          <Icon className="h-5 w-5" />
        </motion.span>
      )}
      <motion.span variants={labelVariants}>{name}</motion.span>
    </motion.div>
  );
}