"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from  "framer-motion";
import { HomeIcon, ProjectIcon, AboutIcon, ContactIcon } from './Icons'
import { useScrollDirection } from "@/hooks/useScrollDirections";

const links = [
  { href: "/", label: "Home", Icon: HomeIcon, alt: "Home Icon PNG" },
  { href: "/projects", label: "Projects", Icon: ProjectIcon, alt: "Projects Icon PNG" },
  { href: "/about", label: "About", Icon: AboutIcon, alt: "About Icon PNG" },
  { href: "/contact", label: "Contact", Icon: ContactIcon, alt: "Contact Icon PNG" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isVisible = useScrollDirection();

  return (
    <header className="relative">
      <nav className={`fixed top-0 z-50 w-full flex items-center justify-between px-8.5 py-4 md:grid md:grid-cols-[100px_1fr_100px]
                       ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link 
          href="/"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}>
          <img className='h-7 active:scale-120 hover:scale-105 transition-all duration-300 md:h-9' src='/gundam8BitHead.png' alt="Gundam Head PNG"></img>
        </Link>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 cursor-pointer md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>

        {/* Desktop nav */}
        <ul className="hidden w-fit items-center justify-center justify-self-center gap-2 rounded-lg bg-[var(--desktopNavBg)] py-1.5 px-1.5 text-sm md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative z-10 block px-3 py-2 text-[var(--base-text)]
                              ${isActive ? 'hover:text-[var(--base-text)]' : 'hover:text-[var(--text-muted)]'}`}
                >
                  {link.label}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 rounded-md bg-[var(--desktopCurrentLink)]"
                    transition={{ type: "spring", stiffness: 380, bounce: 0.25 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[57px] z-40 flex flex-col items-end gap-6 bg-background px-6 py-10 text-lg transition-transform duration-600 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={(e) => {
              if (href === "/" && window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setIsOpen(false);
            }}
            className="w-full flex gap-4 p-3 rounded-2xl text-[(--base-text)] hover:bg-[var(--hover)] hover:w-[97%] active:bg-[var(--hover)] transition-all duration-200 ease-out"
          >
            <Icon className="h-6 w-6" />
            <p>{label}</p>
          </Link>
        ))}
      </div>
    </header>
  );
}