import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";

export function Navigation() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(247,245,240,0)", "rgba(247,245,240,0.72)"]);
  const border = useTransform(scrollY, [0, 80], ["rgba(0,0,0,0)", "rgba(0,0,0,0.06)"]);

  return (
    <motion.header
      style={{ background: bg, borderColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-medium tracking-wide text-paper font-sans">
            {site.initials}
          </span>
          <span className="hidden text-[13px] font-medium text-ink sm:inline">
            {site.name}
            <span className="ml-2 text-ink-muted">— Portfolio ’26</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative rounded-full px-3.5 py-1.5 text-[13px] text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink px-4 py-1.5 text-[13px] font-medium text-paper transition-all hover:border-ink hover:bg-ink-soft"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          Get in touch
        </a>
      </nav>
    </motion.header>
  );
}
