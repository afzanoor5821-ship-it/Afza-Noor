import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Figma } from "lucide-react";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Behance: Figma,
};

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-rule">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* Brand */}
          <div className="lg:col-span-5">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-paper">
                {site.initials}
              </span>
              <span className="font-display text-[18px] text-ink">{site.name}</span>
            </a>
            <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.7] text-ink-muted">
              Designing intelligent digital experiences with clean engineering and thoughtful
              design.
            </p>
          </div>

          {/* Nav */}
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Navigate
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-y-2 text-[14px]">
              {[...site.nav, { label: "Services", href: "#services" }]
                .filter((v, i, arr) => arr.findIndex((x) => x.href === v.href) === i)
                .map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="text-ink-soft transition-colors hover:text-ink">
                      {n.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Socials + top */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
              Elsewhere
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {[...site.socials, { label: "Email", href: `mailto:${site.email}` }].map((s) => {
                const Icon = s.label === "Email" ? Mail : (iconMap[s.label] ?? Github);
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.label === "Email" ? undefined : "_blank"}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-paper-elevated/60 text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:text-ink"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              href="#top"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-rule bg-paper-elevated/60 px-4 py-2 text-[12px] text-ink-soft transition-all hover:-translate-y-0.5 hover:border-ink/25 hover:text-ink"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-rule pt-6 text-[12px] text-ink-muted sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Designed and developed by <span className="text-ink-soft">{site.name}</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
