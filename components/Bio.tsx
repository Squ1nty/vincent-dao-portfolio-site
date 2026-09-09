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
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-24">
      <div className="flex flex-col gap-2">
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
      </div>

      <p className="flex flex-col gap-2 self-end w-1/2">
        
      </p>



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