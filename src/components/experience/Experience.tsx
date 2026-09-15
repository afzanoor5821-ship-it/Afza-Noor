import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, PenTool, Code2, Brain, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Milestone = {
  stage: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const milestones: Milestone[] = [
  {
    stage: "Foundation",
    title: "Bs in Computer Science",
    description:
      "Formal grounding in software engineering, algorithms and the fundamentals that shape everything I build today.",
    icon: GraduationCap,
  },
  {
    stage: "Craft",
    title: "UI/UX Design",
    description:
      "Moved into interface design — learning to translate user needs into clean layouts, thoughtful flows and design systems.",
    icon: PenTool,
  },
  {
    stage: "Engineering",
    title: "Frontend Development",
    description:
      "Turned designs into production interfaces with React, Next.js and TypeScript. Focused on performance, accessibility and detail.",
    icon: Code2,
  },
  {
    stage: "Focus",
    title: "AI Engineering",
    description:
      "Started integrating LLMs and intelligent features into products — from prompt design to full end-to-end AI-powered flows.",
    icon: Brain,
  },
  {
    stage: "Now",
    title: "Current Projects",
    description:
      "Building this portfolio, shipping AI applications, and laying the groundwork for future SaaS products.",
    icon: Rocket,
  },
];

export function Experience() {
  const reduce = useReducedMotion();
  const anim = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.65, ease, delay: 0.05 + i * 0.08 },
        };

  return (
    <section id="experience" className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <motion.div {...anim(0)} className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            003 / Experience
          </span>
          <div className="h-px flex-1 bg-rule" />
        </motion.div>

        <div className="mb-10 max-w-2xl">
          <motion.h2
            {...anim(1)}
            className="font-display text-[40px] leading-[1.05] tracking-tight text-ink sm:text-[56px] lg:text-[64px]"
          >
            My <span className="italic text-ink-soft">Journey.</span>
          </motion.h2>
          <motion.p {...anim(2)} className="mt-4 text-[17px] leading-[1.7] text-ink-muted">
            A short timeline of how I moved from computer science, into design, into engineering,
            and into AI.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical rule */}
          <div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-rule to-transparent sm:left-[23px]"
          />

          <ol className="space-y-6 sm:space-y-8">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.li key={m.title} {...anim(i + 2)} className="group relative pl-14 sm:pl-20">
                  {/* Node */}
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-paper-elevated text-ink shadow-[0_6px_20px_-12px_rgba(22,22,22,0.35)] transition-all duration-500 group-hover:border-ink/30 group-hover:shadow-[0_12px_30px_-14px_rgba(22,22,22,0.4)] sm:h-12 sm:w-12">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>

                  <div className="rounded-2xl border border-rule bg-paper-elevated/70 p-6 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-ink/20 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-muted">
                        {m.stage}
                      </span>
                      <span className="h-px flex-1 bg-rule" />
                    </div>
                    <h3 className="mt-3 font-display text-[24px] leading-[1.15] text-ink sm:text-[28px]">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.65] text-ink-muted">
                      {m.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
