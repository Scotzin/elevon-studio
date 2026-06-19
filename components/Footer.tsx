import Link from "next/link";
import { Container, WhatsAppIcon } from "./ui";
import Icon from "./Icon";
import { Logo } from "./Logo";
import { siteConfig, navLinks, waLink } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca + frase */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              {siteConfig.tagline}
            </p>
            {siteConfig.location ? (
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Icon name="MapPin" className="h-4 w-4 text-accent" />
                {siteConfig.location}
              </p>
            ) : null}
          </div>

          {/* Navegacao */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-deep-950">Navegação</h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-deep-950">Contato</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={waLink("Olá! Vim pelo site e gostaria de mais informações.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-accent"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                {/* LINK DO INSTAGRAM (troque em lib/site.ts) */}
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-accent"
                >
                  <Icon name="Instagram" className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              {siteConfig.email ? (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-accent"
                  >
                    <Icon name="Mail" className="h-4 w-4" />
                    {siteConfig.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Direitos */}
        <div className="mt-12 border-t border-slate-200 pt-6">
          <p className="text-center text-sm text-slate-500">
            &copy; {year} {siteConfig.personName}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
