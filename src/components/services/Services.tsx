import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Code2, Palette, Bot, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: Sparkles,
    title: "AI Application Development",
    description: "Building intelligent AI-powered applications using modern LLM technologies.",
    tags: ["LLMs", "RAG", "Agents"],
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Developing fast, responsive and scalable web applications using React and Next.js.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Designing modern, user-centered interfaces with clean design systems.",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "Integrating AI assistants, automation and intelligent workflows into products.",
    tags: ["Assistants", "Automation", "Workflows"],
  },
];

export function Services() {
  const reduce = useReducedMotion();
  const anim = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.7, ease, delay: 0.05 + i * 0.06 },
        };

  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <motion.div {...anim(0)} className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            005 / Services
          </span>
          <div className="h-px flex-1 bg-rule" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <motion.h2
              {...anim(1)}
              className="font-display text-[40px] leading-[1.05] tracking-tight text-ink sm:text-[56px] lg:text-[64px]"
            >
              How I Can <span className="italic text-ink-soft">Help.</span>
            </motion.h2>
            <motion.p
              {...anim(2)}
              className="mt-5 max-w-[42ch] text-[17px] leading-[1.7] text-ink-soft"
            >
              Professional solutions focused on AI, frontend engineering and user experience — built
              to feel calm, considered and reliable.
            </motion.p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.article
                    key={s.title}
                    {...anim(i + 2)}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-paper-elevated/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_18px_40px_-30px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors duration-500 hover:border-ink/20"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(60%_100%_at_50%_0%,var(--amber-soft)_0%,transparent_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-70" />

                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rule bg-paper text-ink transition-colors group-hover:border-ink/30">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-ink-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    </div>

                    <h3 className="mt-6 font-display text-[22px] leading-tight text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
                      {s.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-rule bg-paper px-2.5 py-0.5 text-[11px] text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
