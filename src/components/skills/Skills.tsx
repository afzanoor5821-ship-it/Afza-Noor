import { motion, useReducedMotion } from "framer-motion";
import { Code2, Brain, Palette, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Category = {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
};

const categories: Category[] = [
  {
    icon: Code2,
    title: "Frontend",
    description: "Building fast, accessible interfaces with modern React.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    icon: Brain,
    title: "AI & Backend",
    description: "Wiring intelligent features into real product flows.",
    items: ["Python", "Flask", "REST APIs", "Firebase", "Prompt Engineering", "LLM Integration"],
  },
  {
    icon: Palette,
    title: "Design",
    description: "Crafting clear, considered UI grounded in research.",
    items: ["Figma", "UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "The daily kit for shipping and collaborating well.",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Postman"],
  },
];

export function Skills() {
  const reduce = useReducedMotion();
  const anim = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, ease, delay: 0.05 + i * 0.08 },
        };

  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <motion.div {...anim(0)} className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            002 / Skills
          </span>
          <div className="h-px flex-1 bg-rule" />
        </motion.div>

        <div className="mb-10 max-w-2xl">
          <motion.h2
            {...anim(1)}
            className="font-display text-[40px] leading-[1.05] tracking-tight text-ink sm:text-[56px] lg:text-[64px]"
          >
            Technologies & <span className="italic text-ink-soft">Expertise.</span>
          </motion.h2>
          <motion.p {...anim(2)} className="mt-4 text-[17px] leading-[1.7] text-ink-muted">
            A focused toolkit across engineering and design — chosen for reliability, speed and the
            quality of the final experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.article
                key={cat.title}
                {...anim(i + 2)}
                className="group relative overflow-hidden rounded-3xl border border-rule bg-paper-elevated/70 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_20px_60px_-30px_rgba(22,22,22,0.25)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-rule bg-paper text-ink transition-colors group-hover:border-ink/30">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-[22px] leading-none text-ink">{cat.title}</h3>
                  </div>
                </div>

                <p className="mt-5 text-[14.5px] leading-[1.65] text-ink-muted">
                  {cat.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-rule bg-paper px-3 py-1.5 text-[12.5px] leading-none text-ink-soft transition-colors group-hover:border-ink/15"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
