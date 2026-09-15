import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Download, Github, Linkedin, Mail, Figma } from "lucide-react";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease, delay: 0.08 + i * 0.07 },
  }),
};

const socialIcon: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Behance: Figma, // lucide has no Behance; Figma glyph reads as design tool
};

const floatingChips = [
  { label: "Next.js", top: "8%", left: "6%", delay: 0 },
  { label: "TypeScript", top: "22%", left: "-2%", delay: 0.4 },
  { label: "AI", top: "58%", left: "3%", delay: 0.8 },
  { label: "React", top: "12%", right: "4%", delay: 0.2 },
  { label: "Figma", top: "44%", right: "-1%", delay: 0.6 },
  { label: "Framer Motion", top: "72%", right: "6%", delay: 1 },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(55%_45%_at_50%_0%,var(--amber-soft)_0%,transparent_70%)] opacity-60" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--rule)_1px,transparent_1px),linear-gradient(to_bottom,var(--rule)_1px,transparent_1px)] [background-size:120px_120px] opacity-[0.04]" />
      </div>

      {/* Floating tech chips */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        {floatingChips.map((chip) => (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + chip.delay * 0.2, duration: 0.9, ease }}
            style={{
              top: chip.top,
              left: chip.left,
              right: chip.right,
            }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 6 + chip.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: chip.delay,
              }}
              className="rounded-full border border-ink/10 bg-paper-elevated/70 px-3 py-1 text-[11px] font-medium tracking-wide text-ink-muted shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(0,0,0,0.08)] backdrop-blur"
            >
              {chip.label}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-12 gap-8 px-6 pb-24 pt-32 md:px-10 md:pt-36 lg:gap-10">
        {/* LEFT — main content (70%) */}
        <div className="col-span-12 lg:col-span-8">
          {/* Availability badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper-elevated/60 px-3.5 py-1.5 text-[12px] text-ink-soft shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_20px_-14px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all hover:border-ink/20 hover:bg-paper-elevated/80"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)]" />
            </span>
            <span className="font-medium text-ink">{site.status}</span>
          </motion.div>

          {/* Name */}
          <h1 className="mt-8 font-display font-light leading-[0.98] tracking-[-0.035em] text-ink text-[44px] sm:text-[64px] lg:text-[80px]">
            {["Afza", "Noor"].map((word, i) => (
              <motion.span
                key={word}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1 + i}
                className="mr-[0.18em] inline-block"
              >
                {word === "Noor" ? <span className="italic text-ink-soft">{word}.</span> : word}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-7 max-w-[42ch] font-display text-[clamp(1.25rem,2vw,1.7rem)] font-light leading-[1.35] text-ink"
          >
            {site.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-5 max-w-[54ch] text-[15px] leading-[1.7] text-ink-muted"
          >
            {site.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-paper shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_10px_24px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:gap-3 hover:bg-ink-soft"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.resumeHref}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-elevated/60 px-5 py-3 text-[13px] font-medium text-ink backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/35 hover:bg-paper-elevated"
            >
              <Download className="h-4 w-4 text-ink-muted transition-colors group-hover:text-ink" />
              Download Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={6}
            className="mt-10 flex items-center gap-2"
          >
            {[...site.socials, { label: "Email", href: `mailto:${site.email}` }].map((s) => {
              const Icon = s.label === "Email" ? Mail : (socialIcon[s.label] ?? Github);
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.label === "Email" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper-elevated/50 text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-elevated hover:text-ink"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* RIGHT — info panel (30%) */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease }}
          className="col-span-12 lg:col-span-4 lg:pl-4"
        >
          <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-paper-elevated/60 p-6 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_24px_60px_-30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(60%_100%_at_50%_0%,var(--amber-soft)_0%,transparent_75%)] opacity-60" />

            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink-muted">
                On file
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--success)]/25 bg-[var(--success)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--success)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                {site.availability}
              </span>
            </div>

            <dl className="mt-6 space-y-5">
              <PanelRow label="Current Role">
                <div className="flex flex-col gap-0.5">
                  {site.roles.map((r) => (
                    <span key={r} className="font-display text-[16px] text-ink">
                      {r}
                    </span>
                  ))}
                </div>
              </PanelRow>

              <div className="h-px w-full bg-ink/[0.06]" />

              <PanelRow label="Location">
                <span className="font-display text-[16px] text-ink">{site.location}</span>
              </PanelRow>

              <div className="h-px w-full bg-ink/[0.06]" />

              <PanelRow label="Experience">
                <span className="font-display text-[16px] text-ink">{site.experience}</span>
              </PanelRow>

              <div className="h-px w-full bg-ink/[0.06]" />

              <PanelRow label="Languages">
                <div className="flex flex-wrap gap-1.5">
                  {site.languages.map((l) => (
                    <span
                      key={l}
                      className="rounded-full border border-ink/10 bg-paper px-2.5 py-0.5 text-[12px] text-ink-soft"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </PanelRow>
            </dl>
          </div>
        </motion.aside>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-ink-muted transition-colors hover:text-ink md:flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function PanelRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="pt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">
        {label}
      </dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
