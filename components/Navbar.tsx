"use client";

import { useState } from "react";
import Link from "next/link";
import { HomeIcon, ProjectIcon, AboutIcon, ContactIcon } from './Icons'

const links = [
  { href: "/", label: "Home", Icon: HomeIcon, alt: "Home Icon PNG" },
  { href: "/projects", label: "Projects", Icon: ProjectIcon, alt: "Projects Icon PNG" },
  { href: "/about", label: "About", Icon: AboutIcon, alt: "About Icon PNG" },
  { href: "/contact", label: "Contact", Icon: ContactIcon, alt: "Contact Icon PNG" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative">
      <nav className="flex items-center justify-between px-8.5 py-4">
        <Link href="/" className="text-sm font-medium tracking-tight">
          <img className='h-7 active:scale-120 transition-all duration-300' src='/gundam8BitHead.png' alt="Gundam Head PNG"></img>
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
        <ul className="hidden gap-6 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-muted">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-[57px] z-40 flex flex-col gap-6 bg-background px-6 py-10 text-lg transition-transform duration-600 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className="flex gap-4 p-3 rounded-2xl active:bg-[var(--hover)]"
          >
            <Icon className='h-6 w-6' />
            <p>{label}</p>
          </Link>
        ))}
      </div>
    </header>
  );
}