"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
};

const lastNameVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 225, damping: 8, delay: 0.85 },
  },
};

export default function NameCard() {
  const firstName = "Vincent".split("");

  return (
    <div className="w-full h-full flex flex-col font-extrabold items-center justify-center">
      <motion.h1
        className="text-[65px] leading-tight sm:text-[100px] tracking-tight sm:tracking-[25px] lg:tracking-[35px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {firstName.map((letter, index) => (
          <motion.span key={index} variants={letterVariants} className="inline-block">
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.h1
        className="text-[125px] leading-tight sm:text-[225px]"
        variants={lastNameVariants}
        initial="hidden"
        animate="visible"
      >
        DAO
      </motion.h1>

        {/* Add portrait image behind */}
      <div className="w-full px-4">
        <p className='text-center text-sm text-[var(--text-muted)]'>
          A Full-Stack Developer specialising in creating interactive and modern web experiences!
        </p>
      </div>
    </div>
  );
}