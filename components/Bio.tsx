'use client';

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.05 },
  },
};

export default function Bio() {
  const heyThereText = "Hey there!".split("");

  return (
    <div className="flex max-w-2xl flex-col gap-6 p-4">
      <div className="w-full flex flex-col text-center">
        <motion.p
          className="text-2xl font-semibold"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {heyThereText.map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
        <p className=''>
          Glad to see you&apos;re checking out the portfolio 😄
        </p>
      </div>
      <div className='mt-4 flex flex-col gap-4 text-center'>
        <p>
          The portfolio below is a journey through my development career, 
          where at first I started as a Frontend-focused developer; later 
          developing my skills into a Full-Stack Developer!
        </p>
        <p>
          I aim to bring with me a client-focused mind, where paired 
          with my strong attention to detail and work ethic; I aim to hit 
          the ground running anywhere I go!
        </p>
      </div>
    </div>
  );
}

{/* First paragraph — hook / who you are 
          <p className='w-1/2 self-end text-sm text-end text-[var(--text-muted)]'>Glad to see you&apos;re checking out the folio!</p>
        <p className='w-3/5 text-sm text-[var(--text-muted)]'>
          I&apos;m a Full-Stack dev specialising in creating modern, interactive and accessible web experiences!
        </p>*/}
{/* Second paragraph — what you do / what you're looking for */}
{/* Drop a visual here later, e.g.:
<img src="/about/some-gif.gif" alt="..." className="mx-auto rounded-xl" />
*/}