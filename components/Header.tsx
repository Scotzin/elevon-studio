"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Button, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { navLinks, waLink } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Adiciona sombra/fundo solido ao rolar a pagina.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloqueia o scroll do fundo quando o menu mobile esta aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-deep-950/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        {/* LOGO DA MARCA (ver components/Logo.tsx) */}
        <Logo />

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-deep-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button
            href={waLink("Olá, gostaria de pedir um orçamento para um site profissional.")}
            external
            variant="primary"
            size="md"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir orçamento
          </Button>
        </div>

        {/* AÇÕES MOBILE: tema + menu */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-deep-900 transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "X" : "Menu"} className="h-6 w-6" />
          </button>
        </div>
      </Container>

      {/* MENU MOBILE (overlay) */}
      <div
        className={`lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-x-0 top-16 z-40 origin-top border-b border-slate-200 bg-white px-5 pb-8 pt-4 shadow-soft-lg transition-all duration-200 dark:border-white/10 dark:bg-deep-900 ${
            open ? "opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-deep-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href={waLink("Olá, gostaria de pedir um orçamento para um site profissional.")}
              external
              variant="primary"
              size="lg"
              className="mt-3 w-full"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pedir orçamento
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
